interface pageProps {
  title: string
  backUrl: string
  backType?: string
}
const getPageTitle = (title: string) => {
  return {
    index: title,
    add: `新增${title}`,
    edit: `修改${title}`,
    show: `${title}详情`,
  }
}
export default (props: pageProps) => {
  const { title, backUrl, backType } = props
  const titleInfo = getPageTitle(title)
  const back = () => {
    uni[backType === 'tab' ? 'switchTab' : 'navigateTo']({
      url: backUrl,
    })
  }
  return {
    titleInfo,
    back,
  }
}
