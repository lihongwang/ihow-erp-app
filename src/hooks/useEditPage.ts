interface ShowPageProps {
  back: () => void
  detailDrawerRef: any
  detailKey: string
  detailPrimaryKey: string
  editable: any
  formData: any
  formatDetail: any
  store: any
}
import { onLoad } from '@dcloudio/uni-app'
export default (props: ShowPageProps) => {
  const { back, detailDrawerRef, detailKey, detailPrimaryKey, formData, formatDetail, store } = props

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
    detailDrawerRef.value.open(getSelectedItems(), {
      warehouseId: formData.value.warehouseId,
      relatedPartyId: formData.value.relatedPartyId,
    })
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
