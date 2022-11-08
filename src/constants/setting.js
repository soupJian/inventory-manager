export const compluteTabList = (user, list) => {
  const accessList = user.user.access.accesses
  const accessName = user.user.access.accessName
  const newList = [...list]
  // assigning
  if (
    accessList.includes('settingAssiging') ||
    accessName == 'Super Admin' ||
    accessName == 'Admin'
  ) {
    newList.push({
      label: 'Assigning',
      key: 'assigning'
    })
  }
  // pipeline
  if (
    accessList.includes('settingPipeline') ||
    accessName == 'Super Admin' ||
    accessName == 'Admin'
  ) {
    newList.push({
      label: 'Pipeline',
      key: 'pipeline'
    })
  }
  // assets
  if (
    accessList.includes('settingAssets') ||
    accessName == 'Super Admin' ||
    accessName == 'Admin'
  ) {
    newList.push({
      label: 'Assets',
      key: 'assets'
    })
  }
  // users
  if (accessName == 'Super Admin') {
    newList.push({
      label: 'Users',
      key: 'users'
    })
  }
  // reply
  if (
    accessList.includes('settingReply') ||
    accessName == 'Super Admin' ||
    accessName == 'Admin'
  ) {
    newList.push({
      label: 'Reply',
      key: 'reply'
    })
  }
  return newList
}
export const pipelineColors = [
  '#FF7B7B',
  '#FABF66',
  '#2C88DD',
  '#77D755',
  '#8781FF',
  '#3BC7F3',
  '#E4D54B',
  '#6EB17D',
  '#B7B7B7',
  '#2EBEBD'
]
export const headerSelectOption = [
  'Sales pipeline',
  'Support pipeline',
  'Reverse logistics'
]
export const pipelineReturn = ['Return', 'Replace', 'Return & Replace']
