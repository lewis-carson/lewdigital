import Head from 'next/head'

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const delay = 2

function Nametag({ onEnd }) {
  return <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <motion.div
      className='text-4xl lg:text-8xl font-display'
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}

      transition={{
        type: 'easeInOut',
        duration: 1
      }}
    >
      <motion.span
        initial={{
          left: "0%"
        }}
        animate={{
          left: "33.333%"
        }}

        transition={{
          type: 'easeInOut',
          duration: 1,
          delay: delay
        }}

        onAnimationComplete={onEnd}

        className='relative'
      >
        lew
      </motion.span>
      <motion.span
        initial={{
          left: "0%",
          opacity: 1
        }}
        animate={{
          opacity: 0,
          left: "33.333%"
        }}

        transition={{
          type: 'easeInOut',
          duration: 1,
          delay: delay
        }}

        className='relative'
      >.digital</motion.span>
    </motion.div>
  </motion.div >
}

function A({ href, children }) {
  return <Link href={href}>
    <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
      {children} ↗
    </span>
  </Link>
}

function Details() {
  return <motion.div
    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'

    initial={{
      opacity: 0,
      display: "block"
    }}
    animate={{
      opacity: 1
    }}

    transition={{
      type: 'easeInOut',
      duration: 1,
      delay: 1
    }}
    key="details"
  >
    <div className='text-lg'>
      <i>2022 bruh <br /> i promise you</i> <br />
      <br />
      <ul>
        <li>
          <A href="mailto:torvimmm@gmail.com">mail</A>

        </li>
        <li>
          <A href="https://github.com/lew-d">github</A>
        </li>
        {/*
        <li>
          <A href="">blog</A>
        </li>
        */}
      </ul>
    </div>
  </motion.div>
}

export default function Home() {
  var [isOpen, setIsOpen] = useState(false)

  var onEnd = () => {
    setIsOpen(true)
  }

  return (
    <div className="">
      <Head>
        <title>lew.digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='font-body'>
        <AnimatePresence>
          {
            !isOpen ?
              <Nametag onEnd={onEnd} key="nametag" /> :
              <Details key="details" />
          }
        </AnimatePresence>
      </main>
    </div>
  )
}
