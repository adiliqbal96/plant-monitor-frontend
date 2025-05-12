<template>
  <div id="app">
    <button @click="logout">Logout</button>
    <nav>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/plant-list">Plant List</router-link> |
      <router-link to="/notifications">Notifications</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/add-remove">Add/Remove Plants</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: green;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
