# WEBPACK V 2.2


## Acceso a varialbe de entorno de node:
```
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

const isTest = process.env.NODE_ENV === 'test'

set NODE_ENV=production desde package.json

```
 # Plugins y loaders Tipicos de instalacíon de webpack

## Loaders:

babel-core, babel-loader, babel-preset-es2015, babel-preset-stage-2, Sass-loader, node-sass, Css-loader, style-loader, file-loader, copy-loader, rimraff, Imports-loader (para configurar variables globales cuando dan error tipo lodash, jquery etc)

## Plugins:

* CommonsChunkPlugin ==> agrupa partes de codigo en vendor y main.js etc...,

* html-webpack-plugin ==> Inyecta los scripts y styles dinamicamente en la plantilla

* Karma-coverage-plugin y babel-plugin-coverage ==> para  aumentar la informacion de las pruebes de test y obtener una informacion detallada de la cobertura que estamos dando

* webpack-validator ==> valida el codigo en detalle de webpack,

* extract-text-webpack-plugin ==> Separa el css del js

* UglifyPlugin ==> Comprime el js (hay que cargar en babel )

* dedupeplugin ==> PAra no cargar en el bundle el codigo que no se utilza, (deprecado en la version 2.2)

* HotModuleReplacementPlugin ==> Para cargar el HMR del webpack-der-server poner hot en devserver a true

* CopyWebpackPlugin ==> para copiar contenido de una carpeta a otra

*LoaderOptionsPlugin ==> para minimizado e configuracion




## Configuracion de Babel con webpack

PResets ==> es2015 || es2015-webpack (para treeShaking) || estage-2,

plugins ==> __coverage__ || babel-plugin-angularjs-annotate

PROMESAS: a traves de polyfill



## Dependencias típicas de webpack
```
...
  "devDependencies": {
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-es2015-webpack": "^6.22.0",
    "babel-preset-stage-2": "^6.22.0",
    "css-loader": "^0.26.1",
    "node-sass": "^4.5.0",
    "rimraf": "^2.5.4",
    "sass-loader": "^5.0.1",
    "style-loader": "^0.13.1",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.3.0",
    "Karma",
    "Karma-crome-launcher"
    "karma-jasmine"
    "Karma-webpack-plugin" ==> Soluciona problemas de testing en karma con modulos es6
    "jasmine" o "mocha"
    "karma-mocha"
  },
  "dependencies": {
    "angular": "^1.6.2",
    "angular-animate": "^1.6.2",
    "angular-aria": "^1.6.2",
    "bootstrap": "^3.3.7",
    "jquery": "^3.1.1"
  }

```

## Archivo de configuracion de ejemplo

