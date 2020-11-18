'use strict'
const path = require('path')
var fs = require("fs")
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/**
 * 获取变量类型
 * @param {All} obj
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/**
 * 获取目标路径下目标名称的文件路径
 * @param {String} url
 * @param {Regexp|String} ext
 */
function getFiles(url, ext) {
  var resArr = [];
  const filesInUrl = fs.readdirSync(url);
  filesInUrl.forEach(file => {
    const currentPath = `${url}/${file}`;
    const fileInfo = fs.statSync(currentPath);

    if(getType(ext) === 'string') {
      if(file === ext) {
        resArr.push(path.resolve(__dirname, currentPath));
      };
    } else if (getType(ext) === 'regexp') {
      if(file.match(ext))
        resArr.push(path.resolve(__dirname, currentPath));
    };

    if(fileInfo.isDirectory()) {
      resArr.push.apply( resArr, getFiles(currentPath + '/', ext) )
    }
  });

  return resArr;
};

/**
 * 自动生成static文件夹的CopyWebpackPlugin
 */
exports.buildStaticPlugin = (url) => {
  const PATH_NAME = '/src/views';
  const FOLDER_NAME = 'static';
  const STATIC_FOLDERS = getFiles(path.resolve(__dirname, `..${PATH_NAME}`), FOLDER_NAME);
  var resArr = STATIC_FOLDERS.reduce((arr, folder) => {
    folder = folder.replace(/\\/g, '/');
    let folder_useful_path = folder.split(PATH_NAME)[1];
    let to_path = folder_useful_path.replace(FOLDER_NAME, '').slice(0, -1);

    arr.push(new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, folder),
          to: `${url}/${to_path}`,
          ignore: ['.*']
      }
    ]));

    return arr;
  }, []);

  return resArr;
}
