import { fixNumber } from '@/utils/data'
export default (store) => {
  store.$subscribe((mutation) => {
    const target = mutation.events.target
    if (mutation.events.key === 'qty') {
      target.amount = fixNumber(target.qty * target.price, 2)
      target.masterQty = fixNumber(Number(target.qty || 0) * Number(target.transforRate || 1), 3)
    }
    if (mutation.events.key === 'price') {
      target.amount = fixNumber(target.qty * target.price, 2)
    }
  })
}
