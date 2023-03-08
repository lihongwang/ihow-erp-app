interface AddPageProps {
  back: () => void
  formData: any
  detailDrawerRef: any
  store: any
  detailFilterInfo: any
  detailKey: string
  detailPrimaryKey: string
  formatDetail: any
}
export default (props: AddPageProps) => {
  const { back, formData, detailDrawerRef, store, detailFilterInfo, detailKey, detailPrimaryKey, formatDetail } = props
  const handleAddDetail = () => {
    const { keys, message } = detailFilterInfo
    let result = true
    let value = {}
    keys.forEach((key) => {
      result = result && formData.value[key]
      value[key] = formData.value[key]
    })
    if (result) {
      detailDrawerRef.value.open(getSelectedItems(), value)
    } else {
      uni.showToast({
        title: message,
        icon: 'none',
      })
    }
  }
  const getDetails = () => {
    return store.getFormData()[detailKey] || []
  }
  const handleDeleteItem = (tmp) => {
    const details = getDetails()
    formData.value = store.setFormData({
      [detailKey]: details.filter((d) => d[detailPrimaryKey] !== tmp[detailPrimaryKey]),
    })
  }
  const getSelectedItems = () => {
    // 已选择的明细
    return getDetails()
  }
  const handleDetailConfirm = ({ items }) => {
    const details = getDetails()
    formData.value = store.setFormData({
      [detailKey]: [...items.map(formatDetail), ...details],
    })
  }
  const handleSave = async () => {
    if (!formData.value[detailKey]?.length) {
      uni.showToast({
        title: '明细不能为空',
        icon: 'none',
      })
    } else {
      await store.add()
      back()
    }
  }
  return {
    handleAddDetail,
    handleDeleteItem,
    handleDetailConfirm,
    handleSave,
  }
}
