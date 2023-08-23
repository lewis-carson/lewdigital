import { MDXRemote } from 'next-mdx-remote'

import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { MathJax } from 'better-react-mathjax'
import { Graphviz } from 'graphviz-react'

function A({ href, children }) {
    return <Link href={href} scroll={false}>
        <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}

function Header({ children }) {
    return <div className="leading-[3.5rem] text-left font-display font-black text-[3.5rem] ">
        <Pad>{children}</Pad>
    </div>
}

function Header2({ children }) {
    return <div className="leading-[2rem] text-left font-display font-black text-[2rem]">
        <Pad>{children}</Pad>
    </div>
}

function Header3({ children }) {
    return <div className="leading-[2rem] text-left font-display font-black text-[1.5rem] ">
        <Pad>{children}</Pad>
    </div>
}

const Pad = ({ children }) => <div className='lg:mx-28 mx-[5vw]'>{children}</div>

//const Graphviz = dynamic(() => import('graphviz-react'), { ssr: false });


const components = {
    a: A,
    strong: ({ children }) =>
        <span className='text-2xl font-display'>{children}</span>,
    pre: ({ children }) =>
        <pre className='w-[100vw] lg:w-[50vw] lg:px-10 px-[5vw]'>{children}</pre>,
    ol: ({ children }) =>
        <ol className='list-decimal'><Pad>{children}</Pad></ol>,
    li: ({ children }) =>
        <li className='my-2 ml-5'>{children}</li>,
    h1: ({ children }) => <Header>{children}</Header>,
    h2: ({ children }) => <Header2>{children}</Header2>,
    h3: ({ children }) => <Header3>{children}</Header3>,
    p: ({ children }) => <Pad>{children}</Pad>,
    ul: ({ children }) =>
        <ul className='list-[square]'><Pad>{children}</Pad></ul>,
    Head,
    img: ({ src, alt }) =>
        <img src={src} alt={alt} className='px-10 pt-5' />,
    blockquote: ({ children }) =>
        <div className='py-10 italic 
        bg-gradient-to-r from-[offwhite] via-transparent to-transparent border-y-4 border-dashed'>
            {children}
        </div>,
    cite: ({ children }) =>
        <Pad>
            <span className='text-gray-400'>
                {children}
            </span>
        </Pad>,
    hr: ({ children }) =>
        <div className="w-full bg-[#f1f1f1] my-10"></div>,
    m: ({ children }) => <MathJax inline={true} className='lg:mx-28 mx-[5vw] text-xl'>{"`" + children.toString() + "`"}</MathJax>,


}

//  < MDXRemote { ...source } components = { components } />

import { motion } from 'framer-motion';

const Column = ({ children, isFigure, inline }) =>
    <div
        className="lg:w-[50vw] flex lg:pb-20"
        style={{
            backgroundColor: (isFigure ? "#f1f1f1" : ""),
            lineHeight: (isFigure ? "2.3rem" : "1.9rem")
        }}>
        <div className='py-10'>
            {children}
        </div>
    </div >

function FadeIn({ children, margin }) {
    return <div>
        <motion.div
            className='hidden lg:block space-y-5'
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
        <div className='lg:hidden space-y-5'>
            {children}
        </div>
    </div>
}

function Sticky({ children }) {
    return <div className='lg:sticky top-16'>
        {children}
    </div >
}

function FigurePair({ figure, annotation, hasFadeMargin = true, inline = false }) {
    return <div className="w-screen lg:min-h-[60vh] lg:flex">
        <Column>
            <Sticky>
                <div className='lg:block space-y-5'>
                    {annotation}
                </div>
            </Sticky>
        </Column>

        <Column isFigure>
            <Sticky>
                <FadeIn margin={hasFadeMargin ? "0% 0% -20% 0%" : "0%"}>
                    {figure}
                </FadeIn>
            </Sticky>
        </Column>
    </div>
}

function Title({ frontMatter, timeToRead }) {
    return <div className='lg:mx-28 m-[5vw]'>
        <div className='font-display text-5xl xl:text-7xl'>
            {frontMatter.title}
        </div>
        <br />
        <div className='font-display  text-3xl xl:text-5xl'>
            {frontMatter.subtitle}

        </div>

        <div className="h-5 lg:h-10"></div>

        <A href="/">
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

        return <FigurePair figure={annotation} annotation={figure} inline={frontMatter.inline} hasFadeMargin={i != 0} />
    });

    if (frontMatter.inline) {
        return <>
            <Title frontMatter={frontMatter} timeToRead={timeToRead} />

            <div className='pb-32'>
                <div className='p-32 pr-[30vw] my-16 space-y-32'>{s.map((source, i) => {
                    return <div className=''><MDXRemote {...source.figure} components={components} /></div>
                })}</div>
                <Pad><Return /></Pad>
            </div>
        </>
    }

    return <div>

        <div className='border-b lg:border-0'>
            <div className="w-screen lg:flex">
                <Column>
                    <Title frontMatter={frontMatter} timeToRead={timeToRead} />
                </Column>
                <div
                    className="lg:w-1/2 flex lg:pb-5"
                    style={{
                        backgroundColor: "#f1f1f1"
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
                <div className='lg:pt-32'>
                    <Pad>
                        <Return />
                    </Pad>
                </div >
            }
        />
    </div >
}

const Return = () => <><div className='font-display text-4xl pb-5'>Thanks for reading.</div><div className='pt-4 text-xl'>
    <A href="/">{"<--- "} <span className='float-right'>Home</span></A>
    <div className="h-3"></div>
    {/*'<A href="/blog">{"<--- "} <span className="float-right">Blog</span> </A>'*/}
</div></>

/*
Serpentine
Hercules
Tunic
*/