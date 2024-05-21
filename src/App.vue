<template>
  <div>
    <button @click="$router.push('/')">HomePage</button>
    <button @click="$router.push('/about')">MainPage</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
