<template>
  <div class="menu">
    <div class="menu-content" :style="{
      'width': getWidth
    }">

      <div class="menu-header">
        <span class="header-name">
          {{ 'menu' }}
        </span>
        <div class="header-search">
          <input  type="text" v-model="search">
        </div>
      </div>

      <div class="list-buttons">
      </div>

    </div>

    <div 
      class="offset" 
      draggable="true" 
      @drag="onDrag" 
      @dragend="dragEnd"
    >
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  data() {
    return {
      width: 150,
      resize: false,
      search: ''
    }
  },
  watch: {
    search: function (newValue, lastValue): void {
      this.searchButton();
    }
  },
  methods: {
    async searchButton(): Promise<void> {
      const lastLen = this.search.length;
      await this.$app.sleep(1);
      const currentLen = this.search.length;

      if (lastLen != currentLen) return;
      console.log(lastLen, currentLen)
    },
    onDrag(event: DragEvent): void {
      if (event.clientX > 100) {
        this.width = event.clientX;
      } else if (event.clientX >= 30 && event.clientX <= 100) {
        return;
      } else if (event.clientX < 30) {
        this.width = 0;
      }
    },
    dragEnd(event: DragEvent): void {
      if (event.clientX < 50) {
        this.width = 0;
        return;
      }
      this.width = event.clientX;
    },
  },
  computed: {
    getWidth(): string {
      return `${this.width}px`
    }
  }
})

export default class Menu extends Vue {}
</script>

<style>
.menu {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #636e72;
}

.menu-content {
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: calc(150px - 2px);
  min-width: 0px;
}

.menu-header {
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d3436;  
  margin-top: 1px;
  margin-left: 1px;
  margin-right: 1px;
  margin-bottom: 1px;  
}

.header-name {
  width: calc(100% - 4px);
  margin-top: 1px;
  margin-left: 1px;
  margin-right: 1px;
  margin-bottom: 1px;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
}

.header-search {
  margin-top: 1px;
  margin-left: 1px;
  margin-right: 1px;
  margin-bottom: 1px;
  width: calc(100% - 2px);
}

.header-search input {
  width: calc(100% - 5px);
  font-size: 16px;
  border: none;
}

.header-search input:focus {
  outline: 0;
}

.list-buttons {
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.offset {
  opacity: 0;
  width: 1px;
  cursor: ew-resize;
  height: 100%;
}
</style>