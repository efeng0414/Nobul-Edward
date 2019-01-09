export const allowedSuggestionTypes = ({ typesToBeRemoved }) => ({ types }) =>
  !types.some(type => typesToBeRemoved.includes(type));
