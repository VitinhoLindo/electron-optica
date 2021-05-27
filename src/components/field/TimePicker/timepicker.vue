<template>
  <div id="time-picker-body" v-if="on" class="time-picker" @click="(event) => cancel(event)">
    <div class="picker">
      
      <div class="header">
        <div class="title">
          <span>{{ label }}</span>
        </div>
        <div class="text">{{ timeView }}</div>
      </div>

      <div class="content">

        <div class="input">
          <div class="label"><span>{{ field.labels.hour }}</span></div>
          <div class="arrow" @click="(event) => scrollTo(event, 'up', 'hour')">
            <div class="arrow-up b5"></div>
          </div>
          <div class="scroll">
            <div
              v-for="(hour, index) in field.values.hours.value"
              :class="getClass('hour', hour)"
              :key="index"
              @click="setAttr('hour', hour)"
            >{{ hour }}
            </div>
          </div>
          <div class="arrow" @click="(event) => scrollTo(event, 'down', 'hour')">
            <div class="arrow-down b5"></div>
          </div>
        </div>

        <div class="input">
          <div class="label"><span>{{ field.labels.minute }}</span></div>
          <div class="arrow" @click="(event) => scrollTo(event, 'up', 'minute')">
            <div class="arrow-up b5"></div>
          </div>
          <div class="scroll">
            <div
              v-for="(minute, index) in field.values.minutes.value"
              :class="getClass('minute', minute)"
              :key="index"
              @click="setAttr('minute', minute)"
            >{{ minute }}
            </div>
          </div>
          <div class="arrow" @click="(event) => scrollTo(event, 'down', 'minute')">
            <div class="arrow-down b5"></div>
          </div>
        </div>

        <div class="input">
          <div class="label"><span>{{ field.labels.second }}</span></div>
          <div class="arrow" @click="(event) => scrollTo(event, 'up', 'second')">
            <div class="arrow-up b5"></div>
          </div>
          <div class="scroll">
            <div
              v-for="(second, index) in field.values.seconds.value"
              :class="getClass('second', second)"
              :key="index"
              @click="setAttr('second', second)"
            >{{ second }}
            </div>
          </div>
          <div class="arrow" @click="(event) => scrollTo(event, 'down', 'second')">
            <div class="arrow-down b5"></div>
          </div>
        </div>
      </div>

      <div class="footer">
          <button id="time-picker-cancel" @click="(event) => cancel(event)">{{ labels.button.cancel }}</button>
          <button 
            @click="(event) => submit(event)"
          >{{ labels.button.confirm }}
          </button>
      </div>
    </div>
  </div>
</template>

<script lang="js" src="./timepicker.js"></script>
<style lang="css" src="./timepicker.css" scoped></style>
