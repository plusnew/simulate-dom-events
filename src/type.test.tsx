import doc from './testHelper/doc';
import { type } from './index';

describe('type', () => {
  describe('input text', () => {
    it('basic typing in an in', () => {
      const onkeydownSpy = jasmine.createSpy('onkeydownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keydown');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const onkeypressSpy = jasmine.createSpy('onkeypressSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keypress');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const oninputSpy = jasmine.createSpy('oninputSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('input');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('f');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(false);
      }).and.callThrough();

      const onkeyupSpy = jasmine.createSpy('onkeyupSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keyup');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('f');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(false);
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
        value: 'f',
      });

      expect(onkeydownSpy).toHaveBeenCalledBefore(onkeypressSpy);
      expect(onkeypressSpy).toHaveBeenCalledBefore(oninputSpy);
      expect(oninputSpy).toHaveBeenCalledBefore(onkeyupSpy);
    });

    it('keypress prevents', () => {
      const onkeydownSpy = jasmine.createSpy('onkeydownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keydown');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const onkeypressSpy = jasmine.createSpy('onkeypressSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keypress');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);

        event.preventDefault();
      }).and.callThrough();

      const oninputSpy = jasmine.createSpy('oninputSpy', (event: MouseEvent) => {});

      const onkeyupSpy = jasmine.createSpy('onkeyupSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keyup');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(false);
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
        value: 'f',
      });

      expect(onkeydownSpy).toHaveBeenCalledBefore(onkeypressSpy);
      expect(onkeypressSpy).toHaveBeenCalledBefore(onkeyupSpy);

      expect(oninputSpy).not.toHaveBeenCalled();
    });

    it('keydown prevents', () => {
      const onkeydownSpy = jasmine.createSpy('onkeydownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keydown');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);

        event.preventDefault();
      }).and.callThrough();

      const onkeypressSpy = jasmine.createSpy('onkeypressSpy', (event: MouseEvent) => {});

      const oninputSpy = jasmine.createSpy('oninputSpy', (event: MouseEvent) => {});

      const onkeyupSpy = jasmine.createSpy('onkeyupSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keyup');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(false);
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
        value: 'f',
      });

      expect(onkeydownSpy).toHaveBeenCalledBefore(onkeyupSpy);
      expect(onkeypressSpy).not.toHaveBeenCalled();
      expect(oninputSpy).not.toHaveBeenCalled();
    });

    it('disabled prevents any events', () => {
      const onkeydownSpy = jasmine.createSpy('onkeydownSpy', (event: MouseEvent) => {});
      const onkeypressSpy = jasmine.createSpy('onkeypressSpy', (event: MouseEvent) => {});
      const oninputSpy = jasmine.createSpy('oninputSpy', (event: MouseEvent) => {});
      const onkeyupSpy = jasmine.createSpy('oninpkeyup', (event: MouseEvent) => {});

      const inputElement = <input type="text" disabled={true} />;

      <div
        onkeydown={onkeydownSpy}
        onkeypress={onkeypressSpy}
        oninput={oninputSpy}
        onkeyup={onkeyupSpy}
      >{inputElement}</div>;

      type({
        target: inputElement,
        value: 'f',
      });

      expect(onkeydownSpy).not.toHaveBeenCalled();
      expect(onkeypressSpy).not.toHaveBeenCalled();
      expect(oninputSpy).not.toHaveBeenCalled();
      expect(onkeyupSpy).not.toHaveBeenCalled();
    });

    it('readonly', () => {
      const onkeydownSpy = jasmine.createSpy('onkeydownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keydown');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const onkeypressSpy = jasmine.createSpy('onkeypressSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keypress');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const oninputSpy = jasmine.createSpy('oninputSpy', (event: MouseEvent) => {});

      const onkeyupSpy = jasmine.createSpy('onkeyupSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('keyup');
        expect(event.currentTarget).toBe(containerElement);
        expect((event.target as HTMLInputElement).value).toBe('');
        expect(event.target).toBe(inputElement);
        expect(event.cancelable).toBe(false);
      }).and.callThrough();

      const inputElement = <input type="text" readOnly={true}/>;

      const containerElement = <div
        onkeydown={onkeydownSpy}
        onkeypress={onkeypressSpy}
        oninput={oninputSpy}
        onkeyup={onkeyupSpy}
      >{inputElement}</div>;

      type({
        target: inputElement,
        value: 'f',
      });

      expect(onkeydownSpy).toHaveBeenCalledBefore(onkeypressSpy);
      expect(onkeypressSpy).toHaveBeenCalledBefore(onkeyupSpy);

      expect(oninputSpy).not.toHaveBeenCalled();
    });
  });
});
