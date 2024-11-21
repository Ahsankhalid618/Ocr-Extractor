"use client";

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const prepareMDX = async () => {
      const serialized = await serialize(source, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          format: 'mdx'
        },
      });
      setMdxSource(serialized);
    };

    prepareMDX();
  }, [source]);

  if (!mdxSource) return null;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <MDXRemote
        {...mdxSource}
        components={{
          h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
          h2: (props) => <h2 className="text-2xl font-bold mb-3" {...props} />,
          h3: (props) => <h3 className="text-xl font-bold mb-2" {...props} />,
          p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: (props) => <li className="mb-1" {...props} />,
          blockquote: (props) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
          ),
          pre: (props) => (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto" {...props} />
          ),
          code: (props) => (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} />
          ),
        }}
      />
    </article>
  );
}