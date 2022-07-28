//引入包，nodejs模块，拼接路径
const path = require('path')
//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//webpack中的配置信息
module.exports = {
  //指定入口文件
  entry: './src/index.ts',

  //指定打包文件所在目录
  output: {
    //用path拼一个目录
    path: path.resolve(__dirname, 'dist'),
    //打包后文件的名字
    filename: "bundle.js",

    environment: {
      arrowFunction: false
    }
  },


  //指定webpack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      {
        //指定规则生效的文件
        test: /\.ts$/,
        //使用tsloader去处理结尾为ts的文件
        use: [
          //配置babel
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options: {
              //设置预定义的环境
              presets: [
                [
                  //指定环境的插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    targets: {
                      "chrome": "88"
                    },
                    //指定corejs的版本
                    "corejs": "3",
                    //指定corejs的方式，按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        //要排除的文件
        exclude: /node-modules/
      },
      //设置less文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browser: 'last 2 version'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },

  //配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      // title: "这是一个自定义title"
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],

  //设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}