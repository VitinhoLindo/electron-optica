<template>
  <div class="modal" v-if="on" v-show="show">
    <component :is="component.name" :data="component.data"></component>
  </div>
</template>

<script lang="js" src="./modal.js"></script>
<style lang="css" src="./modal.css" scoped></style>
