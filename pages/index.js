

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import animate from "../utils/animate";
import { BlogWidget } from './blog';
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

function Details({ posts }) {
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
      <div className='w-[30vw] text-base flex-col space-y-4'>
        <div className='text-3xl font-bold font-display'>
          Lewis Carson
        </div>

        <div>
          Second year Computer Science student at Durham University. I enjoy building projects about whatever interests me. Currently seeking an internship for Summer 2025. <A href="https://github.com/lewis-carson">Github</A>
        </div>

        <div>
          <span>Please email me regarding academic or professional enquires. </span>
          <A href="mailto:lewis.carson@durham.ac.uk">Email</A>
        </div>
      </div>

      <div className='font-semibold text-lg'>Projects</div>

      <div className='text-base'>
        <BlogWidget posts={posts} />
      </div>
    </div>
  </motion.div >
}

export default function Home({ posts }) {
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
              <Details key="details" posts={posts} />
          }
        </AnimatePresence>
      </main>
    </motion.div>
  )
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}