interface ShowPageProps {
  back: () => void
  detailDrawerRef: any
  detailKey: string
  detailFilterInfo: any
  editable: any
  formData: any
  formatDetail: any
  store: any
}
import { onLoad } from '@dcloudio/uni-app'
export default (props: ShowPageProps) => {
  const { back, detailDrawerRef, detailKey, detailFilterInfo, formData, formatDetail, store } = props

  onLoad((option: any) => {
    fetchData(option.id)
  })

  const fetchData = (id) => {
    store.show(id).then((data) => {
      formData.value = data
    })
  }
  const getSelectedItems = () => {
    return getDetails()
  }
  const handleAddDetail = () => {
    const { keys } = detailFilterInfo
    let value = {}
    keys.forEach((key) => {
      value[key] = formData.value[key]
    })
    detailDrawerRef.value.open(getSelectedItems(), value)
  }
  const getDetails = () => {
    return store.getFormData()[detailKey] || []
  }
  const handleDeleteItem = (tmp) => {
    const details = getDetails()
    formData.value = store.setFormData({
      [detailKey]: details.filter((d) => d.id !== tmp.id),
    })
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
      await store.update()
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
