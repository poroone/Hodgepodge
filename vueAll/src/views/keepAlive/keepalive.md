# keep-alive
    在默认情况下切换组建后 组件时会被销毁的 再回来的时候重新创建组件 
    如果希望不被销毁继续保持组件状态 可以使用 keep-alive
## keep-alive 属性
    include  匹配的名字进行缓存 可以接收 string | Array |RegExp
    exclude  匹配的名字不会被缓存 可以接收 string | Array |RegExp
    max  可以缓存多少组件的实例 一旦超过这个数字 缓存中最长时间没有被访问的实例会被销毁 可以接受 number | string
## keep-alive 生命周期
    activated 进入组件
    deactivated 离开组件
## 使用
```javascript

    <keep-alive>
        <component :is="组件名字"></component>
    </keep-alive>

    <keep-alive include="组件名字,组件名字">
        <component :is="组件名字"></component>
    </keep-alive>
    <keep-alive include="组件名字,组件名字" exclude="不缓存的" max="最大数量">
        <component :is="组件名字"></component>
    </keep-alive>
    
```
