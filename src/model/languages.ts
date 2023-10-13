import languagesJson from '@/data/languages.json';

export const getLanguages = () => {
  return languagesJson.map((language) => language.value);
};
