import { objectToArray } from '@/utils/data'
export const itemInfo = {
  relatedPartyTypeEnum: {
    title: '类型',
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  categoryName: {
    title: '分类名称',
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  code: {
    title: '单位编号',
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  name: {
    title: '单位名称',
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  aliasCode: {
    title: '内部编号',
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  address: {
    title: '详细地址',
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
}
export const itemInfoArray = objectToArray(itemInfo, 'name')
export const itemInfoArrayForList = objectToArray(itemInfo, 'name').filter((a) => !a._forDetail)
