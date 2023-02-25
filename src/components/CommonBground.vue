<template>
  <div class="container">
    <div class="square">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(200deg, #e3c5eb, #a9c1ed);
  overflow: hidden;
}

ul li {
  position: absolute;
  border: 1px solid #fff;
  background-color: #fff;
  width: 30px;
  height: 30px;
  list-style: none;
  /* opacity 属性定义整个元素的透明值（合法的范围是：0 - 1） */
  opacity: 0;
}

.square li {
  top: 40vh;
  left: 60vw;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: square 10s linear infinite;
}

.square li:nth-child(2) {
  top: 80vh;
  left: 10vw;
  /* 设置动画延迟时间 */
  animation-delay: 2s;
}

.square li:nth-child(3) {
  top: 80vh;
  left: 85vw;
  /* 设置动画延迟时间 */
  animation-delay: 4s;
}

.square li:nth-child(4) {
  top: 10vh;
  left: 70vw;
  /* 设置动画延迟 */
  animation-delay: 6s;
}

.square li:nth-child(5) {
  top: 10vh;
  left: 10vw;
  /* 设置动画延迟 */
  animation-delay: 8s;
}

.circle li {
  bottom: 0;
  left: 15vw;
  /* 执行动画 */
  animation: circle 10s linear infinite;
}

.circle li:nth-child(2) {
  left: 35vw;
  /* 设置动画延迟时间 */
  animation-delay: 2s;
}

.circle li:nth-child(3) {
  left: 55vw;
  /* 设置动画延迟时间 */
  animation-delay: 6s;
}

.circle li:nth-child(4) {
  left: 75vw;
  /* 设置动画延迟时间 */
  animation-delay: 4s;
}

.circle li:nth-child(5) {
  left: 90vw;
  /* 设置动画延迟时间 */
  animation-delay: 8s;
}

@keyframes circle {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0;
  }

  100% {
    transform: scale(5) rotateY(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}
</style>
