<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="date-picker">
        <div>
          <input 
            v-this="(el) => setElement(el, 'input')"
            :type="type"
            v-model="input.value"
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
