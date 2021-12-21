import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
//import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import readingTime from 'reading-time'

const components = {
    a: CustomLink,
    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    //TestComponent: dynamic(() => import('../../components/TestComponent')),
    Head,
}

function A({ href, children }) {
    return <Link href={href}>
        <span className="text-blue-500 hover:text-blue-300 text-3xl font-black transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}


export default function PostPage({ source, frontMatter, timeToRead }) {
    return (
        <Layout>
            <div>
                <A href="/blog">{"<---"}</A>
                <div className='my-10'>
                    <h1 className='font-bold tracking-[-0.15rem] text-4xl'>{frontMatter.title}</h1>
                    <span>{timeToRead}</span>
                    {frontMatter.description && (
                        <p className="description">{frontMatter.description}</p>
                    )}
                </div>
                <main className=' text-justify'>
                    <MDXRemote {...source} components={components} />
                </main>
            </div>
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            timeToRead: readingTime(content).text
        },
    }
}

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}