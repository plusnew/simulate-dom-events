import factory from './factory';

export default (target: Element) => {
  target.dispatchEvent(factory('mousedown'));
  target.dispatchEvent(factory('mouseup'));
  target.dispatchEvent(factory('click'));
};
