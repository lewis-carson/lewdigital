import Head from 'next/head'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>lew.digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span className="absolute m-32 text-lg font-[FKS]">
          Do you remember the first time?
          <div className="h-10"></div>
          <span className="inline-block w-40"></span> I remember <span className="inline-block w-40"></span>
          <span className="text-3xl">the first time</span>
        </span>
        <div className="absolute m-56 mt-72 font-[FK]">
          <span className="text-[15vw]">
            lew
          </span>
          <span className="m-32 pt-10 text-[7vw]">
            .digital
          </span>
        </div>
      </main>
    </div>
  )
}
