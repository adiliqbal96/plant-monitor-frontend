<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label>Username:</label>
          <input v-model="username" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      handleLogin() {
        // For now, use a hardcoded check
        if (this.username === 'admin' && this.password === 'admin123') {
          localStorage.setItem('token', 'mock-token');
          localStorage.setItem('role', 'admin');
          this.$router.push('/');
        } else if (this.username === 'user' && this.password === 'user123') {
          localStorage.setItem('token', 'mock-token');
          localStorage.setItem('role', 'user');
          this.$router.push('/');
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: 0 auto;
  }
  .error {
    color: red;
  }
  </style>
  