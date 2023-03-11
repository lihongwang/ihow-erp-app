export default (store, relatedParty) => {
  return store.setFormData({
    customerId: relatedParty.id,
    customerCode: relatedParty.code,
    customerName: relatedParty.name,
    settlementDays: relatedParty.settlementDays,
    [store.detailKey]: [],
  })
}
