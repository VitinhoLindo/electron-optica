<template>
  <div class="field-form" v-if="mode == 'form'">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>
    <div class="input-field">
      <div
        class="files"
        v-this="(el) => setElement(el, 'files')"
        v-drag:content="onDrag"
        div-placeholder="Choose a file or drag it here"
      >
        <div 
          class="file"
          v-for="(file, index) in _value_"
          :key="index"
        >
          <div>
            <img class="file-upload" :src="file.data.src" :alt="file.name">
          </div>
          <div>
            <div class="info">
              <div class="name">{{ file.name }}</div>
              <div class="size">{{ file.size.src.b }}</div>
            </div>
          </div>
          <div>
            <img class="close" :src="$app.data.base64.close.data" :alt="$app.data.base64.close.name" @click="(event) => remove(event, index)">
          </div>
        </div>
      </div>
      <input
        v-this="(el) => setElement(el, 'input')"
        v-show="false"
        @change="(event) => setFilesAsync(event)"
        type="file"
        :multiple="_shared_.multiple"
        :accept="_shared_.accept"
      >
    </div>
  </div>

  <div class="field-view" v-else>
    <!-- <input type="text"> -->
  </div>
</template>

<script lang="js" src="./file.js"></script>
<style lang="css" src="./file.css"></style>
