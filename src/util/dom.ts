export function getRootElement(target: HTMLElement): HTMLElement {
  if (target.parentElement) {
    return getRootElement(target.parentElement);
  }
  return target;
}
