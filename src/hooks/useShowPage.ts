interface ShowPageProps {
  back: () => void
  editUrl: string
  formData: any
  store: any
  confirmDialog: any
}
import { onLoad } from '@dcloudio/uni-app'
export default (props: ShowPageProps) => {
  const { back, editUrl, formData, confirmDialog, store } = props
  const getFabContent = () => {
    return formData.value?.auditStatusEnum?.value == 1
      ? [
          {
            iconPath: '/static/images/edit.png',
            selectedIconPath: '/static/images/edit-blue.png',
            text: '编辑',
            active: false,
          },
          {
            iconPath: '/static/images/audit.png',
            selectedIconPath: '/static/images/audit-blue.png',
            text: '审核',
            active: false,
          },
          {
            iconPath: '/static/images/delete-red.png',
            selectedIconPath: '/static/images/delete-red.png',
            text: '删除',
            active: false,
          },
        ]
      : [
          {
            iconPath: '/static/images/unaudit.png',
            selectedIconPath: '/static/images/unaudit-blue.png',
            text: '反审核',
            active: false,
          },
        ]
  }
  const trigger = (e) => {
    if (formData.value?.auditStatusEnum?.value == 1) {
      if (e.index == 0) {
        uni.navigateTo({
          url: editUrl + formData.value.id,
        })
      } else if (e.index == 1) {
        handleAudit(formData.value.id)
      } else if (e.index == 2) {
        handleDeleteCheck()
      }
    } else {
      if (e.index == 0) {
        handleUnAudit(formData.value.id)
      }
    }
  }
  const handleDelete = async () => {
    await store.del()
    back()
  }
  const handleDeleteCheck = () => {
    confirmDialog.value.open()
  }
  const dialogConfirm = async () => {
    await handleDelete()
    confirmDialog.value.close()
  }
  const dialogClose = () => {
    confirmDialog.value.close()
  }
  const fabClick = () => {
    // uni.showToast({
    //   title: '点击了悬浮按钮',
    //   icon: 'none',
    // })
  }

  onLoad((option: any) => {
    fetchData(option.id)
  })

  const fetchData = (id) => {
    store.show(id).then((data) => {
      formData.value = data
    })
  }

  const handleAudit = async (id) => {
    await store.audit({ id })
    fetchData(id)
  }
  const handleUnAudit = async (id) => {
    await store.unAudit({ id })
    fetchData(id)
  }

  return {
    fabClick,
    getFabContent,
    trigger,
    dialogConfirm,
    dialogClose,
  }
}
