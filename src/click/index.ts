import { createEvent, createMouseEvent } from '../factory';
import { isCheckbox } from '../util/elements/Checkbox';
import { getRootElement } from 'util/dom';

function getCorrespondingElement(target: HTMLLabelElement): HTMLElement | null {
  return getRootElement(target).querySelector(`#${target.htmlFor}`);
}

export default (target: HTMLElement) => {
  target.dispatchEvent(createMouseEvent('mousedown', { cancelable: true }));
  target.dispatchEvent(createMouseEvent('mouseup', { cancelable: true }));

  let inputElement = target;

  if (target instanceof HTMLLabelElement) {
    const possibleTarget = getCorrespondingElement(target);
    if (possibleTarget) {
      inputElement = possibleTarget;
    }
  }

  if (isCheckbox(inputElement)) {
    const previousValue = inputElement.checked;

    if (inputElement !== target) {
      // When dispatchEvent on the checkbox itself, the value toggles
      // When dispatchEvent on its label, the value doesnt toggle
      inputElement.checked = !previousValue;
    }

    const clickEvent = createMouseEvent('click', { cancelable: true });
    target.dispatchEvent(clickEvent);

    if (clickEvent.defaultPrevented === true) {
      inputElement.checked = previousValue;
    } else {
      inputElement.dispatchEvent(createEvent('input', { cancelable: false }));
      inputElement.dispatchEvent(createEvent('change', { cancelable: false }));
    }
  } else if (target instanceof HTMLInputElement && target.type === 'submit') {
    const clickEvent = createMouseEvent('click', { cancelable: true });

    target.dispatchEvent(clickEvent);

    if (clickEvent.defaultPrevented === false && target.form) {
      target.form.dispatchEvent(createEvent('submit', { cancelable: true }));
    }
  } else {
    target.dispatchEvent(createMouseEvent('click', { cancelable: true }));
  }
};
