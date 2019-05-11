import { createEvent, createMouseEvent } from '../factory';

export default (target: Element) => {
  target.dispatchEvent(createMouseEvent('mousedown', { cancelable: true }));
  target.dispatchEvent(createMouseEvent('mouseup', { cancelable: true }));

  if (target instanceof HTMLInputElement && target.type === 'checkbox') {
    const clickEvent = createMouseEvent('click', { cancelable: true });

    target.dispatchEvent(clickEvent);

    if (clickEvent.defaultPrevented === false) {
      target.dispatchEvent(createEvent('input', { cancelable: false }));
      target.dispatchEvent(createEvent('change', { cancelable: false }));
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
