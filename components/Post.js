import { MDXRemote } from 'next-mdx-remote'
import React, { useEffect, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { MathJax } from 'better-react-mathjax'
import { Graphviz } from 'graphviz-react'
import { motion } from 'framer-motion';

// Utility Components
const Pad = ({ children }) => (
  <div className="lg:mx-20 mx-[3vw]">{children}</div>
);

const A = ({ href, children }) => (
  <Link href={href} scroll={false}>
    <span className="text-blue-500 hover:text-blue-300 transition-all cursor-pointer">{children}</span>
  </Link>
);

const Header = ({ children }) => (
  <div className="leading-[3.5rem] text-left font-display  text-[2.5rem] ">
    <Pad>{children}</Pad>
  </div>
);

const Header2 = ({ children }) => (
  <div className="leading-[2rem] text-left font-display  text-[2rem]">
    <Pad>{children}</Pad>
  </div>
);

const Header3 = ({ children }) => (
  <div className="leading-[2rem] text-left font-display  text-[1.5rem] ">
    <Pad>{children}</Pad>
  </div>
);

// Modify the components map to make MathJax render only on client-side
const SafeMathJax = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only render MathJax on client-side to avoid hydration issues
  if (!mounted) {
    return <span className="lg:mx-28 mx-[5vw]">{children}</span>;
  }
  
  return (
    <MathJax inline={true} className="lg:mx-28 mx-[5vw]">
      {"`" + children.toString() + "`"}
    </MathJax>
  );
};

// MDX Components Map
const components = {
  a: A,
  strong: ({ children }) => <span className="text-2xl font-display">{children}</span>,
  pre: ({ children }) => <pre className="w-full max-w-none overflow-x-auto rounded-lg text-sm mx-auto my-6 px-4 py-3 lg:px-12 lg:py-6 lg:w-[100%] lg:max-w-[100%] lg:mx-0" style={{ boxSizing: 'border-box', backgroundImage: 'none' }}>{children}</pre>,
  ol: ({ children }) => <ol className="list-decimal text-base"><Pad>{children}</Pad></ol>,
  li: ({ children }) => <li className="my-2 ml-5 text-base">{children}</li>,
  code: ({ children }) => <code className="rounded-lg border hljs language-r p-5">{children}</code>,
  h1: ({ children }) => <Header>{children}</Header>,
  h2: ({ children }) => <Header2>{children}</Header2>,
  h3: ({ children }) => <Header3>{children}</Header3>,
  p: ({ children }) => <Pad><div className="text-base">{children}</div></Pad>,
  ul: ({ children }) => <Pad><ul className="list-[square]">{children}</ul></Pad>,
  Head,
  img: ({ src, alt }) => <img src={src} alt={alt} className="pt-5" />,
  blockquote: ({ children }) => (
    <div className="py-10 italic bg-gradient-to-r from-[offwhite] via-transparent to-transparent border-y-4 border-dashed">
      {children}
    </div>
  ),
  cite: ({ children }) => (
    <Pad>
      <span className="text-gray-400">{children}</span>
    </Pad>
  ),
  hr: () => <div className="w-full bg-[#f1f1f1] my-10"></div>,
  m: ({ children }) => <SafeMathJax>{children}</SafeMathJax>,
};

// Layout Columns
const AnnotationColumn = ({ children }) => (
  <div
    className="flex lg:w-[40vw] lg:pb-20"
    style={{ backgroundColor: '', lineHeight: '1.9rem', fontSize: '1.1rem' }}
  >
    <div className="py-10">{children}</div>
  </div>
);

const FigureColumn = ({ children }) => (
  <div
    className="flex lg:w-[60vw] lg:pb-20"
    style={{ backgroundColor: '#f9f9f9', lineHeight: '2.3rem', fontSize: '1.1rem' }}
  >
    <div className="py-10 overflow-hidden w-full">{children}</div>
  </div>
);

// Animation/Sticky
// A simpler FadeIn component that doesn't use any props or effects
const FadeIn = ({ children, margin }) => {
  // margin prop is received but intentionally not used
  return (
    <>
      <div className="hidden lg:block space-y-5">
        {children}
      </div>
      <div className="lg:hidden space-y-5">
        {children}
      </div>
    </>
  );
};

const Sticky = ({ children }) => (
  <div className="lg:sticky top-16">{children}</div>
);

// Figure/Annotation Pair
const FigurePair = ({ figure, annotation, hasFadeMargin = true, inline = false }) => (
  <div className="w-screen lg:min-h-[60vh] lg:flex">
    <AnnotationColumn>
      <Sticky>
        <FadeIn margin={hasFadeMargin ? '0% 0% -20% 0%' : '0%'}>{annotation}</FadeIn>
      </Sticky>
    </AnnotationColumn>
    <FigureColumn>
      <Sticky>
        <FadeIn margin={hasFadeMargin ? '0% 0% -20% 0%' : '0%'}>{figure}</FadeIn>
      </Sticky>
    </FigureColumn>
  </div>
);

