<template>
    <div class="login-page">
      <h1 class="logo">🌿 Plant Homie</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Username:</label>
          <input v-model="username" required />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
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
        if (this.username === 'admin' && this.password === 'admin123') {
          sessionStorage.setItem('token', 'mock-token');
          sessionStorage.setItem('role', 'admin');
          this.$router.push('/dashboard');
        } else if (this.username === 'user' && this.password === 'user123') {
          sessionStorage.setItem('token', 'mock-token');
          sessionStorage.setItem('role', 'user');
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0fff4;
    flex-direction: column;
  }
  .logo {
    font-size: 2rem;
    color: #2f855a;
    margin-bottom: 1rem;
  }
  form {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .login-button {
    width: 100%;
    padding: 0.7rem;
    background-color: #38a169;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  .login-button:hover {
    background-color: #2f855a;
  }
  .error {
    margin-top: 1rem;
    color: red;
  }
  </style>
  