import factory from './factory';

export default (target: Element) => {
  target.dispatchEvent(factory('mousedown', { cancelable: true }));
  target.dispatchEvent(factory('mouseup', { cancelable: true }));

  if (target instanceof HTMLInputElement && target.type === 'checkbox') {
    const clickEvent = factory('click', { cancelable: true });

    target.dispatchEvent(clickEvent);

    if (clickEvent.defaultPrevented === false) {
      target.dispatchEvent(factory('input', { cancelable: false }));
      target.dispatchEvent(factory('change', { cancelable: false }));
    }
  } else {
    target.dispatchEvent(factory('click', { cancelable: true }));
  }
};
