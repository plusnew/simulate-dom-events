const defaultEventInit: EventInit = {
  cancelable: true,
  bubbles: true,
};

type base = {
  cancelable: boolean,
}

export const createMouseEvent = (type: string, mouseEventInit: MouseEventInit & base) => {
  return new MouseEvent(type, {
    ...defaultEventInit,
    ...mouseEventInit,
  });
};

export const createEvent = (type: string, mouseEventInit: EventInit & base) => {
  return new Event(type, {
    ...defaultEventInit,
    ...mouseEventInit,
  });
};
