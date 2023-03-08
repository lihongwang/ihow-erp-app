export default (store, relatedParty) => {
  return store.setFormData({
    relatedPartyId: relatedParty.id,
    relatedPartyName: relatedParty.name,
    settlementDays: relatedParty.settlementDays,
  })
}
