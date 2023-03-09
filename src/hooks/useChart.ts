import { getDataByCode } from '@/apis'

interface ChartProps {
  code: string
  format: any
  params?: any
}
export default (props: ChartProps) => {
  const { code, format, params = {} } = props
  getDataByCode(code, params).then(format)
}
