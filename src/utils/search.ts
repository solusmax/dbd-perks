export const getClearedSearchText = (text: string | undefined) => {
  if (text == null) {
    return '';
  }

  return text.trim().replace(/[\s]+/g, ' ').replace(/ё/g, 'е');
};
