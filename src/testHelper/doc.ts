export default {
  createElement(tagName: string, props: {}, ...children: Element[]) {
    const element = document.createElement(tagName);

    Object.entries(props).forEach(([key, value]) => {
      (element as any)[key] = value;
    });

    children.forEach(child => element.appendChild(child));

    return element;
  },
};
