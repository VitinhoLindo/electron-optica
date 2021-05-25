<template>
  <div id="date-picker-body" class="date-picker" @click="(event) => cancel(event)">
    <div class="picker">
      <div class="header">
        <div class="title">
          <span>
            {{ label }}
          </span>
        </div>
        <div class="text">{{ getGMTFormatString }}</div>
      </div>
      <div class="controller">
        <div class="controls">
          <div class="inputController" @click="changeType">
            <div>{{ controllerInputType }}</div>
            <div class="arrow-down b5"></div>
          </div>
          <div class="inputPreviousNext">
            <button 
              class="previous" 
              @click="(event) => changeIndex(event, 'previous')"
            ></button>
            <button 
              class="next" 
              @click="(event) => changeIndex(event, 'next')"
            ></button>
          </div>
        </div>

        <div class="view" v-if="controllerType == 'year'">
          <button 
            v-for="(value, index) in currentYearArray" 
            :key="index"
            :class="yearClass(value)"
            @click="event => setYear(event, value)"
          >{{ value }}</button>
        </div>
        <div class="view-month" v-else-if="controllerType == 'month'">
          <div class="view">
            <button 
              v-for="(month, index) in currentMonthArray" 
              :key="index"
              :class="monthClass(month.value)"
              @click="event => setMonth(event, month)"
            >{{ month.view }}</button>
          </div>
        </div>
        <div class="view-day" v-else-if="controllerType == 'day'">
          <div 
            class="day" 
            v-for="(dayGMT, indexY) in getDaysGMT" 
            :key="indexY"
          >
            <div class="title">
              {{ dayGMT[0] }}
            </div>
            <div
              v-for="(day, index) in currentDayArray[dayGMT].values"
              :class="dayClass(day)"
              @click="event => setDay(event, day)"
              :key="`${indexY}.${index}`">{{ day }}</div>
          </div>
        </div>

        <div class="footer">
          <button id="date-picker-cancel" @click="(event) => cancel(event)">{{ labels.button.cancel }}</button>
          <button @click="(event) => submit(event)">{{ labels.button.confirm }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" src="./datepicker.js"></script>
<style lang="css" src="./datepicker.css" scoped></style>