```
var webpack = require('webpack')

module.exports = {
   context: __dirname + '/src/app',
   entry: {
      app: './js/app.js',
      vendor: ['jquery' , 'angular']
   }
   output: {
      path: __dirname + '/dist',
      //el nombre que tiene que aparecer en el index.html de entrada
      filename: 'bundle[name].js'
   },

   devtool: 'source-map',

   module: {
      rules: [{
            //configurando sintaxis de ES6
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
         },
         {
            //configurando estilos para sass y css
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],

         },
         {
            // configurando cargador para fuentes e imagenes
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            use: 'file-loader',

         }

      ]
   },
   plugins: [
      //configurando variable global para jQuery
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery"
      })
   ],

   devServer: {
      port: 4200,
      contentBase: __dirname + '/src/public',
      hot : true
   }
};
```
## Mi COnfiguracion
```
var ENV = process.env.npm_lifecycle_event;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

var isTest = ENV === 'test';
var isProd = ENV === 'build';

var plugins = isProd ? [
   //Minificado
   new UglifyWebpackPlugin({
      sourceMap: true,
      warnings: true,
      compress:false
   }),
   //extrae el css del js compilado por webpack
   new ExtractTextPlugin('styles.[hash:12].min.css'),
   //minifica el css que va a producción
   new OptimizeCssAssets({
      asssetNameRegExp: /\.min.css/,
      cssProcessorOptions: {
         discardComments: {
            removeAll: true
         }
      }
   }),

   //copia el directorio especificado en produccion
   new CopyWebpackPlugin([{
      from: __dirname + '/src/public/img', 
      to: __dirname + '/dist/img'
   }]),
   //trocea y separa el js en los necesarios
   // new webpack.optimize.CommonsChunkPlugin({
   //    name: 'vendor',
   //    filename: '[vendor].bundle.js'
   // })
] : [
   //modulo para HRM activar caracteristica hot en servidor tambien
   new webpack.HotModuleReplacementPlugin(),
]

//Plugins por defecto
plugins.push(
   /**
    * Inyecta scripts y css en tiempo de ejecución y hace una copia de public/index.html tanto en produccion
    * como en desarrollo, por lo que no es necesario incluir ningun script en la plantilla.
    */
   new HtmlWebpackPlugin({
      template: __dirname + '/src/public/index.html',
   })
   //Provee la variable global de jQuery en caso de ser necesaria
   // new webpack.ProvidePlugin({
   //    $: 'jquery',
   //    jQuery: 'jquery'
   // })
)

// var entry = {
//       vendor: [ 'angular' ],
//       app: './app.js'
//       }  

var cssLoader = isProd ?
   ExtractTextPlugin.extract({
      use: ['css-loader', 'sass-loader']
   }) : ['style-loader', 'css-loader', 'sass-loader']


//Objeto de configuración
module.exports = {
   context: __dirname + '/src/app',
   entry: './app.js',
   output: {
      path: __dirname + '/dist',
      filename: isProd ? 'bundle.[name].[hash:10].min.js' : 'bundle.js'
   },
   module: {
      rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
         },
         {
            test: /\.s?css$/,
            use: cssLoader
         },
         {
            test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot)$/,
            use: 'file-loader'
         }
      ]
   },
   devtool: 'source-map',

   plugins: plugins,

   devServer: {
      port: 4300,
      historyApiFallback: true,
      contentBase: __dirname + '/src/public',
      inline: true,
      hot: true,
      noInfo: true,
      stats: {
         colors: true
      },
      watchContentBase: true,
      watchOptions: {
        aggregateTimeout: 100,
        poll: 100
    }
   }

}
```

## COnfiguracion mas compleja
```
var webpack = require('webpack');
var pluginHtml = require('html-webpack-plugin');
var pluginExtractText = require("extract-text-webpack-plugin");

var serverHost = '0.0.0.0';
var serverPort = 8888;
var __DEV__ = (process.env.NODE_ENV !== 'production');

module.exports = {
  devtool: __DEV__ ? 'eval-source-map' : 'eval',
  debug: __DEV__,
  context: __dirname + "/src",
  entry: {
    vendors: [
      'angular-material',
      'angular-material/angular-material.css',
      'animate.css'
    ],
    // Entry "src/app.js"
    app: [
      './app.js',
      'styles.css'
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "app.[chunkhash].js",
    hash: true
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: __dirname + '/dist',
    info: true,
    inline: true,
    colors: true,
    host: serverHost,
    port: serverPort
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'node_modules',
      'src',
      'src/pages',
      'src/www/css',
      'src/www/js'
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['ng-annotate', 'babel-loader']
    },{
      test: /\.css$/,
      loader: pluginExtractText.extract("style-loader", "css-loader")
    },{
      test: /\.(eot|woff|ttf|svg|woff2)$/,
      loader: "file-loader"
    },{
      test: /\.html$/,
      loader: "ng-cache"
    },{
      test: /\.json$/,
      loader: "json-loader"
    },{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
          'file?hash=sha512&digest=hex&name=[name].[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      chunks: ['vendors']
    }),

    new pluginHtml({
      title: 'Angular Material Starter',
      template: './src/index.html'
      // favicon: 'favicon.ico'
    }),

    new  pluginExtractText('[name].[chunkhash].css'),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ]
};

```

## Configuracion mas profesional

```
'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? void 0 : {
    app: './src/app/app.js'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = isTest ? {} : {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else if (isProd) {
    config.devtool = 'source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    rules: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.

      loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {loader: 'css-loader', query: {sourceMap: true}},
          {loader: 'postcss-loader'}
        ],
      })
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  // ISTANBUL LOADER
  // https://github.com/deepsweet/istanbul-instrumenter-loader
  // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
  // Skips node_modules and files that end with .test
  if (isTest) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true
      }
    })
  }

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
   // NOTE: This is now handled in the `postcss.config.js`
   //       webpack2 has some issues, making the config file necessary

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ];

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
    )
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin(),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();

```


