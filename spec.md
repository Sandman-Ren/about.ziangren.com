# Spec

I am looking to revamp my personal website at https://about.ziangren.com. Currently, the personal website is a statically generated NextJS project at my GitHub Repo: Sandman-Ren/about.ziangren.com and deployed to GitHub Pages. I would like the new version of my personal website to be:

- still a statically generated NextJS project with TypeScript
- styled with shadcn-ui components with theming design in mind and must support at least one light theme, one dark theme, and "follow system setting"

- supports MDX and code styling, optionally with swappable MDX themes/stylesheets that matches the current website theme (light, dark, follow system setting, and perhaps future themes)
- appropriate animations and transitions (and appropriate layout transitions, mounting and unmounting transitions) with Framer Motion
- designed to support major browsers: Chrome, Safari
- also designed to compatible with mobile devices and mobile browsers: Chrome, Safari

The website will host the following content:
- a top navbar that lets the user navigates the content
- a landing page that also serves as an "about" page that introduces who I am with my basic information, a rounded profile photo of myself
  - bonus hidden easter egg: if the user clicks on (uses their pointer) my photo 5 times in succession (let's say, 5 times in 3 seconds), a chat bubble appears over my profile photo and a random quote from the games I play appears (e.g. StarCraft II unit quotes, WarCraft Unit Quotes, etc.)
- a blog page that lists out the blog posts that I have written in Markdown sorted by "most recent" to "least recent". These blogs posts will be Markdowns colocated with the codebase in an appropriate directory
  - when the user scrolls to the bottom, the page loads more blog content until every post has been loaded, and have a visual/text display that the user has reached the end
  - the users should be able to filter for the blog posts that they want. The filters will be located in a collapsible sidebar on the left
    - the users should be able to search blog posts by title, summary, keywords, tags (multi-select), first created time range (first created within the time period identified by time instant A and B), and optionally content and keyword
  - each blog post in the list is a conceptual card that contains the title, a short summary, a list of keywords, a list of tags that this blog has been applied to. When the user click on an item, they get redirected to the content for that post, which will be an MDX page.
  - I will be constantly working with AI such as ChatGPT to create content, and code. For this reason I would like a component to explicitly notice that a piece of content is created with the help of ChatGPT
  - The user should be able to raise a GitHub issue about a blog post when they see incorrect content, code implementation, etc.
- a fun page that lists out the fun things that I do
  - I am thinking that this can be a gallery/casual format/layout with photos and MDX writeups of my trips, hiking, gaming, running my own server, etc.

Stylistically, the project should:
- have a modern, minimalistic, flat design for both of the two default themes that we provide (light mode, dark mode), built around gray with occassional colored highlights or accents where semantically appropriate
- a clean layout with appropriate transitions
