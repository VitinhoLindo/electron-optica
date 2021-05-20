<template>
  <div>
    <component 
      v-for="(field, index) in fields"
      :key="index"
      :label="field.label"
      :value="field.value"
      :mode="viewMode"
      :getter="(getter) => set(getter, index)"
      :is="field.name"
    />
  </div>
</template>

<script lang="js" src="./app.js"></script>
<style lang="css" src="./app.css"></style>
