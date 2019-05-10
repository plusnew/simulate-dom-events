import factory from './factory';

export default (target: Element) => {
  target.dispatchEvent(factory('mousedown'));
  target.dispatchEvent(factory('mouseup'));

  if (target instanceof HTMLInputElement && target.type === 'checkbox') {
    const previousValue = target.checked;
    console.log(previousValue);
    const clickEvent = factory('click');

    target.dispatchEvent(clickEvent);

    if (clickEvent.defaultPrevented === false) {
      target.dispatchEvent(factory('input'));
      target.dispatchEvent(factory('change'));
    }
  } else {
    target.dispatchEvent(factory('click'));
  }
};
