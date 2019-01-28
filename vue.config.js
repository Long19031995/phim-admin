module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    devServer: {
      clientLogLevel: 'info',
      watchOptions: {
          poll: true
      }
    }
  }
}