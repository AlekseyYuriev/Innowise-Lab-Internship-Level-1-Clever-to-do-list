<template>
  <AuthForm
    title="Sign Up"
    buttonText="Signup"
    subtitleText="Already have an account?"
    linkText="Go to Sign In"
  />
</template>

<script>
import AuthForm from '../components/AuthForm.vue'
export default {
  components: {
    AuthForm
  }
}
</script>

<style scoped></style>
