import { Options } from 'minisearch';

export const SEARCH_DELAY = 500;

export const searchByNamesOptions: Options = {
  fields: ['localeNames', 'localeCharacterNames'],
  storeFields: ['id'],
  searchOptions: {
    combineWith: 'AND',
    fuzzy: 0.1,
    prefix: true,
  },
};

export const searchByDescriptionOptions: Options = {
  fields: ['localeDescription'],
  storeFields: ['id', 'localeDescription'],
  searchOptions: {
    combineWith: 'AND',
    fuzzy: false,
    prefix: true,
  },
};
