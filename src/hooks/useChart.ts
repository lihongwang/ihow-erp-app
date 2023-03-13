import { getDataByCode } from '@/apis'

interface ChartProps {
  props: any
  code: string
  format: any
  params?: any
}
import { watch } from 'vue'
export default (props: ChartProps) => {
  const { code, format, params = {} } = props
  watch(
    () => props.props.refresh,
    () => {
      setTimeout(() => {
        getDataByCode(code, params).then(format)
      }, 100)
    }
  )
}
