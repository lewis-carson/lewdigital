import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import readingTime from 'reading-time'
import Post from '../../components/Post'
import remarkCapitalize from 'remark-capitalize'
import numWords from 'num-words'
import rehypeHighlight from 'rehype-highlight'

import { motion } from 'framer-motion'
import animate from '../../utils/animate'

export default function PostPage(props) {
    return <motion.div {...animate} key="post"> <Post {...props} /> </motion.div>
}

async function serial(block, data) {
    var s = await serialize(block, {
        gfm: true,
        mdxOptions: {
            remarkPlugins: [
                remarkCapitalize
            ],
            rehypePlugins: [
                rehypeHighlight
            ],
        },
        scope: data,
    })

    return s
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)

    var splitContent = content.split("===")

    // for block in splitcontent
    splitContent = splitContent.map(async block => {
        return await serial(block, data)
    });

    var length = Math.ceil(readingTime(content).minutes)

    splitContent = await Promise.all(splitContent);

    var groupedContent = []

    // chunk content
    var i, j, temporary, chunk = 2;
    for (i = 0, j = splitContent.length; i < j; i += chunk) {
        temporary = splitContent.slice(i, i + chunk);

        groupedContent.push({
            annotation: temporary[1],
            figure: temporary[0]
        })
    }

    return {
        props: {
            s: groupedContent,
            frontMatter: data,
            timeToRead: numWords(length) + ` ${length == 1 ? "min" : "mins"} reading time`
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