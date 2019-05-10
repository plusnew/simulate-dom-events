const defaultEventInit: EventInit = {
  cancelable: false,
  bubbles: true,
};

export default(type: string, mouseEventInit: MouseEventInit = {}) => {
  return new MouseEvent(type, {
    ...defaultEventInit,
    ...mouseEventInit,
  });
};
