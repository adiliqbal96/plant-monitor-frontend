<template>
    <div>
      <h1>Watering & History</h1>
  
      <ul>
        <li v-for="entry in history" :key="entry.id">
          {{ entry.timestamp }} — {{ entry.action }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HistoryView',
    data() {
      return {
        history: [
          { id: 1, timestamp: '2025-05-07 10:00', action: 'Watered manually' },
          { id: 2, timestamp: '2025-05-06 18:30', action: 'Auto-mode watering' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  @import '../assets/style.css';
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 8px 0;
  }
  </style>
  