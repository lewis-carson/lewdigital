import Head from 'next/head'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>lew.digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen flex">
          <div className="m-auto">
            <UserCard />
          </div>
        </div>
      </main>
    </div>
  )
}
function UserCard() {
  return <div>
    <motion.span>
      <span className="text-[15vw]">
        lew
      </span>
    </motion.span >
    <motion.span
      style={{
      }}
      animate={{
        opacity: 0,

        marginRight: "-20vw"
      }}
      transition={{
        repeat: Infinity, repeatType: "reverse", duration: 1, repeatDelay: 2, ease: "easeInOut"
      }}
    >
      <span className="text-[7vw]">
        .digital
      </span>
    </motion.span >
  </div>
}

