import doc from './testHelper/doc';
import { type } from './index';

describe('type', () => {
  describe('input text', () => {
    it('basic typing in an in', () => {
      const onkeydownSpy = jasmine.createSpy('onkeydownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('onkeydown');
        expect(event.currentTarget).toBe(containerElement);
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const onkeypressSpy = jasmine.createSpy('onkeypressSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('onkeypress');
        expect(event.currentTarget).toBe(containerElement);
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const oninputSpy = jasmine.createSpy('oninputSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('oninput');
        expect(event.currentTarget).toBe(containerElement);
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true); // @TODO correct?
      }).and.callThrough();

      const onkeyupSpy = jasmine.createSpy('onkeyupSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('onkeyup');
        expect(event.currentTarget).toBe(containerElement);
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true); // @TODO correct?
      }).and.callThrough();

      const inputElement = <input type="text" />;

      const containerElement = <div
        onkeydown={onkeydownSpy}
        onkeypress={onkeypressSpy}
        oninput={oninputSpy}
        onkeyup={onkeyupSpy}
      >{inputElement}</div>;

      type({
        target: inputElement,
        value: 'foo',
      });

      expect(onkeydownSpy).toHaveBeenCalledBefore(onkeypressSpy);
      expect(onkeypressSpy).toHaveBeenCalledBefore(oninputSpy);
      expect(oninputSpy).toHaveBeenCalledBefore(onkeyupSpy);
    });
  });
});
