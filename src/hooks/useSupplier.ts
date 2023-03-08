export default (store, relatedParty) => {
  return store.setFormData({
    supplierId: relatedParty.id,
    supplierCode: relatedParty.code,
    supplierName: relatedParty.name,
    settlementDays: relatedParty.settlementDays,
  })
}
