export const ISOStringToReadableDate = (isoDate) => {
  let trimmedDate = isoDate.split('T')[0].split('-')
  return `${trimmedDate[1]}/${trimmedDate[2]}/${trimmedDate[0].slice(2)}`
}

export const objectsToQueryString = (params) => {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')
}

/**
 * 获取指定路由参数
 * @param {*} paramName
 * @param {*} url
 * @returns
 */
export const getParameter = (paramName, url) => {
  let searchUrl = window.location.search.replace('?', '')
  if (url != null) {
    let index = url.indexOf('?')
    url = url.substr(index + 1)
    searchUrl = url
  }
  let ss = searchUrl.split('&')
  let paramNameStr = ''
  let paramNameIndex = -1
  for (let i = 0; i < ss.length; i++) {
    paramNameIndex = ss[i].indexOf('=')
    paramNameStr = ss[i].substring(0, paramNameIndex)
    if (paramNameStr === paramName) {
      let returnValue = ss[i].substring(paramNameIndex + 1, ss[i].length)
      if (typeof returnValue == 'undefined') {
        returnValue = ''
      }
      return returnValue
    }
  }
  return ''
}
