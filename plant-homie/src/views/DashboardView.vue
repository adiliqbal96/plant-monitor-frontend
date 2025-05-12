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
    fetchStatus() {
      // Simulated values for now
      this.moisture = Math.floor(Math.random() * 100);
      this.humidity = Math.floor(Math.random() * 100);
      this.temperature = 20 + Math.floor(Math.random() * 10);
      this.lastWatered = new Date().toLocaleString();
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
    loadHistory() {
      this.history = [
        { id: 1, timestamp: '2025-05-07 10:00', action: 'Watered manually' },
        { id: 2, timestamp: '2025-05-06 18:30', action: 'Auto-mode watering' },
      ];
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
