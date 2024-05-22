<template>
  <div class="wrapper">
    <div class="navbar">
      <button @click="$router.push('/')">HomePage</button>
      <button @click="$router.push('/about')">MainPage</button>
      <button @click="$router.push('/signup')">Register</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
@import './assets/normalize.css';

.wrapper {
  background-color: #e8e8ea;
  min-width: 320px;
  text-align: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
}

.navbar {
  padding-top: 30px;
  margin: 0 auto;
  max-width: 762px;
  display: flex;
  justify-content: space-around;
}
</style>
