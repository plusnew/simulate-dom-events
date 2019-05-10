const defaultEventInit: EventInit = {
  cancelable: true,
  bubbles: true,
};

export default(type: string, mouseEventInit: MouseEventInit = {}) => {
  return new MouseEvent(type, {
    ...defaultEventInit,
    ...mouseEventInit,
  });
};
