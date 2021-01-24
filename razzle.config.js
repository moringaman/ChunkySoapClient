const modifyBuilder = require('razzle-plugin-pwa').default
const path = require('path')
 
const pwaConfig = {
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
  // runtimeCaching: [{
  //     urlPattern: new RegExp('https://www.mysite.co'),
  //     handler: 'networkFirst'
  // }]
}

const manifestConfig = {
  filename: 'manifest.json',
  name: 'Razzle App',
  short_name: 'Razzle',
  description: 'Another Razzle App',
  orientation: 'portrait',
  display: 'fullscreen',
  start_url: '.',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  related_applications: [],
  icons: [
    {
      'src': require.resolve(path.join(__dirname, 'public/icons', 'favicon-16x16.png')),
      'sizes': '16x16',
      'type': 'image/png'
    },
    {
      'src': require.resolve(path.join(__dirname, 'public/icons', 'favicon-32x32.png')),
      'sizes': '32x32',
      'type': 'image/png'
    },
    {
      'src': require.resolve(path.join(__dirname, 'public/icons', 'favicon-96x96.png')),
      'sizes': '96x96',
      'type': 'image/png'
    },
    {
      'src': require.resolve(path.join(__dirname,'public/icons', 'android-icon-36x36.png')),
      'sizes': '36x36',
      'type': 'image/png'
    },
    {
      'src': require.resolve(path.join(__dirname,'public/icons', 'android-icon-48x48.png')),
      'sizes': '48x48',
      'type': 'image/png'
    },
    {
      'src': require.resolve(path.join(__dirname,'public/icons', 'android-icon-72x72.png')),
      'sizes': '72x72',
      'type': 'image/png'
    },
    {
      'src': require.resolve(path.join(__dirname,'public/icons', 'android-icon-96x96.png')),
      'sizes': '96x96',
      'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'android-icon-144x144.png')),
        'sizes': '144x144',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'android-icon-192x192.png')),
        'sizes': '192x192',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-57x57.png')),
        'sizes': '57x57',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-60x60.png')),
        'sizes': '60x60',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-72x72.png')),
        'sizes': '72x72',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-76x76.png')),
        'sizes': '76x76',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-114x114.png')),
        'sizes': '114x114',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-120x120.png')),
        'sizes': '120x120',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-144x144.png')),
        'sizes': '144x144',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-152x152.png')),
        'sizes': '152x152',
        'type': 'image/png'
    },
    {
        'src': require.resolve(path.join(__dirname, 'public/icons', 'apple-icon-180x180.png')),
        'sizes': '180x180',
        'type': 'image/png'
    }
  ]
}

const modify = modifyBuilder({ pwaConfig, manifestConfig })

module.exports = {
  plugins: [{ func: modify }]
}