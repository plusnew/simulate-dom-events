import { isTextInput } from 'util/elements/TextInput';
import { createKeyboardEvent } from 'factory';

type opt = {
  target: HTMLElement;
  value: string;
};

function addChar(target: HTMLInputElement, character: string) {
  const keyDownEvent = createKeyboardEvent('keydown', { cancelable: true });
  target.dispatchEvent(keyDownEvent);

  let defaultPrevented = keyDownEvent.defaultPrevented;

  if (defaultPrevented === false) {
    const keyPressEvent = createKeyboardEvent('keypress', { cancelable: true });
    target.dispatchEvent(keyPressEvent);

    defaultPrevented = keyPressEvent.defaultPrevented;

    if (defaultPrevented === false && target.readOnly === false) {
      target.value += character;

      const inputEvent = createKeyboardEvent('input', { cancelable: false });
      target.dispatchEvent(inputEvent);
    }
  }

  const keyUpEvent = createKeyboardEvent('keyup', { cancelable: false });
  target.dispatchEvent(keyUpEvent);
}

export default (opt: opt) => {
  if (isTextInput(opt.target)) {
    if (opt.target.disabled === false) {
      for (let i = 0; i < opt.value.length; i += 1) {
        addChar(opt.target, opt.value[i]);
      }
    }
  }
};
