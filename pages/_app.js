import "inter-ui/inter.css";
import { MathJaxContext } from "better-react-mathjax"
import '../styles/globals.css'
import '../styles/syntax.scss'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps, router }) {
  const url = `https://lew.digital${router.route}`

  return <MathJaxContext config={{
    loader: { load: ["input/asciimath"] },
    asciimath: { displaystyle: false }
  }}>
    <div className='font-body text-lg'>

      <Head>
        <title>Lewis Carson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={url} canonical={url} />
        <Analytics />
      </AnimatePresence>
    </div>
  </MathJaxContext>
}


export default MyApp
