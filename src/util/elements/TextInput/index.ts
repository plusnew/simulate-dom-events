export function isTextInput(target: HTMLElement): target is HTMLInputElement {
  return target instanceof HTMLInputElement && target.type === 'text';
}
