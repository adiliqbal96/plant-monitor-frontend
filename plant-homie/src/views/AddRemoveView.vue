<!-- <template>
    <div>
      <h1>Add / Remove Plants</h1>
  
      <input v-model="newPlantName" placeholder="New Plant Name" />
      <button @click="addPlant">Add Plant</button>
  
      <ul>
        <li v-for="(plant, index) in customPlants" :key="index">
          {{ plant }}
          <button @click="removePlant(index)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddRemoveView',
    data() {
      return {
        newPlantName: '',
        customPlants: [],
      };
    },
    methods: {
      addPlant() {
        if (this.newPlantName.trim()) {
          this.customPlants.push(this.newPlantName.trim());
          this.newPlantName = '';
        }
      },
      removePlant(index) {
        this.customPlants.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  @import '../assets/style.css';
  input {
    margin-right: 8px;
  }
  button {
    margin-left: 4px;
  }
  </style>
   -->
   <template>
    <div class="management-container">
      <h1 class="title">🌿 Manage Your Plants</h1>
  
      <div class="form-section">
        <input v-model="newPlantName" placeholder="New Plant Name" />
        <button @click="addPlant">➕ Add Plant</button>
      </div>
  
      <ul class="plant-list">
        <li v-for="(plant, index) in customPlants" :key="index">
          {{ plant }}
          <button @click="removePlant(index)">❌ Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddRemoveView',
    data() {
      return {
        newPlantName: '',
        customPlants: [],
      };
    },
    methods: {
      addPlant() {
        if (this.newPlantName.trim()) {
          this.customPlants.push(this.newPlantName.trim());
          this.newPlantName = '';
        }
      },
      removePlant(index) {
        this.customPlants.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .management-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .form-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  input {
    flex: 1;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background: #2b6cb0;
  }
  .plant-list {
    list-style: none;
    padding: 0;
  }
  .plant-list li {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #edf2f7;
    border-radius: 5px;
  }
  </style>
  