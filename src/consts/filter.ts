import { Options } from 'minisearch';

export const SEARCH_DELAY = 500;

export const searchByNamesOptions: Options = {
  fields: ['searchNames', 'searchCharacterNames'],
  storeFields: ['id'],
  searchOptions: {
    combineWith: 'AND',
    fuzzy: 0.1,
    prefix: true,
  },
};

export const searchByDescriptionOptions: Options = {
  fields: ['searchDescription'],
  storeFields: ['id', 'searchDescription'],
  searchOptions: {
    combineWith: 'AND',
    fuzzy: false,
    prefix: true,
  },
};
