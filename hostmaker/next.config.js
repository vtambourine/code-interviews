const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          }
        }
      ]
    })

    return config
  }
})
