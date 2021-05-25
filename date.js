// let months = [
// ]

// let days = [

// ]

// let date = new Date('2021-01-01');

// for(let x = 0; x < 12; x++) {
//   let [day, dN, M, y, mm, gmt] = date.toUTCString().replace(/\,/g, '').split(' ')

//   months.push(M)
//   days.push(day)

//   date.setMonth(date.getMonth() + 1)
// }

// days = days.filter((value, index, array) => {
//   return array.indexOf(value) == index
// })
// console.log(months, days);
// console.log(date.toUTCString());

// console.time('start')
// let allyears = []
// let years = [],
//     count = 0

// for(let x = 0; x <= 4000; x++) {
//   allyears.push(x)
// }

// while(count < allyears.length) {
//   if (count + 24 < allyears.length) {
//     if (count < 1000)
//       console.log(allyears.slice(count, count + 24))
//   } else {
//     // console.log(allyears.slice(count))
//   }

//   count += 24
// }

// console.log(allyears)
// console.log(allyears.join(' , '))
// console.timeEnd('start')
// years.
// let array = [1, 2, 3]

// console.log(array.lastItem)

class Calendar {
  constructor() {
    let date = new Date()

    this.currentDate  = date

    this.currentYear  = date.getFullYear()
    this.currentMonth = date.getMonth()
    this.currentDay   = date.getDate()
  }

  generateYearsArray(start, end) {
    let years = []
    for(let x = start; x <= end; x++) years.push(x)
    return years
  }

  separateYearInSubArray(array = [], length) {
    let count = 0,
        subArray = []
    
    while(count < array.length) {
      if ((count + length) < array.length)
        subArray.push(array.slice(count, count + length))
      else
        subArray.push(array.slice(count))

      count += length
    }

    return subArray
  }

  verifyLengthAndAppend(array = [], length, callFunction, start = false, end = false) {
    for(let internal of array) {
      if (internal.length >= length) continue
      else {
        start = (start) ? start : internal[internal.length - 1]
        end   = (end)   ? end   : internal[internal.length - 1] + length - internal.length

        console.log(start, end)
      }
      // console.log(array.length, array)
    }
  }

  init() {
    let years = this.generateYearsArray(0, this.currentYear)
    let subYears = this.separateYearInSubArray(years, 24)
    this.verifyLengthAndAppend(subYears, 24)
    // console.log(subYears)
  }

  static init() {
    return (new this()).init()
  }
}

Calendar.init()
// (new Calendar())