// Title Section
const Title = ({ frontMatter, timeToRead }) => (
  <div className="lg:mx-20 m-[3vw]">
    <div className="xl:space-y-7">
      <div className="font-display text-4xl xl:text-6xl">{frontMatter.title}</div>
      <div className="font-display text-2xl xl:text-4xl">{frontMatter.subtitle}</div>
    </div>
    <div className="h-5 lg:h-10"></div>
    <A href="/">
      <span className="text-gray-400 font-semibold hover:text-gray-200 transition-all">{"<---"}</span>
    </A>
    <span className="text-gray-400 float-right"> {timeToRead}</span>
  </div>
);

// Return/Thanks Section
const Return = () => (
  <>
    <div className="font-display text-4xl pb-5">Thanks for reading.</div>
    <div className="pt-4 text-xl">
      <A href="/">{"<--- "} <span className="float-right">Home</span></A>
      <div className="h-3"></div>
      {/*'<A href="/blog">{"<--- "} <span className="float-right">Blog</span> </A>'*/}
    </div>
  </>
);

// Layout Modes
const InlineOrMobileLayout = ({ s, frontMatter, timeToRead }) => (
  <>
    <div className="border-b">
      <Title frontMatter={frontMatter} timeToRead={timeToRead} />
    </div>
    <div className="pb-32">
      <div className={`mx-auto my-8 space-y-16 px-4 sm:px-6 md:px-8 ${frontMatter.inline ? 'max-w-4xl' : 'max-w-2xl'}`}>
        {s.map((source, i) => [
          <div key={`annotation-${i}`}>
            {source.annotation && <MDXRemote {...source.annotation} components={components} />}
          </div>,
          <div key={`figure-${i}`}>
            {source.figure && <MDXRemote {...source.figure} components={components} />}
          </div>
        ])}
      </div>
      <Pad>
        <Return />
      </Pad>
    </div>
  </>
);

const RegularLayout = ({ pairs, frontMatter, timeToRead }) => (
  <div>
    <div className="border-b lg:border-0">
      <div className="w-screen lg:flex">
        <FigurePair
          figure={<></>}
          annotation={<Title frontMatter={frontMatter} timeToRead={timeToRead} />}
        />
        <div className="lg:w-1/2 flex lg:pb-5" style={{ backgroundColor: '#f1f1f1' }}></div>
      </div>
    </div>
    <main className="text-justify">{pairs}</main>
    <FigurePair
      figure={<></>}
      annotation={
        <div className="lg:pt-28">
          <Pad>
            <Return />
          </Pad>
        </div>
      }
    />
  </div>
);

// Main Post Component
export default function Post({ s, frontMatter, timeToRead, mode }) {
  // Add a hydration safety flag
  const [isClient, setIsClient] = useState(false);
  
  // Always start with a consistent state for SSR
  const [resolvedMode, setResolvedMode] = useState(
    mode || 'inline-or-mobile' // Default to inline-or-mobile for consistent SSR
  );
  
  // Handle client-side initialization and window resizing
  useEffect(() => {
    setIsClient(true);
    
    // Skip if mode is explicitly provided
    if (mode) return;
    
    // Determine the correct mode based on current conditions
    const newMode = frontMatter.inline || window.innerWidth < 1024 
      ? 'inline-or-mobile' 
      : 'regular';
      
    setResolvedMode(newMode);
    
    function handleResize() {
      if (frontMatter.inline) {
        setResolvedMode('inline-or-mobile');
      } else if (window.innerWidth < 1024) {
        setResolvedMode('inline-or-mobile');
      } else {
        setResolvedMode('regular');
      }
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frontMatter.inline, mode]);

  // Prepare components before rendering
  const pairs = s.map((source, i) => {
    const figure = <MDXRemote {...source.figure} components={components} />;
    const annotation = <MDXRemote {...source.annotation} components={components} />;
    return (
      <FigurePair
        figure={annotation}
        annotation={figure}
        inline={frontMatter.inline}
        hasFadeMargin={i !== 0}
        key={i}
      />
    );
  });

  // If we're still in SSR or it's not yet hydrated, use the initial safe layout
  // Otherwise, use the client-determined layout
  if (!isClient || resolvedMode === 'inline-or-mobile') {
    return <InlineOrMobileLayout s={s} frontMatter={frontMatter} timeToRead={timeToRead} />;
  }
  
  // Default to regular
  return <RegularLayout pairs={pairs} frontMatter={frontMatter} timeToRead={timeToRead} />;
}

/*
Serpentine
Hercules
Tunic
*/