import { MDXRemote } from 'next-mdx-remote'

import CustomLink from './CustomLink'
import Head from 'next/head'
import Link from 'next/link'
//import dynamic from 'next/dynamic'

function A({ href, children }) {
    return <Link href={href}>
        <span className="text-blue-500 hover:text-blue-300 font-black transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}


const components = {
    a: CustomLink,
    strong: ({ children }) =>
        <span className='text-2xl font-display font-bold'>{children}</span>,
    pre: ({ children }) =>
        <pre className='border p-5 rounded my-5'>{children}</pre>,
    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    //TestComponent: dynamic(() => import('../../components/TestComponent')),
    Head,
}


export default function Post({ source, frontMatter, timeToRead }) {
    return <div className='w-[70vw] lg:w-[40vw]'>
        <div className='my-10'>
            <span className='font-display text-5xl'>{frontMatter.title}</span>
            <br />

            <span><A href="/blog">{"<---"}</A></span>
            <span className='text-gray-400 float-right'> {timeToRead}</span>
            {
                frontMatter.description && (
                    <p className="description">{frontMatter.description}</p>
                )
            }
        </div >
        <main className=' text-justify'>
            <MDXRemote {...source} components={components} />
        </main>
    </div >
}