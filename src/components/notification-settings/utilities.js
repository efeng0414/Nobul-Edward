export const ALL = "all";
export const isNotAll = key => key !== ALL;
export const setParamToEntryKey = fn => ([entryKey]) => fn(entryKey);
