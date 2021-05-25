<template>
  <div class="field-form">
    <component v-if="controller.picker" :is="'date-picker-field'" :label="label" @listen="pickerListen" />

    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="date-picker">
        <div>
          {{ 
            getFormat('pt-br', { separator: '/' }) 
          }}
        </div>
        <div>
          <img 
            :src="$app.db.base64.value.calendar.src" 
            :alt="$app.db.base64.value.calendar.name"
            @click="calendarClick"
          >
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div class="input-value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./date.js"></script>
<style lang="css" src="./date.css" scoped></style>
