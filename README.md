### 配置相关
- webpack.config.js配置
```javascript
config = {
  entry: {
    app: path.join(__dirname, '../client/app.js'), //应用程序app入口
  },
  output: {
    filename: '[name].[hash].js',// []代表变量，文件更改hash变化
     path: path.join(__dirname, '../dist'),
    publicPath: '', //静态资源区分
  },
  module: {
    rules: [
      {
        test: /.jsx$/, 
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules') //排除node_modules目录下js文件
        ]
      }
    ]
  },
  plugins: [
    //生成html文件并将output生成的js文件路径注入script标签
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html') 
    })
  ]
}  
```
  - 生成html文件 安装 html-webpack-plugin包
  - 在package.json中指定脚本
    ```“build”：“webpack --config build/webpack.config.server.js”```
    >--config 指定配置文件路径

- webpack.config.js配置开发环境配置
```javascript
const isDev = process.env.NODE_ENV === 'development' //判断执行环境
if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    compress: true,
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), //打包后静态文件路径
    hot: true,
    //错误提醒显示（不包括warning）
    overlay: {
      errors: true
    },
    publicPath: '/public/', //指定主机和端口后加/public/才能访问
    //404请求返回指定页面
    historyApiFallback: {
      index: '/public/index.html'
    },
    // proxy: {
    //   '/api': 'http://localhost:3333'
    // }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
```
>在基础配置上添加如上代码 需安装webpack-dev-server包
>package.json下 配置脚本"dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js", （需安装cross-env包） window下不加cross-env NODE_ENV=development会报错


- .babelrc配置
```
{
  "presets": [
    ["es2015", { "loose": true }],
    "stage-1",
    "react"
  ]
}
```
> react 表示支持react 需安装babel-preser-react包

- 加载antd（用了webpack和babel想要把它打包到你的项目的css里，你可以用下面的方式）

  在.babelrc中加入 
  ```{
  "plugins":[["import", {"libraryName": "antd", "style": "css"}]]
  }
  ```

---

### 代码逻辑相关
- 组件构成 

  组件由<TodoBox/>(todolist应用组件)，<TodoInput/>(待办事项输入组件)，<TodoList/>(由多个TodoItem组成的列表组件)，<TodoItem/>(单个待办事项组件)。

- ***high light***
```javascript
  //删除待办事项
    removeTask = (Item) => {
        let obj = []
        let sum = 0 //用于更新已完成事项总数
        // let index = obj.indexOf(Item)
        // if(index > -1){
        //     obj.splice(index,1)
        // }
        this.state.data.forEach((item)=>{
            if(item.id !== Item.id){
                obj.push(item)
            if(item.status === 1) {
                sum++;
            }
            }
         
        })
        this.setState(
            {
                data: obj,
                finished: sum
            }
        )
    }
  ```
  ```javascript
   //选中待办事项处理事件
    finishedHandle = (Item) =>{
        let sum = 0 //完成总数，每次点击checkbox重新计算
        this.state.data.forEach((item)=>{
            if(item.id === Item.id){
                item.status = Item.status
            }
            if(item.status === 1) {
                sum++
            }
            
        })
        this.setState({
            finished: sum 
        })
    }
  ```