<template>
  <div class="field-form">
    <component 
      v-if="controller.picker" 
      :is="controller.component" 
      :label="label" 
      :value="get()"
      @listen="pickerListen" 
    />

    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="time-picker">
        <div>{{ timeView }}</div>
        <div>
          <img 
            @click="calendarClick"
            :src="$app.db.base64.value.clock.src"
            :alt="$app.db.base64.value.clock.name"
          >
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div class="input-value">{{ value || '' }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./time.js"></script>
<style lang="css" src="./time.css"></style>
