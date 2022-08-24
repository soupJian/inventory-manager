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
  const todayTime = new Date(`${year}-${month}-${day}`).getTime()
  const yesterdayTime = todayTime - 24 * 60 * 60 * 1000
  return (
    new Date(time).getTime() >= yesterdayTime &&
    new Date(time).getTime() < todayTime
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
