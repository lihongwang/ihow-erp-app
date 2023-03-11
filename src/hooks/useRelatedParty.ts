export default (store, relatedParty) => {
  return store.setFormData({
    relatedPartyId: relatedParty.id,
    relatedPartyCode: relatedParty.code,
    relatedPartyName: relatedParty.name,
    settlementDays: relatedParty.settlementDays,
    [store.detailKey]: [],
  })
}
