<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>
    <div class="input-field">
      <div class="input">
        <div class="files">
          <div 
            class="file" 
            v-for="(file, index) in input.value"
            :key="index"
          >
            <div class="name">{{ file.name }}</div>
            <div class="percent">{{ file.percent ? file.percent.text : '' }}</div>
            <img 
              v-if="mode == 'form'"
              class="close" 
              :src="$app.db.base64.value.close.src" 
              :alt="$app.db.base64.value.close.name" 
              @click="(event) => removeFile(event, index)"
            >
          </div>
        </div>
        
        <input
          type="file"
          v-this="(el) => setElement(el, 'input')"
          v-show="false"
          @change="inputFileChange"
          :multiple="input.rules.multiple"
          :accept="input.rules.accept"
          :disabled="input.progress"
        >

        <img 
          :class="uploadClass"
          v-if="mode == 'form'"
          @click="inputFilesClick"
          :src="$app.db.base64.value.upload.src"
        >
      </div>
    </div>
  </div>
</template>

<script lang="js" src="./file.js"></script>
<style lang="css" src="./file.css" scoped></style>
