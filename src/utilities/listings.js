import { PRICE, DATE } from "../../core/constants/shared";

export const getListingCardDataFromAPIData = ({ APIData }) => {
  const {
    $: { ID: uid } = {
      ID: ""
    }
  } = APIData;
  const { featureImageUrl } = APIData;

  const { Price: [price] = [""] } = APIData;

  const { Address = [{}] } = APIData;
  const { City = [""] } = Address[0];
  const [location] = City;

  const { ListingID = [""] } = APIData;
  const [MLS] = ListingID;

  const { AgentDetails = [{}] } = APIData;
  const { Office = [{}] } = AgentDetails[0];
  const { Name = [] } = Office[0];
  const [brokerage] = Name;

  const { AddressLine1 = [""] } = Address[0];
  const [address] = AddressLine1;
  const { BedroomsTotal } = APIData.Building[0];
  const bedrooms = BedroomsTotal && parseInt(BedroomsTotal[0]);
  const { BathroomTotal } = APIData.Building[0];
  const bathrooms = BathroomTotal && parseInt(BathroomTotal[0]);

  return {
    uid,
    featureImageUrl,
    price,
    city: location, // lets call it 'city' because withRouter HOC uses a location prop
    bathrooms,
    bedrooms,
    MLS,
    brokerage,
    address
  };
};

export const listingSortMap = {
  [PRICE]: (prev, next) => parseFloat(prev.price) > parseFloat(next.price),
  [DATE]: (prev, next) => prev.lastUpdated > next.lastUpdated
};
