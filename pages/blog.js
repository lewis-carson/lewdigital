import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

export default function Index({ posts }) {
    return (
        <Layout>
            <div className="font-display text-5xl mb-5 font-bold">Blog</div>
            <div className="space-y-2">
                {posts.map((post) => (
                    <div key={post.filePath}>
                        <Link
                            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                            href={`/posts/[slug]`}
                        >
                            <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">
                                {post.data.title} ↗
                            </span>
                        </Link>
                    </div>
                ))}
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