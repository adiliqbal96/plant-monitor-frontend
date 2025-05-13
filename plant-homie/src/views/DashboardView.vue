<template>
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
            <input type="checkbox" v-model="autoMode" @change="toggleAutoMode">
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
        <li v-for="entry in history" :key="entry.id">
          {{ entry.timestamp }} — {{ entry.action }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
    async fetchStatus() {
      try {
        const [moistureRes, humidityRes, tempRes] = await Promise.all([
          axios.get('https://localhost:5001/api/plantlog/soilmoisture/1'),
          axios.get('https://localhost:5001/api/plantlog/airhumidity/1'),
          axios.get('https://localhost:5001/api/plantlog/temperature/1')
        ]);

        this.moisture = moistureRes.data;
        this.humidity = humidityRes.data;
        this.temperature = tempRes.data;
        this.lastWatered = new Date().toLocaleString();
      } catch (err) {
        console.error('Kunne ikke hente status:', err);
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
          action: 'Watered manually'
        });
      }, 1000);
    },
    toggleAutoMode() {
      this.message = this.autoMode ? 'Auto-mode enabled' : 'Auto-mode disabled';
    },
    async loadHistory() {
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
  },
  mounted() {
    this.fetchStatus();
    this.loadHistory();
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 900px;
  margin: 0 auto;
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.history ul {
  list-style: none;
  padding: 0;
}
.history li {
  margin: 0.5rem 0;
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