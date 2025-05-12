<template>
    <div>
      <h1>Notifications</h1>
  
      <label>
        <input type="checkbox" v-model="notificationsEnabled" />
        Enable Notifications
      </label>
  
      <div v-if="notificationsEnabled">
        <label>
          Humidity Alert Threshold (%):
          <input type="number" v-model.number="humidityThreshold" />
        </label>
        <br />
        <label>
          Moisture Alert Threshold (%):
          <input type="number" v-model.number="moistureThreshold" />
        </label>
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
  @import '../assets/style.css';
  input[type='number'] {
    width: 60px;
    margin-left: 8px;
  }
  </style>
  