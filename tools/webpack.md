# Webpack Config (^4.0)

## base

```JS
module.exports = {
    entry: '',               // 入口文件
    output: {},              // 出口文件 打包后的目录，必须是绝对路径
    module: {},              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development'      // 模式配置
}
```

## Path

```js

path.join
  path.join():方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

  例如：path.join('foo', 'baz', 'bar');  // 返回 'foo/baz/bar'

  注：如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。

path.resolve
  path.resolve:方法会把一个路径或路径片段的序列解析为一个绝对路径。

  例如：

  注： 当前工作目录为 /home/myself/node

 1、path.resolve('/foo/bar', './baz');// 返回: '/foo/bar/baz'

 2、path.resolve('/foo/bar', '/tmp/file/');// 返回: '/tmp/file'

 3、path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');// 如果当前工作目录为 /home/myself/node，// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'


两者区别：
 1、join是把各个path片段连接在一起， resolve把‘／’当成根目录

 path.join('/a', '/b') // Outputs '/a/b'
    path.resolve('/a', '/b') // Outputs '/b'

 2、join直接拼接字段，resolve解析路径并返回

 path.join("a", "b1", "..", "b2")

 console打印会得到"a/b2"

 path.resolve("a", "b1", "..", "b2")

 console打印得到"/home/myself/node/a/b2"

```
