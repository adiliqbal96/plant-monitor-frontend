<template>
    <div class="plant-list-container">
      <h1>🌿 Plant List (Perenual)</h1>
  
      <div class="filter-bar">
        <input
          v-model="searchQuery"
          @keyup.enter="searchPlants"
          placeholder="Search plants..."
          class="search-box"
        />
        <select v-model="selectedFilter" @change="searchPlants" class="filter-dropdown">
          <option value="">All</option>
          <option value="indoor=1">Indoor</option>
          <option value="watering=frequent">Frequent Watering</option>
          <option value="watering=average">Average Watering</option>
          <option value="watering=minimum">Minimum Watering</option>
        </select>
        <button @click="searchPlants" class="search-button">Search</button>
      </div>
  
      <ul class="plant-grid">
        <li
          v-for="plant in plantList"
          :key="plant.id"
          class="plant-card"
          @click="openModal(plant)"
        >
          <img
            :src="plant.default_image?.thumbnail || 'https://via.placeholder.com/150'"
            alt="Plant Image"
          />
          <div class="plant-info">
            <strong>{{ plant.common_name || 'Unknown' }}</strong>
            <br />
            <span v-if="plant.scientific_name?.length">
              ({{ plant.scientific_name[0] }})
            </span>
          </div>
        </li>
      </ul>
  
      <p v-if="loading" class="loading-text">Loading...</p>
  
      <!-- Modal -->
      <div v-if="selectedPlant" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <img
            :src="selectedPlant.default_image?.thumbnail || 'https://via.placeholder.com/300x200'"
            alt="Plant Image"
            class="modal-image"
          />
          <h2>{{ selectedPlant.common_name }}</h2>
          <p><strong>Scientific:</strong> {{ selectedPlant.scientific_name?.[0] || 'N/A' }}</p>
          <p><strong>Watering:</strong> {{ selectedPlant.watering || 'N/A' }}</p>
          <p><strong>Sunlight:</strong> {{ selectedPlant.sunlight?.join(', ') || 'N/A' }}</p>
          <p><strong>Soil:</strong> {{ selectedPlant.soil || 'N/A' }}</p>
          <p><strong>Maintenance:</strong> {{ selectedPlant.maintenance || 'N/A' }}</p>
          <p><strong>Cycle:</strong> {{ selectedPlant.cycle || 'N/A' }}</p>
          <button @click="closeModal" class="close-button">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlantListView',
    data() {
      return {
        searchQuery: '',
        selectedFilter: '',
        plantList: [],
        selectedPlant: null,
        loading: false,
        apiKey: 'sk-2VlB6821be079100510266'
      };
    },
    methods: {
      async searchPlants() {
        this.loading = true;
        const query = this.searchQuery.trim();
        const filter = this.selectedFilter ? `&${this.selectedFilter}` : '';
        const searchUrl = `https://perenual.com/api/species-list?key=${this.apiKey}${query ? `&q=${query}` : ''}${filter}`;
        try {
          const res = await fetch(searchUrl);
          const data = await res.json();
          this.plantList = data.data?.filter(p => p.default_image?.thumbnail) || [];
        } catch (err) {
          console.error('Failed to fetch plants:', err);
          this.plantList = [];
        } finally {
          this.loading = false;
        }
      },
      async openModal(plant) {
        const detailsUrl = `https://perenual.com/api/species/details/${plant.id}?key=${this.apiKey}`;
        try {
          const res = await fetch(detailsUrl);
          const data = await res.json();
          this.selectedPlant = { ...plant, ...data };
        } catch (err) {
          console.error('Failed to load plant details:', err);
          this.selectedPlant = plant;
        }
      },
      closeModal() {
        this.selectedPlant = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .plant-list-container {
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
    text-align: center;
  }
  
  .filter-bar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .search-box {
    padding: 0.6rem 1rem;
    width: 250px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .filter-dropdown {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .search-button {
    padding: 0.6rem 1.2rem;
    background-color: #38a169;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #2f855a;
  }
  
  .plant-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
    list-style: none;
    padding: 0;
  }
  
  .plant-card {
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease;
  }
  
  .plant-card:hover {
    transform: scale(1.05);
  }
  
  .plant-card img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .plant-info {
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
  
  .loading-text {
    margin-top: 2rem;
    font-style: italic;
    color: #777;
  }
  
  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease;
    text-align: center;
  }
  
  .modal-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 8px;
  }
  
  .close-button {
    margin-top: 1.5rem;
    background-color: #38a169;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .close-button:hover {
    background-color: #2f855a;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  