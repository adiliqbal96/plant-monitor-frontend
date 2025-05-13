<template>
    <div class="history-container">
      <h1 class="title">🕒 Watering & History</h1>
  
      <ul class="history-list">
        <li v-for="entry in history" :key="entry.id">
          <span class="timestamp">{{ entry.timestamp }}</span>
          <span class="action">— {{ entry.action }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'HistoryView',
    data() {
      return {
        history: [],
      };
    },
    async mounted() {
      try {
        const res = await axios.get('https://localhost:5001/api/plantlog');
        this.history = res.data.map(log => ({
          id: log.plantLog_ID,
          timestamp: new Date(log.dato_Tid).toLocaleString(),
          action: `Temp: ${log.temperatureLevel}°C, Moisture: ${log.waterLevel}%, Humidity: ${log.airHumidityLevel}%`
        }));
      } catch (err) {
        console.error('Kunne ikke hente historik:', err);
      }
    },
  };
  </script>
  
  <style scoped>
  .history-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .title {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: #2d3748;
  }
  
  .history-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .history-list li {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }
  
  .timestamp {
    color: #4a5568;
  }
  
  .action {
    font-weight: 500;
    color: #2c5282;
  }
  </style>