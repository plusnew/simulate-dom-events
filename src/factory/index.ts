const defaultEventInit: EventInit = {
  cancelable: true,
  bubbles: true,
};

type base = {
  cancelable: boolean,
};

export const createMouseEvent = (type: string, keyboardEventInit: KeyboardEventInit & base) => {
  return new MouseEvent(type, {
    ...defaultEventInit,
    ...keyboardEventInit,
  });
};

export const createKeyboardEvent = (type: string, mouseEventInit: MouseEventInit & base) => {
  return new MouseEvent(type, {
    ...defaultEventInit,
    ...mouseEventInit,
  });
};

export const createEvent = (type: string, eventInit: EventInit & base) => {
  return new Event(type, {
    ...defaultEventInit,
    ...eventInit,
  });
};
