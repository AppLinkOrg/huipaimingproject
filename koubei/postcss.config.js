// postcss.config.js
module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 414, // 设计稿的宽度
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [/node_modules/],
      },
    },
  };
  