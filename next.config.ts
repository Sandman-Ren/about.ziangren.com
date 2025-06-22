/* eslint-disable @typescript-eslint/no-require-imports */
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [require("rehype-highlight")], // Add rehype-highlight for syntax highlighting
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  output: "export", // set output to export for static site generation
  basePath: "/about.ziangren.com",
  reactStrictMode: true,

  // configure page extension to include markdown and mdx files
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});

export default withMDX(nextConfig);
