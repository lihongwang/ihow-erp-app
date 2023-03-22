import { onLoad } from '@dcloudio/uni-app'
import { getDataByCode } from '@/apis'
import dayjs from 'dayjs'
interface ReportProps {
  code: any
  pageInfo: any
  tableData: any
  hasSearched: any
  searchKey: string
  filterModel: any
  searchModel: any
  searchDialog: any
}
export default (props: ReportProps) => {
  const { searchDialog, code, filterModel, hasSearched, searchKey, searchModel, pageInfo, tableData } = props
  const fabPattern = {
    color: '#7A7E83',
    backgroundColor: '#fff',
    selectedColor: '#007AFF',
    buttonColor: '#007AFF',
    iconColor: '#fff',
  }
  const fabContent = [
    // {
    //   iconPath: '/static/images/add-circle.png',
    //   selectedIconPath: '/static/images/add-circle-blue.png',
    //   text: '下载',
    //   active: false,
    // },
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
      // uni.navigateTo({
      //   url: addUrl,
      // })
    } else {
      searchDialog.value.open()
    }
  }
  onLoad(() => {
    fetchData()
  })

  const fetchData = (data = {}) => {
    return getDataByCode(code, {
      ...filterModel.value,
      ...searchModel.value,
      pageSize: pageInfo.value.pageSize,
      page: pageInfo.value.page,
      ...data,
    }).then((res: any) => {
      tableData.value = res.list
      pageInfo.value = {
        page: res.page + 1,
        total: res.total,
        pageSize: res.pageSize,
      }
    })
  }
  const fetchFilterData = (data = {}) => {
    filterModel.value = data
    return fetchData({ page: 0 })
  }
  const handleChange = ({ current }) => {
    fetchData({
      page: current - 1,
    })
  }
  const back = () => {
    uni.switchTab({
      url: '/pages/report/index',
    })
  }
  const formatData = (info: any, data: any) => {
    if (info.name.match(/Enum$/)) return data[info.name]?.name
    if (info.type === 'object') return data[info.name]?.name
    if (info.type === 'date') return data[info.name] ? dayjs(new Date(data[info.name])).format('YYYY-MM-DD') : ''
    return data[info.name]
  }
  const handleSearch = (res) => {
    fetchData({
      [searchKey]: res.value,
      page: 0,
    })
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
  return {
    emptySearch,
    getSearchModelKeys,
    handleSearch,
    handleSearchClose,
    handleSearchConfirm,
    fetchFilterData,
    fetchData,
    fabPattern,
    fabContent,
    fabClick,
    trigger,
    handleChange,
    back,
    formatData,
  }
}
