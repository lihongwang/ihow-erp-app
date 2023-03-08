interface IndexPageProps {
  searchModel: any
  searchDialog: any
  store: any
  listRef: any
  searchKey: string
  addUrl: string
  editUrl: string
  showUrl: string
}
import { onLoad } from '@dcloudio/uni-app'
export default (props: IndexPageProps) => {
  const { searchDialog, searchModel, store, listRef, searchKey = 'code', addUrl, editUrl, showUrl } = props
  onLoad(() => {
    fetchData()
  })
  const fabPattern = {
    color: '#7A7E83',
    backgroundColor: '#fff',
    selectedColor: '#007AFF',
    buttonColor: '#007AFF',
    iconColor: '#fff',
  }
  const fabContent = [
    {
      iconPath: '/static/images/add-circle.png',
      selectedIconPath: '/static/images/add-circle-blue.png',
      text: '新增',
      active: false,
    },
    {
      iconPath: '/static/images/search.png',
      selectedIconPath: '/static/images/search-blue.png',
      text: '搜索',
      active: false,
    },
  ]
  const fabClick = () => {
    // uni.showToast({
    //   title: '点击了悬浮按钮',
    //   icon: 'none',
    // })
  }
  const trigger = (e) => {
    if (e.index == 0) {
      uni.navigateTo({
        url: addUrl,
      })
    } else {
      searchDialog.value.open()
    }
  }
  const fetchData = (data = {}, isMore?: boolean) => {
    return new Promise((resolve) => {
      store[isMore ? 'loadMore' : 'init']({
        ...data,
      }).then((res) => {
        const { setPageInfo } = listRef?.value || {}
        setPageInfo?.({
          shown: true,
          page: res.page,
          pageSize: res.pageSize,
          total: res.total,
        })
        resolve(true)
      })
    })
  }

  const checkEditable = (data) => {
    return data?.auditStatusEnum?.value == 1
  }
  const handleSearch = (res) => {
    fetchData({
      [searchKey]: res.value,
    })
  }
  const handleSearchClose = () => {
    searchDialog.value.close()
  }
  const handleSearchConfirm = () => {
    fetchData(searchModel.value).then(() => {
      searchDialog.value.close()
    })
  }
  const handleDetailClick = (id) => {
    uni.navigateTo({
      url: showUrl + id,
    })
  }
  const handleEditClick = (id) => {
    uni.navigateTo({
      url: editUrl + id,
    })
  }
  return {
    checkEditable,
    fabPattern,
    fabContent,
    trigger,
    fabClick,
    fetchData,
    handleEditClick,
    handleSearch,
    handleSearchClose,
    handleSearchConfirm,
    handleDetailClick,
  }
}
