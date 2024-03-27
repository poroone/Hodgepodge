<script setup>
import { reactive,onBeforeUnmount} from "vue";
// 生成随机数
const MathRandom = (init, fin) => {
  return Math.floor(Math.random() * (fin - init) + init);
};
const arrList = []; //生成的容器
let arrOne = []; //分开的大于50
let arrTwo = []; //分开的小于50
let ref_div = reactive([]); //页面元素需要用到的 //第四题

// 生成数据
for (let i = 0; i < 100; i++) {
  let object = {};
  object.width = MathRandom(0, 100);
  object.height = MathRandom(0, 100);
  object.top = MathRandom(0, 600);
  object.left = MathRandom(0, 800);
  object.R = MathRandom(0, 255);
  object.G = MathRandom(0, 255);
  object.B = MathRandom(0, 255);
  arrList.push(object);
}

console.log(arrList, "第二题");
// 分开数据
arrList.forEach((v) => {
  v.width >= 50 ? arrOne.push(v) : arrTwo.push(v);
});

console.log("大于50", arrOne);
console.log("小于50", arrTwo);
// 每次拿两个对象
function change() {
  ref_div.splice(0)
  let div_One = MathRandom(0, arrOne.length);
  let div_two = MathRandom(0, arrTwo.length);
  ref_div.push(arrOne[div_One]);
  ref_div.push(arrTwo[div_two]);
}

change();
  const timer=setInterval(() => {
    change();
  }, 1000);
  
  // 防止内存泄漏
  onBeforeUnmount(()=>{
    setTimeout(timer)
  })
</script>

<template>
  <!-- 第一题 -->
  <div class="box">
    <div
      v-for="item in ref_div"
      :key="item"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        top: item.top + 'px',
        left: item.left + 'px',
        position: 'absolute',
        background: `rgb(${item.R},${item.G},${item.B})`,
      }"
    >
      W{{ item.width }}H{{ item.height }}T{{item.top}}L{{item.left}}
    </div>
  </div>
  <!-- 第二题 -->
</template>

<style scoped>
.box {
  width: 800px;
  height: 600px;
  background: #000;
  position: sticky;
}
.box div {
  float: left;
  background: #fff;
  margin: 10px;
  color: #fff;
}
</style>
