import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

function getSidebarItems() {
  const pagesDir = path.resolve(__dirname, '../diary');
  const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.md'));

  const items = files.map((file) => {
    const filePath = path.join(pagesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extract title from front matter
    const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    let title = file.replace('.md', ''); // Default to filename if no title is found

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      const titleMatch = frontMatter.match(/title:\s*(.*)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    return {
      text: title,
      link: `/diary/${file.replace('.md', '')}`,
    };
  });

  // Sort items by title alphabetically
  return items.sort((a, b) => a.text.localeCompare(b.text));
}


function getHouseholdItems() {
  const householdDir = path.resolve(__dirname, '../household');
  const files = fs.readdirSync(householdDir).filter((file) => file.endsWith('.md') && file !== 'index.md');

  const items = files.map((file) => {
    const filePath = path.join(householdDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extract title from front matter
    const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    let title = file.replace('.md', ''); // Default to filename if no title is found

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      const titleMatch = frontMatter.match(/title:\s*(.*)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    return {
      text: title,
      link: `/household/${file.replace('.md', '')}`,
    };
  });

  // Sort items by title alphabetically
  return items.sort((a, b) => a.text.localeCompare(b.text));
}

export default defineConfig({
  title: "Abandoned diary",
  description: "notebook",
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Well, hello?',
          items: [
            { text: 'Start here', link: '/' },
            { text: 'Diary', link: '/diary/' },
            { text: 'Household', link: '/household/' }
          ]
        }
      ],
      '/diary/': [
        {
          text: 'Well, hello?',
          items: [
            {
              text: 'Diary',
              collapsed: false,
              items: getSidebarItems()
            }
          ]
        }
      ],
      '/household/': [
        {
          text: 'Household',
          items: [
            {
              text: 'Household stuff',
              collapsed: false,
              items: getHouseholdItems()
            }
          ]
        }
      ]
    }
  }
});