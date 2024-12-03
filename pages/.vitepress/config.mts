import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import frontMatter from "front-matter"

function getPageItem(baseDir: string, filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { title, permalink = filePath.replace(/\.md$/, ".html") } = frontMatter(fileContent).attributes

  return {
    text: title,
    link: permalink.replace(baseDir, "").replace(/index\.html$/, ""),
    items: [],
  }
}

function getDirectoryItems(baseDir: string, dir: string) {
  const items = []
  const files = fs.readdirSync(dir)
  const rootItem = files.includes("index.md") ? getPageItem(baseDir, path.join(dir, "index.md")) : undefined

  for (const file of files.filter((file) => file !== "index.md")) {
    const filePath = path.join(dir, file)

    if (rootItem && fs.lstatSync(filePath).isDirectory()) {
      rootItem.items = getDirectoryItems(baseDir, filePath)
      continue
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const {
        title,
        permalink = path.join(dir, file === "index.md" ? "/" : file.replace(/\.md$/, ".html"))
    } = frontMatter(fileContent).attributes

    items.push({
      text: title,
      link: permalink.replace(baseDir, ""),
    })
  }

  if (rootItem) {
    items.unshift(rootItem)
  }

  return items
}

function getSidebarItems() {
  const pagesDir = path.resolve(__dirname, "../diary");
  const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const filePath = path.join(pagesDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Extract title from front matter
    const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    let title = file.replace(".md", ""); // Default to filename if no title is found

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      const titleMatch = frontMatter.match(/title:\s*(.*)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    return {
      text: title,
      link: `/diary/${file.replace(".md", "")}`,
    };
  });

  // Sort items by title alphabetically
  return items.sort((a, b) => a.text.localeCompare(b.text));
}

function getHouseholdItems() {
  const householdDir = path.resolve(__dirname, "../household");
  const files = fs
    .readdirSync(householdDir)
    .filter((file) => file.endsWith(".md") && file !== "index.md");

  const items = files.map((file) => {
    const filePath = path.join(householdDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Extract title from front matter
    const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    let title = file.replace(".md", ""); // Default to filename if no title is found

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      const titleMatch = frontMatter.match(/title:\s*(.*)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    return {
      text: title,
      link: `/household/${file.replace(".md", "")}`,
    };
  });

  // Sort items by title alphabetically
  return items.sort((a, b) => a.text.localeCompare(b.text));
}

// TODO: usage example
console.log("example dir:", JSON.stringify(getDirectoryItems(path.resolve(__dirname, "../"), path.resolve(__dirname, "../example")), null, 2));
console.log("diary dir:", JSON.stringify(getDirectoryItems(path.resolve(__dirname, "../"), path.resolve(__dirname, "../diary")), null, 2));
console.log("household dir:", JSON.stringify(getDirectoryItems(path.resolve(__dirname, "../"), path.resolve(__dirname, "../household")), null, 2));

export default defineConfig({
  title: "Abandoned diary",
  description: "notebook",
  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cheshi-mantu/www-diary' }
    ],
    lastUpdated: true,
    editLink: {
      pattern: 'https://github.com/cheshi-mantu/www-diary/edit/main/pages/:path',
      text: 'Edit this page on GitHub'
    },

    sidebar: {
      "/": [
        {
          text: "Well, hello?",
          items: [
            { text: "Start here", link: "/" },
            { text: "Diary", link: "/diary/" },
            { text: "Household", link: "/household/" },
          ],
        },
      ],
      "/diary/": [
        {
          text: "Well, hello?",
          items: [
            {
              text: "Diary",
              collapsed: false,
              items: getSidebarItems(),
            },
          ],
        },
      ],
      "/household/": [
        {
          text: "Household",
          items: [
            {
              text: "Household stuff",
              collapsed: false,
              items: [
                ...getHouseholdItems(), // Automatically generated items
                {
                  text: "< Back",
                  link: "/",
                }, // Manually added item
              ],
            },
          ],
        },
      ],
    },
  },
});
