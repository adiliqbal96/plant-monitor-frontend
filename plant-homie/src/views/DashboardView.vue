<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <h1 class="title">🌿 Plant Homie Dashboard</h1>

      <div class="grid">
        <!-- Status Panel -->
        <div class="card">
          <h2>Status</h2>
          <p><strong>Moisture:</strong> {{ moisture }}%</p>
          <p><strong>Humidity:</strong> {{ humidity }}%</p>
          <p><strong>Temperature:</strong> {{ temperature }}°C</p>
          <p><strong>Last Watered:</strong> {{ lastWatered }}</p>
        </div>

        <!-- Actions Panel -->
        <div class="card">
          <h2>Actions</h2>
          <button @click="waterPlant">💧 Water Plant</button>
          <div>
            <label>
              <input type="checkbox" v-model="autoMode" @change="toggleAutoMode" />
              Enable Auto-Mode
            </label>
          </div>
          <p class="message">{{ message }}</p>
        </div>
      </div>

      <!-- History Section -->
      <div class="card history">
        <h2>Recent History</h2>
        <ul>
          <li v-for="entry in history" :key="entry.id" class="log-entry">
            <div class="log-entry-content">
              <div><strong>{{ entry.timestamp }}</strong></div>
              <div>🌡 Temp: {{ entry.temp }}°C</div>
              <div>💧 Moisture: {{ entry.moisture }}%</div>
              <div>💨 Humidity: {{ entry.humidity }}%</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_BASE = 'https://planthomieapi-hfg3f5huercmcccz.westeurope-01.azurewebsites.net/api';

export default {
  name: 'DashboardView',
  data() {
    return {
      moisture: 0,
      humidity: 0,
      temperature: 0,
      lastWatered: 'Loading...',
      autoMode: false,
      message: '',
      history: [],
    };
  },
  methods: {
    format(value) {
      return value !== undefined ? parseFloat(value).toFixed(1) : 'N/A';
    },
    async fetchStatus() {
      try {
        const [moistureRes, humidityRes, tempRes] = await Promise.all([
          axios.get(`${API_BASE}/plantlog/soilmoisture/1`),
          axios.get(`${API_BASE}/plantlog/airhumidity/1`),
          axios.get(`${API_BASE}/plantlog/temperature/1`)
        ]);

        this.moisture = this.format(typeof moistureRes.data === 'number' ? moistureRes.data : moistureRes.data.moisture);
        this.humidity = this.format(typeof humidityRes.data === 'number' ? humidityRes.data : humidityRes.data.humidity);
        this.temperature = this.format(typeof tempRes.data === 'number' ? tempRes.data : tempRes.data.temperature);

        this.lastWatered = new Date().toLocaleString();
      } catch (err) {
        console.error('Kunne ikke hente status fra Azure:', err);
      }
    },
    waterPlant() {
      this.message = 'Watering...';
      setTimeout(() => {
        this.message = 'Plant watered!';
        this.lastWatered = new Date().toLocaleString();
        this.history.unshift({
          id: Date.now(),
          timestamp: this.lastWatered,
          temp: this.temperature,
          moisture: this.moisture,
          humidity: this.humidity
        });
      }, 1000);
    },
    toggleAutoMode() {
      this.message = this.autoMode ? 'Auto-mode enabled' : 'Auto-mode disabled';
    },
    async loadHistory() {
      try {
        const res = await axios.get(`${API_BASE}/plantlog`);
        this.history = Array.isArray(res.data)
          ? res.data.map(log => ({
              id: log.plantLog_ID,
              timestamp: new Date(log.dato_Tid).toLocaleString(),
              temp: this.format(log.temperatureLevel ?? log.temperature),
              moisture: this.format(log.waterLevel),
              humidity: this.format(log.airHumidityLevel)
            }))
          : [];
      } catch (err) {
        console.error('Kunne ikke hente historik fra Azure:', err);
      }
    },
  },
  mounted() {
    this.fetchStatus();
    this.loadHistory();
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  justify-content: center;
}
.dashboard-container {
  max-width: 900px;
  width: 100%;
  padding: 2rem;
}
.title {
  text-align: center;
  margin-bottom: 2rem;
}
.grid {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
.card {
  flex: 1;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.history ul {
  list-style: none;
  padding: 0;
}
.log-entry {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f0fff4;
  border: 1px solid #c6f6d5;
  border-radius: 8px;
  text-align: center;
}
.log-entry-content > div {
  margin: 0.2rem 0;
}
button {
  padding: 0.5rem 1rem;
  background: #38a169;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #2f855a;
}
.message {
  margin-top: 1rem;
  color: #555;
}
</style>
