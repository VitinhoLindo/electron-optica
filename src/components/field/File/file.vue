<template>
  <div class="field-form" v-if="mode == 'form'">
    <div class="label-field">{{ label }}</div>
    <div class="input-field">
      <div
        id="files-input"
        v-this="teste"
        v-drag:content="onDrag"
        class="files"
        div-placeholder="Choose a file or drag it here"
      >
        <!-- @drag=""
        @dragenter="dragEnterFile"
        @drop="dropEnterFile"
        @click="inputClick" -->
        <div 
          class="file"
          v-for="(file, index) in _value_"
          :key="index"
        >
          <div>
            <img :src="file.data.src" :alt="file.name">
          </div>
          <div>
            <div>{{ file.name }}</div>
            <div>{{ file.size.src.b }}</div>
          </div>
          <div>
            <img :src="$app.data.base64.close.data" :alt="$app.data.base64.close.name" @click="(event) => remove(event, index)">
          </div>
        </div>
      </div>
      <input
        v-show="false"
        :id="input.id"
        @change="(event) => change(event)"
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
