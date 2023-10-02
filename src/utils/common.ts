export const removeElementFromArray = <T>(array: T[], removedElement: T) =>
  array.filter((item) => item !== removedElement);

export const getCssVariable = (cssVariable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    cssVariable,
  );
};

export const disablePointerEvents = (element: HTMLElement) => {
  element.style.pointerEvents = 'none';
};

export const resetPointerEvents = (element: HTMLElement) => {
  element.style.pointerEvents = 'auto';
};

export const getDataAttribute = (element: HTMLElement, attribute: string) => {
  if (element === null) return '';

  return element?.getAttribute(attribute) ?? '';
};
