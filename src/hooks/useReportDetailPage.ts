import { onLoad } from '@dcloudio/uni-app'
import { getDataByCode } from '@/apis'
interface ReportProps {
  code: any
  pageInfo: any
  tableData: any
  searchModel: any
  searchDialog: any
}
export default (props: ReportProps) => {
  const { searchDialog, code, searchModel, pageInfo, tableData } = props
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
      text: '下载',
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

  const fetchData = () => {
    getDataByCode(code, {
      ...searchModel.value,
      pageSize: pageInfo.value.pageSize,
      page: pageInfo.value.page,
    }).then((res: any) => {
      tableData.value = res.list
      pageInfo.value = {
        page: res.page,
        total: res.total,
        pageSize: res.pageSize,
      }
    })
  }
  const handleChange = () => {
    fetchData()
  }
  const back = () => {
    uni.switchTab({
      url: '/pages/report/index',
    })
  }
  const formatData = (info: any, data: any) => {
    return data[info.name]
  }
  return {
    fabPattern,
    fabContent,
    fabClick,
    trigger,
    handleChange,
    back,
    formatData,
  }
}