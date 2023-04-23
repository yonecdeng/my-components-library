module.exports = {
  title: '组件库',
  description: '收集开发中自己写的vue组件',
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此⽹站',
    repo: 'https://gitee.com/login',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present ZiShui'
    },
    nav: [
      {
        text: '组件',
        link: '/components/button',
        activeMatch: '/components/'
      }
    ],
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button',
              link: '/component/button'
            }
          ]
        }
      ]
    }
  }
};
