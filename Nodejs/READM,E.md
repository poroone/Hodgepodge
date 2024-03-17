# Node

1. 首先Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。
2. JavaScript代码，在浏览器中是如何被执行的？

3. 什么是JavaScript运行环境？
4. 为什么JavaScript需要特别的运行环境呢？
5. 什么又是JavaScript引擎？
6. 什么是V8？

## 浏览器内核

1. Gecko : 早期被Netscape和Mozilla Firefox浏览器使用

2. Trdent：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink
3. webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用
4. Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等

### 浏览器内核指的是浏览器的排版引擎：

- 排版引擎（layout engine），也称为浏览器引擎（browser engine）、页面渲染引擎（rendering engine）或样版引擎。

## 渲染引擎工作的过程

![渲染流程图](./image/渲染流程图.png)

1. 如果在渲染过程中遇到javascript标签 因该怎么办

   1. 会立即停止解析HTML,而去加载和执行javascript代码
2. 为什么不去直接异步加载javascript代码,而要停止
      1. 应为js可以操作DOM
      2. 浏览器希望将HTML解析的DOM和js操作后的DOM放到一起来生成最终的DOM树,而不是频繁的去生成新的DOM树
3. js代码由javascript引擎来执行

## JavaScript引擎
1. 事实上我们编写的JavaScript无论你交给浏览器或者Node执行，最后都是需要被CPU执行的；
2. 但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU所执行;
3. 所以我们需要JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行；
4. 常见的javascript引擎又
	5. SpiderMonkey: 第一款javaScript引擎由Brendan Eich开发 (javascriupt的作者)
	6. Chakra : 微软开发 ,用于ie浏览器
	7. javascriptcore:WebKit 中的javascript 引擎,Apple公司开发
	8. V8 :Google开发的强大Javascript引擎,也帮助Chrome从众多浏览器脱颖而出
## JavaScript代码执行
	1. 编写后的js代码会有两种方式执行
      	1. 代码交给浏览器执行
         	1. 想让浏览器执行js需要通过html 
         	2. 在html中引入script代码 浏览器解析html的时候遇到script的时候就会根据src进行加载 执行javascript代码
      	2. 代码交给node环境执行
         	1. 在电脑中安装node.js环境
         	2. 通过终端命令nodejs文件的防止进行载入和执行对应的js文件
## WebKit内核
1. WebKit事实上由两部分组成的
	1. WebCore：负责HTML解析、布局、渲染等等相关的工作；
	2. JavaScriptCore：解析、执行JavaScript代码；

![webkit](./image/webkit.png)
	3. javascript引擎就是V8引擎

# V8引擎
	1. V8是用C ++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。
	2. 它实现ECMAScript和WebAssembly，并在Windows 7或更高版本，macOS 10.12+和使用x64，IA-32，ARM或MIPS处理器的Linux系统上运行。
	3. V8可以独立运行，也可以嵌入到任何C ++应用程序中。
![webkit](./image/V8编译过程.png)

# V8引擎的原理

1. Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；

   1. 如果函数没有被调用，那么是不会被转换成AST的；

   2. Parse的V8官方文档：https://v8.dev/blog/scanner
   
   3. ![V8Parser](./image/V8Parser.png)
   
2. Ignition是一个解释器，会将AST转换成ByteCode（字节码）
	1. 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
	2. 如果函数只调用一次，Ignition会执行解释执行ByteCode；
	3. Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter
	4. ![v8lgnitionpng](./image/v8lgnitionpng.png)
	
3. TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；
	1. 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能；
	2. 但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执行的是number类型，后来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；
	3. TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit
	4. ![V8TurboFan](./image/V8TurboFan.png)
	
4. 上面是JavaScript代码的执行过程，V8的内存回收也是其强大的另外一个原因
	1. Orinoco模块，负责垃圾回收，将程序中不需要的内存回收；
	
	2. Major GC指的是主要的垃圾回收器 ,任何垃圾回收器都有一些必须定期执行的基本任务：
	
	   1. 识别活/死对象
	   2. 回收/重用死对象占用的内存
	   3. 压缩/碎片整理存储器（可选）
	
	3. 如何区分是否是活跃性的
	
	   1. 垃圾回收器通过使用可访问性作为“活跃性”的代理来做到这一点。这意味着必须保留运行时中当前可访问的任何对象，并且可以收集任何无法访问的对象。(这个对象必须可以为访问到)
	
	   2. 标记是找到可触及对象的过程,GC 从一组已知对象指针（称为根集）开始。这包括执行堆栈和全局对象。然后，它跟踪指向 JavaScript 对象的每个指针，并将该对象标记为可访问。GC 跟踪该对象中的每个指针，并以递归方式继续此过程，直到找到并标记运行时中可访问的每个对象
	
	4. Orinoco的V8官方文档：https://v8.dev/blog/trash-talk
	
