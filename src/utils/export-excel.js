import { utils, write } from 'xlsx'

export const exportExcel = (name, data) => {
  const ws = utils.json_to_sheet(data)
  /* 新建空workbook */
  const wb = utils.book_new()
  /* 添加worksheet，当然你可以添加多个，这里我只添加一个 */
  utils.book_append_sheet(wb, ws, 'result')
  const wbout = write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  let url = window.URL.createObjectURL(new Blob([wbout]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name + '.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) //下载完成移除元素
  window.URL.revokeObjectURL(url) //释放掉blob对象
}
