<template>
  <div class="station-actions">
    <button class="btn btn-primary" type="button" @click="manageStation">
      Manage
    </button>

    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-haspopup="true"
        @click="menuOpen = !menuOpen"
      >
        ⋮
        <span class="sr-only">Station actions</span>
      </button>

      <ul v-if="menuOpen" class="dropdown-menu" role="menu">
        <li role="none">
          <button
            class="dropdown-item text-danger"
            type="button"
            role="menuitem"
            @click="confirmDelete"
          >
            Delete Station
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StationQuickDelete',
  props: {
    stationId: {
      type: [String, Number],
      required: true
    },
    stationName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    manageStation() {
      this.$router.push({
        name: 'stations:manage',
        params: { id: this.stationId }
      });
    },
    async confirmDelete() {
      this.menuOpen = false;

      if (!window.confirm(
        `Are you sure you want to permanently delete ${this.stationName}? This cannot be undone.`
      )) {
        return;
      }

      try {
        await this.$axios.delete(`/api/admin/stations/${this.stationId}`);
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete station:', error);
        window.alert('The station could not be deleted. Check permissions and try again.');
      }
    }
  }
};
</script>

<style scoped>
.station-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  z-index: 1000;
  min-width: 160px;
  margin: 4px 0 0;
  padding: 5px;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 12%);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background: #f2f2f2;
}

.text-danger {
  color: #c62828;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
