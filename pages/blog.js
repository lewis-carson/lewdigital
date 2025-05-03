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
    return (
        <table className="min-w-full border border-gray-200 text-left">
            <thead>
                <tr className="bg-gray-50">
                    <th className="px-2 py-1 border-b">Date</th>
                    <th className="px-2 py-1 border-b">Title</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <Link
                        as={`/${post.filePath.replace(/\.mdx?$/, '')}`}
                        href={`/[slug]`}
                        key={post.filePath}
                        legacyBehavior
                    >
                        <tr
                            className="hover:bg-gray-50 hover:cursor-pointer"
                            tabIndex={0}
                            style={{ outline: 'none' }}
                        >
                            <td className="px-2 py-1 border-b text-gray-500">
                                {post.data.subtitle || ''}
                            </td>
                            <td className="px-2 py-1 border-b">
                                <span className="text-blue-600 hover:text-blue-400 cursor-pointer">
                                    {post.data.title} ↗
                                </span>
                            </td>
                        </tr>
                    </Link>
                ))}
            </tbody>
        </table>
    );
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