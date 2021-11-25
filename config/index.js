/* eslint-disable import/no-commonjs */
const path = require('path');

const config = {
  projectName: 'collection-point',
  date: '2021-10-18',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html', '@tarojs/plugin-react-devtools'],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      console.log(chain.optimization.get('splitChunks'))
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              default: false,
              common: {
                test: /\.[tj]sx?$/i,
              },
            },
          },
        },
      });
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    esnextModules: ['taro-ui']
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  sass: {
    resource: [
      path.resolve('src/assets/scss/variable.scss'),
      path.resolve('src/assets/scss/mixins.scss')
    ],
    projectDirectory: path.resolve(__dirname, '..')
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
