export function isCheckbox(target: HTMLElement): target is HTMLInputElement {
  return target instanceof HTMLInputElement && target.type === 'checkbox';
}
