import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Abandoned diary",
  description: "notebook",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Stuff',
        items: [
          { text: 'Diary',
            collapsed: true,
            items: [
              {text: '20241026', link: 'diary/20241026'}
            ]
           },
          { text: 'Household', link: '/household' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cheshi-mantu' }
    ]
  },
  sitemap: {
    hostname: 'http://cheshimantu.lol'
  }
})

