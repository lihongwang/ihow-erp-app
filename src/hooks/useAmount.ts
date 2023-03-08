import { fixNumber } from '@/utils/data'
export default (store) => {
  store.$subscribe((mutation) => {
    const target = mutation.events.target
    if (mutation.events.key === 'qty') {
      target.amount = fixNumber(target.qty * target.price, 2)
    }
    if (mutation.events.key === 'price') {
      target.amount = fixNumber(target.qty * target.price, 2)
    }
  })
}
