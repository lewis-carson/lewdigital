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
    return <div className="font-display text-3xl">{children}</div>
}

const components = {
    a: A,
    strong: ({ children }) =>
        <span className='text-xl font-display font-bold'>{children}</span>,
    pre: ({ children }) =>
        <pre className='border p-5 rounded my-5 w-auto overflow-scroll'>
            {children}
        </pre>,
    ol: ({ children }) =>
        <ol className='list-decimal'>{children}</ol>,
    li: ({ children }) =>
        <li className='my-2 ml-5'>{children}</li>,
    h1: ({ children }) => <Header>{children}</Header>,
    p: ({ children }) => <div className='my-5'>{children}</div>,
    ul: ({ children }) =>
        <ul className='list-[square]'>{children}</ul>,
    Head,
}

var hash = function (s) {
    s = s.toString()
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

export default function Post({ s, frontMatter, timeToRead }) {
    return <div className='w-[80vw] lg:w-[50vw]'>
        <div className='my-6'>
            <span className=''>
                <div className='font-display text-5xl'>
                    {frontMatter.title}
                </div>


                <div className="h-5"></div>


                <A href="/blog">
                    <span className="text-gray-400 font-semibold hover:text-gray-200 transition-all">
                        {"<---"}
                    </span>
                </A>

                <span className='text-gray-400 float-right'> {timeToRead}</span>

            </span>

            {
                frontMatter.description && <p>{frontMatter.description}</p>
            }

        </div>
        <main className=' text-justify'>
            {s.map(source => <MDXRemote {...source} components={components} />)}
        </main>
    </div >
}