import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import animate from "../utils/animate";

const delay = 0.3
const fade_out_duration = 0.2
const fade_in_duration = fade_out_duration
const slide_over_duration = 0.5

function Nametag({ onEnd }) {
  return <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <motion.div
      className='text-4xl lg:text-6xl font-display'
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
        duration: fade_out_duration
      }}
    >
      <motion.span
        initial={{
          left: "0%"
        }}
        animate={{
          left: "27%"
        }}

        transition={{
          type: 'easeInOut',
          duration: slide_over_duration,
          delay: delay
        }}

        onAnimationComplete={onEnd}

        className='relative'
      >Lewis </motion.span>
      <motion.span
        initial={{
          left: "0%",
          opacity: 1
        }}
        animate={{
          opacity: 0,
          left: "27%"
        }}

        transition={{
          type: 'easeInOut',
          duration: slide_over_duration,
          delay: delay
        }}

        className='relative'
      >Carson</motion.span>
    </motion.div>
  </motion.div >
}

function A({ href, children }) {
  return <Link href={href}>
    <span className="inline-block text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
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
      duration: fade_in_duration,
      delay: fade_out_duration
    }}
    key="details"
  >
    <div className='space-y-4'>
      <div className='w-full max-w-2xl text-sm pb-4 flex flex-col md:flex-row items-stretch h-full'>
        <div className="flex-shrink-0 flex items-center justify-center md:items-stretch pr-0 md:pr-3 h-40 md:h-full w-full md:w-auto mb-4 md:mb-0">
          <img
            src="/img/headshot.jpeg"
            alt="Lewis Carson headshot"
            className="h-40 w-40 md:h-full md:w-36 object-cover mx-auto md:mx-0"
            style={{}}
          />
        </div>
        <div className="flex-1 space-y-4 md:ml-6 flex flex-col justify-start h-full">
          <div className='text-3xl font-display'>
            Lewis Carson
          </div>
          <div>
            Second year Computer Science student at Durham University. Interested in game theory, functional programming, and mathematical modelling. Incoming quant dev intern at <A href="https://queueco.com/">Queueco</A> 
          </div>
          <div>
            Please <A href="mailto:lewis.carson@durham.ac.uk">Email</A> me regarding academic or professional enquires.
            You can also find me on <A href="https://www.linkedin.com/in/lewis-carson-3a4580212/">LinkedIn</A> or <A href="http://github.com/lewis-carson">GitHub</A>
          </div>
        </div>
      </div>
    </div>
  </motion.div >
}

export default function Home() {
  var [isOpen, setIsOpen] = useState(false)

  var onEnd = () => {
    setIsOpen(true)
  }

  return (
    <motion.div
      {...animate}
    >
      <main>
        <AnimatePresence>
          {
            !isOpen ?
              <Nametag onEnd={onEnd} key="nametag" /> :
              <Details key="details" />
          }
        </AnimatePresence>
      </main>
    </motion.div>
  )
}
