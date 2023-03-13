interface IndexPageProps {
  searchModel: any
  searchDialog: any
  store: any
  listRef: any
  hasSearched: any
  searchValue: any
  searchKey: string
  filterModel: any
  addUrl: string
  editUrl: string
  showUrl: string
}
import { onLoad } from '@dcloudio/uni-app'
export default (props: IndexPageProps) => {
  const {
    searchDialog,
    searchModel,
    store,
    listRef,
    filterModel,
    hasSearched,
    searchKey = 'code',
    searchValue,
    addUrl,
    editUrl,
    showUrl,
  } = props
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
    const opts = {
      ...filterModel.value,
      ...searchModel.value,
      ...data,
    }
    if (searchValue.value) opts[searchKey] = searchValue.value
    return new Promise((resolve) => {
      store[isMore ? 'loadMore' : 'init'](opts).then((res) => {
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
  const fetchFilterData = (data = {}) => {
    filterModel.value = data
    return fetchData({ page: 0 })
  }
  const checkEditable = (data) => {
    return data?.auditStatusEnum?.value == 1
  }
  const handleSearch = (res) => {
    searchValue.value = res.value
    fetchData({
      page: 0,
    })
  }
  const clearSearch = () => {
    searchValue.value = ''
    fetchData({ page: 0 })
  }
  const handleSearchClose = () => {
    searchDialog.value.close()
  }
  const handleSearchConfirm = () => {
    fetchData({ page: 0 }).then(() => {
      searchDialog.value.close()
      hasSearched.value = true
    })
  }
  const getSearchModelKeys = () => {
    const keys: any = []
    Object.keys(searchModel.value).forEach((key) => {
      if (searchModel.value[key]) keys.push(key)
    })
    return keys
  }
  const emptySearch = () => {
    Object.keys(searchModel.value).forEach((key) => {
      searchModel.value[key] = ''
    })
    hasSearched.value = false
    fetchData({
      page: 0,
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
    clearSearch,
    emptySearch,
    getSearchModelKeys,
    handleSearchClose,
    handleSearchConfirm,
    fetchFilterData,
    handleDetailClick,
  }
}
