<template>
  <div id="app">
    <nav v-if="isLoggedIn" class="navbar">
      <div class="nav-left">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/plant-list">Plant List</router-link>
        <router-link to="/notifications">Notifications</router-link>
        <router-link to="/history">History</router-link>
        <router-link to="/add-remove">Add/Remove Plants</router-link>
      </div>
      <div class="nav-right">
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: !!sessionStorage.getItem('token')
    };
  },
  watch: {
    // Whenever the route changes, re-check login state
    $route() {
      this.isLoggedIn = !!sessionStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #f0fff4;
  border-bottom: 1px solid #c6f6d5;
  font-family: 'Segoe UI', sans-serif;
}
.nav-left {
  display: flex;
  gap: 1.2rem;
}
.nav-left a {
  text-decoration: none;
  color: #2f855a;
  font-weight: 500;
}
.nav-left a:hover {
  color: #276749;
}
.nav-left a.router-link-exact-active {
  font-weight: bold;
  color: #22543d;
}
.logout-button {
  background-color: #38a169;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #2f855a;
}
</style>
