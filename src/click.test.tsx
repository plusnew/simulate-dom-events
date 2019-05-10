import doc from './testHelper/doc';
import { click } from './index';

describe('click', () => {
  it('basic click', () => {
    const divClickSpy = jasmine.createSpy('divClickSpy');

    const element = <div onclick={divClickSpy}>test</div>;

    click(element);

    expect(divClickSpy).toHaveBeenCalled();
  });

  it('event propagation click', () => {
    const divClickSpy = jasmine.createSpy('divClickSpy');
    const spanClickSpy = jasmine.createSpy('spanClickSpy');

    const element = <div onclick={divClickSpy}><span onclick={spanClickSpy} /></div>;

    click(element.querySelector('span') as HTMLElement);

    expect(spanClickSpy).toHaveBeenCalled();
    expect(divClickSpy).toHaveBeenCalled();
  });

  it('event propagation click', () => {
    const divClickSpy = jasmine.createSpy('divClickSpy');
    const spanClickSpy = jasmine.createSpy('spanClickSpy', (evt: Event) => evt.stopPropagation()).and.callThrough();

    const element = <div onclick={divClickSpy}><span onclick={spanClickSpy} /></div>;

    click(element.querySelector('span') as HTMLElement);

    expect(spanClickSpy).toHaveBeenCalled();
    expect(divClickSpy).not.toHaveBeenCalled();
  });

  it('mousedown is clicked before mouseup before click', () => {
    const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mousedown');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
    }).and.callThrough();

    const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mouseup');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
    }).and.callThrough();

    const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
      expect(event.type).toBe('click');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
    }).and.callThrough();

    const changeSpy = jasmine.createSpy('changeSpy');
    const inputSpy = jasmine.createSpy('inputSpy');

    const spanElement = <span  />;
    const divElement: HTMLElement =
      <div
        onclick={clickSpy}
        onmousedown={mousedownSpy}
        onmouseup={mouseupSpy}
        onchange={changeSpy}
        oninput={inputSpy}
      >{spanElement}</div>;

    click(spanElement);

    expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
    expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);

    expect(inputSpy).not.toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });
});
