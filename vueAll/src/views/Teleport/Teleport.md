# Teleport
    它是一个Vue提供的内置组件 远距离运输 可以把组件移动到指定的元素下
- 它有两个属性
- to：指定将其中的内容移动到的目标元素，可以使用选择器
- disabled：是否禁用 teleport 的功能
```javascript
    <div class="my-app">
        <teleport to="body">
            <h1>poro</h1>
        </teleport>
    </div>
    h1会被移动到body下
```
