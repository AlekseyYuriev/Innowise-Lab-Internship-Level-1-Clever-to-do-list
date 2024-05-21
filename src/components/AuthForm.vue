<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">Sign up</h1>
      <form class="auth__form">
        <label>
          <input type="text" name="email" placeholder="Your email address" />
        </label>
        <label>
          <input type="text" name="email" placeholder="Password" />
        </label>
        <button>Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.auth {
  max-width: 762px;
  min-height: 400px;
  width: 100%;
  background-color: #fff;
  margin: auto;
  border-radius: 16px;
}
.auth__container {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: auto;
}
.auth__form {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
