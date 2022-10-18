/**
 * 格式化时间 去掉 T 和 Z
 * @param {*} time
 * @returns
 */
function formatNum(num) {
  return num >= 10 ? num : `0${num}`
}
export const formatTimeStr = (time) => {
  if (time) {
    let date = new Date(time)
    const year = date.getUTCFullYear() - 2000 // 年
    const month = date.getMonth() + 1 // 月
    const day = date.getDate() // 日 获取日是 getDate()方法 区别于 getDay()是星期
    return `${formatNum(day)}/${formatNum(month)}/${year}`
  } else {
    return time
  }
}
/**
 * 判断是不是今天
 *  判断 是不是同一年 同一月 的 同一天
 * @param {*} time
 * @returns
 */
export const isToday = (time) => {
  const today = new Date()
  const date = new Date(time)
  if (date.getFullYear() != today.getFullYear()) {
    return false
  }
  if (date.getMonth() != today.getMonth()) {
    return false
  }
  if (date.getDate() != today.getDate()) {
    return false
  }
  return true
}
/**
 * 判断是不是昨天，
 * 只需要判断 当前时间 是不是在 今天 0 点 和 昨天 0 点之间,减去一天的时间戳即可
 * @param {*} time
 * @returns
 */
export const isYesterday = (time) => {
  const current = new Date()
  const year = current.getFullYear()
  const month = current.getMonth() + 1
  const day = current.getDate()
  const todayStart = new Date(`${year}-${month}-${day}`).getTime()
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000
  return (
    new Date(time).getTime() >= yesterdayStart &&
    new Date(time).getTime() < todayStart
  )
}

/**
 * 判断是不是明天，
 * 只需要判断 当前时间 是不是在 今天 0 点 + 24小时 ~ +48 小时之间
 * @param {*} time
 * @returns
 */
export const isTomorrow = (time) => {
  const current = new Date()
  const year = current.getFullYear()
  const month = current.getMonth() + 1
  const day = current.getDate()
  const todayStart = new Date(`${year}-${month}-${day}`).getTime()
  const tomorrowStart = todayStart + 24 * 60 * 60 * 1000
  const tomorrowEnd = tomorrowStart + 24 * 60 * 60 * 1000
  return (
    new Date(time).getTime() >= tomorrowStart &&
    new Date(time).getTime() < tomorrowEnd
  )
}

/**
 * 判断是不是 同一周
 * 坑： 一周有可能 跨年月日，所以只能获取周数
 * 比较 当前天数是多少周 和 传入时间是多少周
 * @param {*} time
 * @returns
 */
export const isThisWeek = (time) => {
  const date = new Date(time)
  const current = new Date()
  var oneDayTime = 1000 * 60 * 60 * 24
  // 计算 传入的 日期有多少天
  var old_count = parseInt(date.getTime() / oneDayTime)
  // 计算当前日期有多少天
  var now_count = parseInt(current.getTime() / oneDayTime)
  //  1970年 一月一号是 周四 所以 +4
  return parseInt((old_count + 4) / 7) === parseInt((now_count + 4) / 7)
}
/**
 * 判断是不是 上一周
 * 坑： 一周有可能 跨年月日，所以只能获取周数
 * 比较 当前天数是多少周 -1    传入时间是多少周
 * @param {*} time
 * @returns
 */
export const isLastWeek = (time) => {
  const date = new Date(time)
  const current = new Date()
  var oneDayTime = 1000 * 60 * 60 * 24
  // 计算 传入的 日期有多少天
  var old_count = parseInt(date.getTime() / oneDayTime)
  // 计算当前日期有多少天
  var now_count = parseInt(current.getTime() / oneDayTime)
  // 1970年 一月一号是 周四 所以 +4
  return parseInt((old_count + 4) / 7) === parseInt((now_count + 4) / 7) - 1
}
/**
 * 判断是不是 下一周
 * 坑： 一周有可能 跨年月日，所以只能获取周数
 * 比较 当前天数是多少周 + 1    传入时间是多少周
 * @param {*} time
 * @returns
 */
export const isNextWeek = (time) => {
  const date = new Date(time)
  const current = new Date()
  var oneDayTime = 1000 * 60 * 60 * 24
  // 计算 传入的 日期有多少天
  var old_count = parseInt(date.getTime() / oneDayTime)
  // 计算当前日期有多少天
  var now_count = parseInt(current.getTime() / oneDayTime)
  // 1970年 一月一号是 周四 所以 +4
  return parseInt((old_count + 4) / 7) === parseInt((now_count + 4) / 7) + 1
}

/**
 * 判断是不是 同一月
 * 直接比较 年 月
 * @param {*} time
 * @returns
 */
export const isThisMonth = (time) => {
  const current = new Date()
  const date = new Date(time)
  if (current.getFullYear() != date.getFullYear()) {
    return false
  }
  return current.getMonth() == date.getMonth()
}

/**
 * 判断是不是 上一月
 * 坑： 有可能跨 年
 * @param {*} time
 * @returns
 */
export const isLastMonth = (time) => {
  const current = new Date()
  const date = new Date(time)
  // 如果 是 同一年
  if (current.getFullYear() == date.getFullYear()) {
    return current.getMonth() == date.getMonth() + 1
  }
  // 不是同一年, 那就必须是上一年 且当月是 1月，上一个月是 12月
  else if (
    current.getFullYear() - 1 == date.getFullYear() &&
    current.getMonth() == 0 &&
    date.getMonth == 11
  ) {
    return true
  } else {
    return false
  }
}

/**
 * 判断是不是 下一月
 * 坑： 有可能跨 年
 * @param {*} time
 * @returns
 */
export const isNextMonth = (time) => {
  const current = new Date()
  const date = new Date(time)
  // 如果 是 同一年
  if (current.getFullYear() == date.getFullYear()) {
    return current.getMonth() == date.getMonth() + 1
  }
  // 不是同一年, 那就必须是下一年 且当月是 12月，下一个月是 1月
  else if (
    current.getFullYear() + 1 == date.getFullYear() &&
    current.getMonth() == 11 &&
    date.getMonth == 0
  ) {
    return true
  } else {
    return false
  }
}

/**
 * 判断是不是 最近多少天的， 90 180
 * @param {*} time
 * @returns
 */
export const islastdays = (day, time) => {
  const currentTime = new Date().getTime()
  const dateTime = new Date(time).getTime()
  // 多少天的 时间戳
  const lastDayTime = day * (24 * 60 * 60 * 1000)
  if (dateTime <= currentTime && currentTime - dateTime <= lastDayTime) {
    return true
  } else {
    return false
  }
}
/**
 * 判断是不是同一年的
 * @param {*} time
 * @returns
 */
export const isSameYear = (time) => {
  const currentYear = new Date().getFullYear()
  const timeYear = new Date(time).getFullYear()
  return currentYear == timeYear
}
/**
 * 上一年
 * @param {*} time
 * @returns
 */
export const isLastYear = (time) => {
  const currentYear = new Date().getFullYear()
  const timeYear = new Date(time).getFullYear()
  return currentYear == timeYear + 1
}