# 什么是nodejs

	Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。
1. Node.js基于V8引擎来执行JavaScript的代码，但是不仅仅只有V8引擎：
2. V8可以嵌入到任何C ++应用程序中，无论是Chrome还是Node.js，事实上都是嵌入了V8引擎来执行JavaScript代码；
3. 但是在Chrome浏览器中，还需要解析、渲染HTML、CSS等相关渲染引擎，另外还需要提供支持浏览器操作的API、浏览器自己的事件循环等；
4. 另外，在Node.js中我们也需要进行一些额外的操作，比如文件系统读/写、网络IO、加密、压缩解压文件等操作；
![浏览器和nodejs的区别](./image/浏览器和nodejs的区别.png)

# Node.js架构

1. 编写的JavaScript代码会经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中；p libuv（Unicorn Velociraptor—独角伶盗龙）是使用C语言编写的库；、

2. libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容；

   ![Nodejs架构图](./image/Nodejs架构图.png)

# Node.js的应用场景

1. 目前前端开发的库都是以node包的形式进行管理

2. npm yarn 工具成为前端开发使用最多的工具

3. 大量项目需要借助Node.js完成前后端渲染的同构应用

4. 资深前端工程师需要为项目编写脚本工具（前端工程师编写脚本通常会使用JavaScript，而不是Python或者shell）；

5. 很多企业在使用Electron来开发桌面应用程序；

# Node的版本工具
1. nvm：Node Version Manager
2. n：Interactively Manage Your Node.js Versions（交互式管理你的Node.js版本）
# Nodejs的REPL
	REPL 是Read-Eval-Print-Loop 翻译为 读取-求职-输出-循环
	REPL 是一个简单的交互式的编程环境;
# Node程序传递参数
1. 正常情况下执行一个node程序，直接跟上我们对应的文件即可：
		
		node index.js
2. 但是，在某些情况下执行node程序的过程中，我们可能希望给node传递一些参数：
		
		node index.js env=development coderwhy
3.  获取参数其实是在process的内置对象中的；
4. 如果我们直接打印这个内置对象，它里面包含特别的信息：
5. 其他的一些信息，比如版本、操作系统等大家可以自行查看，后面用到一些其他的我们还会提到；
6. 其中的argv属性 包含了传递的参数
```javascript
	process.argv.forEach((item)=>{
		console.log(item)
	})
```
# Node的输出
console.log

	 最常用的输入内容的方式：console.log
console.clear

	清空控制台：console.clear
console.trace

	打印函数的调用栈：console.trace
	https://nodejs.org/dist/latest-v14.x/docs/api/console.html
# 全局对象
	Node中给我们提供了一些全局对象，方便我们进行一些操作

![Nodejs架构图](./image/全局对象.png) 
# 特殊的全局对象
	1. 特殊的全局对象可以在模块中任意使用，但是在命令行交互中是不可以使用的；
	2. __dirname、__filename、exports、module、require()
1. dirname：获取当前文件所在的路径：
   1. 注意：不包括后面的文件名
2.	__filename：获取当前文件所在的路径和文件名称：
      1. 注意：包括后面的文件名称
```javascript
//index.js
	console.log(__dirname)
	//D:\学习\poroone\utils\Nodejs
	console.log(__filename)
	//D:\学习\poroone\utils\Nodejs\index.js
```
# 常见的全局对象
1. process对象process中提供了node经常中相关的信息
	1. 比如node的运行环境 ,参数信息等
2. console对象:提供简单的调试控制台	
   1. https://nodejs.org/api/console.html
3. 定时器函数:在Node中使用定时器的几种方式
   1. setTimeout(callback, delay[, ...args])：callback在delay毫秒后执行一次；
   2. setInterval(callback, delay[, ...args])：callback每delay毫秒重复执行一次；
   3. setImmediate(callback[, ...args])：callbackI / O事件后的回调的“立即”执行；
   4. process.nextTick(callback[, ...args])：添加到下一次tick队列中；
# global对象
1. global是一个全局对象，事实上前端我们提到的process、console、setTimeout等都有被放到global中
# global和window的区别
1. 在浏览器中，全局变量都是在window上的，比如有document、setInterval、setTimeout、alert、console等等
2. 在Node中，我们也有一个global属性，并且看起来它里面有很多其他对象。
3. 但是在浏览器中执行的JavaScript代码，如果我们在顶级范围内通过var定义的一个属性，默认会被添加到window对象上：
4. 但是在node中，我们通过var定义一个变量，它只是在当前模块中有一个变量，不会放到全局中;
# 什么是模块化
1. 模块化的目的就是吧一个程序划分成一个个小的模块
2. 这个模块中编写属于自己的逻辑代码.并且有自己的作用域,不会影响到其他的模块
3. 这个模块可以将自己希望暴露的变量.函数.对象等导出给结构使用
4. 也可以通过某种方式引入另外结构中国的变量,函数,对象等
 按照这种结构划分开发程序的过程,就是模块化开发
