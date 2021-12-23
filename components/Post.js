import { MDXRemote } from 'next-mdx-remote'

import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

function A({ href, children }) {
    return <Link href={href}>
        <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}

function Header({ children }) {
    return <div className="leading-[3.5rem] text-left font-display font-black text-[3.5rem] pb-10">
        <Pad>{children}</Pad>
    </div>
}

const Pad = ({ children }) => <div className='lg:mx-16 px-[5vw]'>{children}</div>

const components = {
    a: A,
    strong: ({ children }) =>
        <span className='text-2xl font-display'>{children}</span>,
    pre: ({ children }) =>
        <pre className='w-[100vw] lg:w-[50vw] px-10'>{children}</pre>,
    ol: ({ children }) =>
        <ol className='list-decimal'><Pad>{children}</Pad></ol>,
    li: ({ children }) =>
        <li className='my-2 ml-5'>{children}</li>,
    h1: ({ children }) => <Header>{children}</Header>,
    p: ({ children }) => <Pad><div className='pb-10'>{children}</div></Pad>,
    ul: ({ children }) =>
        <ul className='list-[square] pb-10'><Pad>{children}</Pad></ul>,
    Head
}

//  < MDXRemote { ...source } components = { components } />

import { motion } from 'framer-motion';

const Column = ({ children, isFigure }) =>
    <div
        className="lg:w-[50vw] flex lg:pb-5"
        style={{
            backgroundColor: (isFigure ? "#f7f7f7" : "")
        }}>
        <div className='py-10'>
            {children}
        </div>
    </div >

function FadeIn({ children, margin }) {
    return <div>
        <motion.div
            className='hidden lg:block'
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1
            }}
            transition={{
                duration: 0.3
            }}
            viewport={{
                margin: margin
            }}
        >
            {children}
        </motion.div>
        <div className='lg:hidden'>
            {children}
        </div>
    </div>
}

function Sticky({ children }) {
    return <div className='lg:sticky top-16'>
        {children}
    </div >
}

function FigurePair({ figure, annotation, hasFadeMargin = true }) {
    return <div className="w-screen lg:min-h-[60vh] lg:flex">
        <Column>
            <Sticky>
                <FadeIn margin={hasFadeMargin ? "-10% 0px -35% 0px" : ""}>
                    {annotation}
                </FadeIn>
            </Sticky>
        </Column>

        <Column isFigure>
            <Sticky>
                <FadeIn margin={hasFadeMargin ? "-10% 0px -35% 0px" : ""}>
                    {figure}
                </FadeIn>
            </Sticky>
        </Column>
    </div>
}

function Title({ frontMatter, timeToRead }) {
    return <div className='lg:mx-16 lg:my-0 p-[5vw]'>
        <div className='font-display font-black text-5xl xl:text-7xl'>
            {frontMatter.title}
        </div>

        <div className="h-5 lg:h-10"></div>

        <A href="/blog">
            <span className="text-gray-400 font-semibold hover:text-gray-200 transition-all">
                {"<---"}
            </span>
        </A>

        <span className='text-gray-400 float-right'> {timeToRead}</span>
    </div>
}

export default function Post({ s, frontMatter, timeToRead }) {
    var pairs = s.map((source, i) => {
        var figure = <MDXRemote {...source.figure} components={components} />
        var annotation = <MDXRemote {...source.annotation} components={components} />

        return <FigurePair figure={annotation} annotation={figure} hasFadeMargin={i != 0} />
    })

    return <div>

        <div className='border-b lg:border-0'>
            <div className="w-screen lg:flex">
                <Column>
                    <Title frontMatter={frontMatter} timeToRead={timeToRead} />
                </Column>
                <div
                    className="lg:w-1/2 flex lg:pb-5"
                    style={{
                        backgroundColor: "#f7f7f7"
                    }}>
                </div >
            </div>
        </div>

        <main className='text-justify'>
            {pairs}
        </main>

        <FigurePair
            figure={<></>}
            annotation={
                <div className='pt-32'>
                    <Pad>
                        <div className='font-display text-4xl pb-5'>Thanks for reading.</div>
                        <div className='pt-4 text-xl'>
                            <A href="/">{"<--- "} <span className='float-right'>Home</span></A>
                            <div className="h-3"></div>
                            <A href="/blog">{"<--- "} <span className='float-right'>Blog</span> </A>
                        </div>
                    </Pad>
                </div>
            }
        />
    </div >
}