<template>
  <div class="field-division" v-if="mode == 'form'">
    <!-- <div class="label-text-field">{{ label }}</div>
    <div class="input-text-field">
      <div>
        <input v-model="_value_" :type="_type_">
      </div>
      <div>

      </div>
    </div> -->
  </div>

  <div class="field-division" v-else>
    <!-- <input type="text"> -->
  </div>
</template>

<script lang="js" src="./numeric.js"></script>
<style lang="css" src="./numeric.css"></style>