# CommonJS和Node
CommonJs是一个规范,简称Cjs
1. CommonJS规范的核心变量：exports、module.exports、require；
2. exports和module.exports可以负责对模块中的内容进行导出；
3. require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；
4. 在Node中每一个js文件都是一个单独的模块 
## exports导出
	exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出
```javascript
// bar.js
	exports.name=name;
	exports.age=age;
	exports.sayPoro=sayPoro;
```
	引入
```javascript
// main.js
const bar=require("bar.js")
```
1. main中的bar变量等于exports对象；
2. 也就是require通过各种查找方式，最终找到了exports这个对象；
3. 并且将这个exports对象赋值给了bar变量；
4. bar变量就是exports对象了；
5. exports中的值被修改 那么引动的地方也会被修改应为是浅拷贝

	![exports的赋值过程](./image/exports的赋值过程.png)
# module.exports	
1. CommonJS中是没有module.exports的概念的；
2. 但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是module；
3. 所以在Node中真正用于导出的其实根本不是exports，而是module.exports；
4. 因为module才是导出的真正实现者；
5. 但是，为什么exports也可以导出呢？
   1. 这是因为module对象的exports属性是exports对象的一个引用；
   2. 也就是说 module.exports = exports = main中的bar；
![module.exports的解析过程1](./image/module.exports的解析过程1.png)
![module.exports的解析过程1](./image/module.exports的解析过程2.png)

# 模块的加载过程
1. 模块在被第一次引入时,模块中的js代码会被运行一次
2. 模块被多次引入时,会缓存,最终只加载一次
   1. 为什么智慧加载一次
   2. 应为每个模块对象module都有一个属性 loaded
   3. 为false表示还没有假爱,为true表示已经加载;
3. 如果有循环引入,那么加载顺序是什么
   1. ![模块加载过程](./image/模块加载过程.png)
      1. 图结构
      2. 图结构在遍历的过程中,有深度有限搜索(DFS,depth first search)和广度优先搜索(BFS, breadth first search)
      3. Node采用的是深度优先算法：main -> aaa -> ccc -> ddd -> eee ->bbb
# CommonJS规范缺点
1.  CommonJS加载模块是同步的:
    1. 同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行；
    2. 这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快；
2. 如果将它应用于浏览器呢
   1. 浏览器加载js文件需要先从服务器将文件下载下来,之后在加载运行
   2. 那么采用同步就意味着后续的js代码无法正常运行.即使是一些简单的Dom操作
3. 所以在浏览器中,通常不使用commonjs规范
4. 早起为了在浏览器中使用模块化,通常会采用AMD或CMD
   1. 现在浏览器已经支持es module使用webpack可以实现对CommonJS或者ES Module代码的转换
# AMD规范
1. AMD主要是应用于浏览器的模块化规范
   1. AMD是Asynchronous Module Definition（异步模块定义）的缩写
   2. AMD实现的比较常用的库是require.js和curl.js
   3. https://www.cnblogs.com/gopark/p/10685118.html
# CMD规范
1. CMD规范也是应用与浏览器的一种模块化规范
	1. CMD是Common Module Definition（通用模块定义）的缩写；
	2. 它也采用了异步加载模块，但是它将CommonJS的优点吸收了过来；
	3. https://www.cnblogs.com/gopark/p/10685118.html
# ESModule
1. ES Module和CommonJS的模块化有一些不同之处：
   1. ES Module使用了import和export关键字；
   2. 另一方面它采用编译期的静态分析，并且也加入了动态引用的方式；
2. ES Module模块采用export和import关键字来实现模块化：
   1. export负责将模块内的内容导出；
   2. import负责从其他模块导入内容；
3. 采用ES Module将自动采用严格模式：use strict
   1. 严格模式 : https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode
# export关键字
	export关键字将一个模块中的变量、函数、类等导出；
   1. 方式一：在语句声明的前面直接加上export关键字
   2. 方式二：将所有需要导出的标识符，放到export后面的 {}中
      1. 注意：这里的 {}里面不是ES6的对象字面量的增强写法，{}也不是表示一个对象的；
      2. 所以： export {name: name}，是错误的写法；
   3. 方式三：导出时给标识符起一个别名
