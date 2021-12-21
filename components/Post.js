import { MDXRemote } from 'next-mdx-remote'

import Head from 'next/head'
import Link from 'next/link'
//import dynamic from 'next/dynamic'

function A({ href, children }) {
    return <Link href={href}>
        <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}

function Header({ children }) {
    return <div className="font-display text-3xl py-5">{children}</div>
}

const components = {
    a: A,
    strong: ({ children }) =>
        <span className='text-xl font-display font-bold'>{children}</span>,
    pre: ({ children }) =>
        <pre className='border p-5 rounded my-5'>{children}</pre>,
    ol: ({ children }) =>
        <ol className='list-decimal'>{children}</ol>,
    li: ({ children }) =>
        <li className='my-2'>{children}</li>,
    h1: ({ children }) => <Header>{children}</Header>,
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
            <div className="h-5"></div>

            <span className='font-black'><A href="/blog">{"<---"}</A></span>
            <span className='text-gray-400 float-right'> {timeToRead}</span>
            {
                frontMatter.description && (
                    <p>{frontMatter.description}</p>
                )
            }
        </div >
        <main className=' text-justify'>
            <MDXRemote {...source} components={components} />
        </main>
    </div >
}