module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/main.js',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        }
      }
    }
  }
}
