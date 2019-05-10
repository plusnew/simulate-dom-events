export default {
  createElement(tagName: string, props: {} | null, ...children: (Element|string)[]) {
    const element = document.createElement(tagName);

    if (props !== null) {
      Object.entries(props).forEach(([key, value]) => {
        (element as any)[key] = value;
      });
    }

    children.forEach(child =>
      element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child),
    );

    return element;
  },
};
