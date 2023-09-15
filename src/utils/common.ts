export const getCssVariable = (cssVariable: string) => {
 return getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
}

export const disablePointerEvents = (element: HTMLElement) => {
  element.style.pointerEvents = 'none';
}

export const resetPointerEvents = (element: HTMLElement) => {
  element.style.pointerEvents = 'auto';
}
