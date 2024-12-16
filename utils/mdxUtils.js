import fs from 'fs'
import path from 'path'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = [
   // "map_plotting.mdx",
   // "dash.mdx",
    "willow.mdx",
    "whatgrad.mdx",
    "chess.mdx",
    "lambda.mdx",
    "buttondown.mdx",
    "rugby.mdx",
    "picocfd.mdx"
].reverse()/*fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    //filter out files which start with an underscore
    .filter((path) => !/^_/.test(path))
    .reverse()*/