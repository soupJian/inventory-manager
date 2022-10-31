export const ISOStringToReadableDate = (isoDate) => {
  let trimmedDate = isoDate.split('T')[0].split('-')
  return `${trimmedDate[1]}/${trimmedDate[2]}/${trimmedDate[0].slice(2)}`
}

export const objectsToQueryString = (params) => {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')
}
