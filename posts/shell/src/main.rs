pub mod builtins;
pub mod env;
pub mod foreground;

use crate::env::load_env;
use builtins::builtins;

use foreground::ForegroundProcess;
use rustyline::error::ReadlineError;
use rustyline::{Editor, Result};

use std::process::{Child, Command, Stdio};
use std::sync::atomic::AtomicU32;
use std::sync::Arc;

fn handle_err(e: ReadlineError) {
    match e {
        ReadlineError::Interrupted => {
            println!("CTRL-C");
        }
        ReadlineError::Eof => {
            println!("CTRL-D");
        }
        err => {
            println!("Error: {:?}", err);
        }
    }
}

fn main() -> Result<()> {
    let mut rl = Editor::<()>::new()?;
    if rl.load_history("history.txt").is_err() {
        println!("No previous history.");
    }

    let env = load_env();

    loop {
        //current dir
        let readline =
            rl.readline(format!("({}) ", std::env::current_dir().unwrap().display()).as_str());

        let input = match readline {
            Ok(line) => {
                rl.add_history_entry(line.as_str());
                line
            }
            Err(e) => {
                handle_err(e);
                break;
            }
        };

        // read_line leaves a trailing newline, which trim removes
        // this needs to be peekable so we can determine when we are on the last command
        let mut commands = input.trim().split(" | ").peekable();
        let mut previous_command = None;

        while let Some(command) = commands.next() {
            // break if we get a hit
            if builtins(command, &mut previous_command) {
                break;
            };

            let stdin = previous_command.map_or(Stdio::inherit(), |output: Child| {
                Stdio::from(output.stdout.unwrap())
            });

            let stdout = if commands.peek().is_some() {
                Stdio::piped()
            } else {
                Stdio::inherit()
            };

            // We have to run all of our commands through fake_tty
            // because we need terminal colouring
            let mut cmd = Command::new(&command);

            // set envs
            env::set_env(&mut cmd, env.clone());

            // print

            let output = cmd.stdin(stdin).stdout(stdout).spawn();

            //TESTING
            let pipeline_state = Arc::new((AtomicU32::new(0), AtomicU32::new(0)));
            let mut fg_process = ForegroundProcess::new(cmd, pipeline_state);
            let out = fg_process.spawn();

            match output {
                Ok(output) => {
                    previous_command = Some(output);
                }
                Err(e) => {
                    previous_command = None;
                    eprintln!("{}", e);
                }
            };
        }

        if let Some(mut final_command) = previous_command {
            // block until the final command has finished
            final_command.wait().unwrap();
        }
    }
    rl.save_history("history.txt")
}
