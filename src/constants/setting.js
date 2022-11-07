export const compluteTabList = (accessList, user, list) => {
  const newList = [...list]
  // assigning
  if (
    accessList.includes('settingAssiging') ||
    user.userRole == 'Super Admin' ||
    user.user.Role == 'Admin'
  ) {
    newList.push({
      label: 'Assigning',
      key: 'assigning'
    })
  }
  // pipeline
  if (
    accessList.includes('settingPipeline') ||
    user.userRole == 'Super Admin' ||
    user.user.Role == 'Admin'
  ) {
    newList.push({
      label: 'Pipeline',
      key: 'pipeline'
    })
  }
  // assets
  if (
    accessList.includes('settingAssets') ||
    user.userRole == 'Super Admin' ||
    user.user.Role == 'Admin'
  ) {
    newList.push({
      label: 'Assets',
      key: 'assets'
    })
  }
  // users
  if (
    accessList.includes('settingUsers') ||
    user.userRole == 'Super Admin' ||
    user.user.Role == 'Admin'
  ) {
    newList.push({
      label: 'Users',
      key: 'users'
    })
  }
  // reply
  if (
    accessList.includes('settingReply') ||
    user.userRole == 'Super Admin' ||
    user.user.Role == 'Admin'
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
