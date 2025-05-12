<template>
    <div class="notifications-container">
      <h1 class="title">🔔 Notifications</h1>
  
      <div class="card">
        <label class="checkbox-label">
          <input type="checkbox" v-model="notificationsEnabled" />
          Enable Notifications
        </label>
  
        <div v-if="notificationsEnabled" class="thresholds">
          <div class="threshold-input">
            <label>
              Humidity Alert Threshold (%):
              <input type="number" v-model.number="humidityThreshold" />
            </label>
          </div>
          <div class="threshold-input">
            <label>
              Moisture Alert Threshold (%):
              <input type="number" v-model.number="moistureThreshold" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotificationsView',
    data() {
      return {
        notificationsEnabled: true,
        humidityThreshold: 40,
        moistureThreshold: 30,
      };
    },
  };
  </script>
  
  <style scoped>
  .notifications-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #2d3748;
  }
  
  .card {
    background: #edf2f7;
    border: 1px solid #e2e8f0;
    padding: 1.5rem;
    border-radius: 10px;
  }
  
  .checkbox-label {
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .thresholds {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }
  
  .threshold-input label {
    font-size: 1rem;
    color: #2d3748;
  }
  
  input[type='number'] {
    margin-left: 0.5rem;
    padding: 4px 8px;
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  