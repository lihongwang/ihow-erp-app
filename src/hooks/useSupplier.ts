export default (store, relatedParty) => {
  return relatedParty
    ? store.setFormData({
        supplierId: relatedParty.id,
        supplierCode: relatedParty.code,
        supplierName: relatedParty.name,
        settlementDays: relatedParty.settlementDays,
        [store.detailKey]: [],
      })
    : store.getFormData()
}
