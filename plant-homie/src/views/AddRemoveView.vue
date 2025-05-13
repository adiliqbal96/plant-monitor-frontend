<template>
    <div class="management-container">
      <h1 class="title">🌿 Manage Your Plants</h1>
  
      <div class="form-section">
        <input v-model="newPlantName" placeholder="New Plant Name" class="input" />
        <button @click="addPlant" class="add-button">🌱 Add Plant</button>
      </div>
  
      <ul class="plant-list">
        <li v-for="plant in customPlants" :key="plant.plant_ID" class="plant-item">
          {{ plant.plant_Name }} ({{ plant.plant_type }})
          <button @click="removePlant(plant.plant_ID)" class="remove-button">❌</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { getAllPlants, createPlant, deletePlant } from '@/services/PlantService';
  
  export default {
    name: 'AddRemoveView',
    data() {
      return {
        newPlantName: '',
        customPlants: [],
      };
    },
    methods: {
      async loadPlants() {
        try {
          const res = await getAllPlants();
          this.customPlants = res.data;
        } catch (err) {
          console.error('Kunne ikke hente planter:', err);
        }
      },
      async addPlant() {
        if (!this.newPlantName.trim()) return;
        try {
          await createPlant({
            plant_Name: this.newPlantName.trim(),
            plant_type: 'Custom',
          });
          this.newPlantName = '';
          await this.loadPlants();
        } catch (err) {
          console.error('Kunne ikke tilføje plante:', err);
        }
      },
      async removePlant(id) {
        try {
          await deletePlant(id);
          await this.loadPlants();
        } catch (err) {
          console.error('Kunne ikke slette plante:', err);
        }
      },
    },
    mounted() {
      this.loadPlants();
    },
  };
  </script>
  
  <style scoped>
  .management-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #2f855a;
  }
  
  .form-section {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .input {
    flex: 1;
    padding: 0.6rem;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .add-button {
    background: #38a169;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
  }
  
  .add-button:hover {
    background: #2f855a;
  }
  
  .plant-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .plant-item {
    background: #f0fff4;
    border: 1px solid #c6f6d5;
    padding: 0.8rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .remove-button {
    background: #e53e3e;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .remove-button:hover {
    background: #c53030;
  }
  </style>
  