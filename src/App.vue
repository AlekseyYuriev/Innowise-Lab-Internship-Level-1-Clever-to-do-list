<template>
  <div class="page">
    <div class="navbar">
      <button @click="$router.push('/')">HomePage</button>
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

.page {
  min-height: 100vh;
  min-width: 320px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0 30px 0;
  background-color: #e8e8ea;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
}

.navbar {
  margin: 0 auto;
  padding-bottom: 50px;
  max-width: 762px;
  display: flex;
  justify-content: space-around;
}
</style>
