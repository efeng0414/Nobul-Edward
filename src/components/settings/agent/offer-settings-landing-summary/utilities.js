export const getOfferStatusCount = ({
  buyOffers,
  sellOffers,
  autoBidOffers,
  offerStatus
}) => {
  const totalBuyOffers = buyOffers
    ? Object.values(buyOffers).filter(offer => offer.status === offerStatus)
        .length
    : 0;

  const totalSellOffers = sellOffers
    ? Object.values(sellOffers).filter(offer => offer.status === offerStatus)
        .length
    : 0;

  const totalAutoBidOffers = autoBidOffers
    ? Object.values(autoBidOffers).filter(offer => offer.status === offerStatus)
        .length
    : 0;

  return totalBuyOffers + totalSellOffers + totalAutoBidOffers;
};
