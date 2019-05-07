import doc from './testHelper/doc';
import { click } from './index';

describe('click', () => {
  it('basic click', () => {
    const divClickSpy = jasmine.createSpy('divClickSpy');

    const element = <div onclick={divClickSpy}></div>;

    click(element);

    expect(divClickSpy).toHaveBeenCalled();
  });

  it('event propagation click', () => {
    const divClickSpy = jasmine.createSpy('divClickSpy');
    const spanClickSpy = jasmine.createSpy('spanClickSpy');

    const element: HTMLElement = <div onclick={divClickSpy}><span onclick={spanClickSpy} /></div>;

    click(element.querySelector('span') as HTMLElement);

    expect(spanClickSpy).toHaveBeenCalled();
    expect(divClickSpy).toHaveBeenCalled();
  });

  it('event propagation click', () => {
    const divClickSpy = jasmine.createSpy('divClickSpy');
    const spanClickSpy = jasmine.createSpy('spanClickSpy', (evt: Event) => evt.stopPropagation()).and.callThrough();

    const element: HTMLElement = <div onclick={divClickSpy}><span onclick={spanClickSpy} /></div>;

    click(element.querySelector('span') as HTMLElement);

    expect(spanClickSpy).toHaveBeenCalled();
    expect(divClickSpy).not.toHaveBeenCalled();
  });
});
