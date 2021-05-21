<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="text-picker">
        <div>
          <input 
            v-this="(el) => setElement(el, 'input')"
            :type="type"
            v-model="input.value"
          >
        </div>
        <div v-if="password">
          <img
            v-if="input.visible"
            @click="passwordVisibleChange"
            :src="$app.db.base64.value.visible.src"
            :alt="$app.db.base64.value.visible.name"
          >
          <img
            v-else
            @click="passwordVisibleChange"
            :src="$app.db.base64.value.invisible.src"
          >
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div class="input-value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./text.js"></script>
<style lang="css" src="./text.css" scoped></style>
