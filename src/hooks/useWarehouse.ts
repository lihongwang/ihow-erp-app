import { onLoad } from '@dcloudio/uni-app'
import { getWarehouseData } from '@/apis'
export default (cbk) => {
  onLoad(() => {
    getWarehouseData({}).then((res: any) => {
      cbk(
        (res || []).map((w) => ({
          value: w.id,
          text: w.name,
        }))
      )
    })
  })
}
