module.exports = {
  title: 'dyc工具集',
  description: '将经验转化为工程：收集组件、工具、脚本、插件',
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
        link: '/components/data-show/single-line-barrage'
      },
      {
        text: 'hooks',
        link: '/hooks/feedback/use-popup-queue'
      },
      {
        text: '工具',
        link: '/utils/base'
      },
      {
        text: '脚本',
        link: '/scripts/index'
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/yonecdeng/my-components-library'
      }
    ],
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button',
              link: '/components/button'
            }
          ]
        },
        {
          text: '数据展示',
          items: [
            {
              text: 'SingleLineBarrage',
              link: '/components/data-show/single-line-barrage'
            },
            {
              text: 'BubbleBarrage',
              link: '/components/data-show/bubble-barrage'
            },
            {
              text: 'list',
              link: '/components/data-show/list'
            }
          ]
        }
      ],
      '/hooks/': [
        {
          text: 'feedback',
          items: [
            {
              text: 'usePopupQueue',
              link: '/hooks/feedback/use-popup-queue'
            }
          ]
        }
      ],
      '/utils/': [
        {
          text: '基础工具',
          items: [
            {
              text: 'base',
              link: '/utils/base'
            }
          ]
        },
        {
          text: '网络请求',
          items: [
            {
              text: 'network',
              link: '/utils/network/axios'
            }
          ]
        },
        {
          text: '移动端',
          items: [
            {
              text: 'unit',
              link: '/utils/mobile/unit'
            }
          ]
        }
      ]
    }
  }
};
