import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

function A({ href, children }) {
    return <Link href={href}>
        <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
            {children}
        </span>
    </Link>
}

export function BlogWidget({ posts }) {
    return <><div className=''>
        {posts.map((post) => (
            <div key={post.filePath}>
                <Link
                    as={`/${post.filePath.replace(/\.mdx?$/, '')}`}
                    href={`/[slug]`}
                >
                    <span className="pb-2 text-blue-600 hover:text-blue-400 transition-all cursor-pointer flex">
                        {/*({post.data.pretext})  */}

                        <div className='w-24 text-gray-500 hover:text-gray-500'>
                            {post.data.subtitle} </div>
                        <div className=''>
                            {post.data.title} ↗
                        </div>
                    </span>
                </Link>
            </div>
        ))}
    </div></>
}

export default function Blog({ posts }) {
    return (
        <Layout>
            <div className='max-w-[70vw] lg:max-w-[25vw]'>

                <A href="/">
                    <span className="text-gray-400 text-2xl font-semibold hover:text-gray-200 transition-all">
                        {"<---"}
                    </span>
                </A>
                <div className="font-display text-5xl mb-5 mt-3 font-bold">Home</div>
                <BlogWidget posts={posts} />
            </div>
        </Layout >
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