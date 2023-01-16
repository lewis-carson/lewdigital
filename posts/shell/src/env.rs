use std::process::Command;

use std::collections::HashMap;

use config::{Config, Value, ValueKind};

// load environment
pub fn load_env() -> HashMap<String, Value> {
    Config::builder()
        // Add in `./Settings.toml`
        .add_source(config::File::with_name("env"))
        .build()
        .unwrap()
        .try_deserialize()
        .unwrap()
}

pub fn set_env(cmd: &mut Command, env: HashMap<String, Value>) {
    cmd.env_clear();

    cmd.env("TERM", "xterm-256color");

    // for each variable in env set on cmd except for lists, which are joined with colons
    for (key, value) in env {
        match value.kind {
            ValueKind::Array(value) => {
                let value: Vec<String> = value
                    .iter()
                    .map(|x| x.clone().into_string().unwrap().to_string())
                    .collect();

                cmd.env(key, value.join(":"));
            }
            _ => {
                cmd.env(key, value.clone().into_string().unwrap());
            }
        }
    }
}

/*


    // read path from PATH in settings
    let path = &env.get("path").unwrap().clone().into_array().unwrap();
    // map each value to a string
    let path: Vec<String> = path
        .iter()
        .map(|x| x.clone().into_string().unwrap().to_string())
        .collect();
} */