# import关键字
	import关键字负责从另外一个模块中导入内容
1. 方式一：import {标识符列表} from '模块'；
   1. 这里的{}也不是一个对象，里面只是存放导入的标识符列表内容；
2. 导入时给标识符起别名
3. 通过 * 将模块功能放到一个模块功能对象（a module object）上
# export 和 import结合使用
export和import语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。
```javascript 
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
1. 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中；
2. 这样方便指定统一的接口规范，也方便阅读；
3. 这个时候，我们就可以使用export和import结合使用；
# default用法
1. 名字的导出
   1. 在导出export时指定了名字；
   2. 在导入import时需要知道具体的名字；
3. 默认导出
   1. 默认导出export时可以不需要指定名字；
   2. 在导入时不需要使用 {}，并且可以自己来指定名字；
   3. 在一个模块中，只能有一个默认导出（default export）；
# import函数
1. 通过import加载一个模块，是不可以在其放到逻辑代码中的
   1. 这是因为ES Module在被JS引擎解析时，就必须知道它的依赖关系
   2. 由于这个时候js代码没有任何的运行，所以无法在进行类似于if判断中根据代码的执行情况；
   3. 甚至下面的这种写法也是错误的：因为我们必须到运行时能确定path的值；
2. 如果想要动态的加载某一个模块可以使用
   1. 这个时候我们需要使用 import() 函数来动态加载
```javascript
	let flag=true
	if(flag){
		import("xxxxxx").then((item)=>{
			item.aaa()
		})
	}else{
		import("xxxxxx").then((module)=>{
			module.bbb()
		})
	}
```
# CommonJS的加载过程
1. CommonJS模块加载js文件的过程是运行时加载的，并且是同步的：
   1. 运行时加载意味着是js引擎在执行js代码的过程中加载 模块；
   2. 同步的就意味着一个文件没有加载结束之前，后面的代码都不会执行；
```javascript
	const flag=true;
	if(flag){
		const foo=require("xxx")
		console.log("继续执行")
	}
```
2. CommonJS通过module.exports导出的是一个对象：
   1. 导出的是一个对象意味着可以将这个对象的引用在其他模块中赋值给其他变量；
   2. 但是最终他们指向的都是同一个对象，那么一个变量修改了对象的属性，所有的地方都会被修改；
# ES Module加载过程
1. ES Module加载js文件的过程是编译（解析）时加载的，并且是异步的
   1. 编译时（解析）时加载，意味着import不能和运行时相关的内容放在一起使用：
   2. 比如from后面的路径需要动态获取；
   3. 比如不能将import放到if等语句的代码块中；
   4. 所以我们有时候也称ES Module是静态解析的，而不是动态或者运行时解析的；
2. 异步的意味着：JS引擎在遇到import时会去获取这个js文件，但是这个获取的过程是异步的，并不会阻塞主线程继续执行；
   1. 也就是说设置了 type=module 的代码，相当于在script标签上也加上了 async 属性；
   2. 如果我们后面有普通的script标签以及对应的代码，那么ES Module对应的js文件和代码不会阻塞它们的执行；
```javascript
<script src="main.js" type="module"></script>
// main.js文件不会阻塞执行
<script src="index.js"></script>
```
3. ES Module通过export导出的是变量本身的引用：
   1. export在导出一个变量时，js引擎会解析这个语法，并且创建模块环境记录（module environment record）；
   2. 模块环境记录会和变量进行 绑定（binding），并且这个绑定是实时的；
   3. 而在导入的地方，我们是可以实时的获取到绑定的最新值的；
4. 所以，如果在导出的模块中修改了变化，那么导入的地方可以实时获取最新的变量；
5. 注意：在导入的地方不可以修改变量，因为它只是被绑定到了这个变量上（其实是一个常量）
![esModule的解析过程](./image/esModule的解析过程.png)
# Node对ES Module的支持
	1. 在package.json中配置 type: module
	2. 文件以 .mjs 结尾，表示使用的是ES Module；
# CommonJS和ES Module交互
1. 通常情况下，CommonJS不能加载ES Module
   1. 因为CommonJS是同步加载的，但是ES Module必须经过静态分析等，无法在这个时候执行JavaScript代码
   2. 但是这个并非绝对的，某些平台在实现的时候可以对代码进行针对性的解析，也可能会支持；
   3. Node当中是不支持的；
2. 多数情况下，ES Module可以加载CommonJS
   1. ES Module在加载CommonJS时，会将其module.exports导出的内容作为default导出方式来使用；
   2. 这个依然需要看具体的实现，比如webpack中是支持的、Node最新的Current版本也是支持的；
   3. 但是在最新的LTS版本中就不支持