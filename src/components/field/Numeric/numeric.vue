<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="number-picker">
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

<script lang="js" src="./numeric.js"></script>
<style lang="css" src="./numeric.css" scoped></style>
