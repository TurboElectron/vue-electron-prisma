const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraResources: [
          "prisma/**/*",
          "node_modules/.prisma/**/*",
          "node_modules/@prisma/client/**/*",
        ],
      },
      externals: ["@prisma/client"],
      nodeIntegration: true,
    },
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
        dirs: [
          'src/components',
        ],
        dts: true,
        directoryAsNamespace: true,
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'pinia'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ]
  }
};
