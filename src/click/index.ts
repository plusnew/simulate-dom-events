import factory from './factory';

export default (target: Element) => {
  target.dispatchEvent(factory('click'));
};
