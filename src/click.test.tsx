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

  it('mousedown is clicked before mouseup, before click', () => {
    const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mousedown');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mouseup');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
      expect(event.type).toBe('click');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const inputSpy = jasmine.createSpy('inputSpy');
    const changeSpy = jasmine.createSpy('changeSpy');

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

  it('trigger oninput and onchange on checkbox', () => {
    const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mousedown');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(false);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mouseup');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(false);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
      expect(event.type).toBe('click');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(true);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const inputSpy = jasmine.createSpy('inputSpy', (event: MouseEvent) => {
      expect(event.type).toBe('input');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(true);
      expect(event.cancelable).toBe(false);
    }).and.callThrough();

    const changeSpy = jasmine.createSpy('changeSpy', (event: MouseEvent) => {
      expect(event.type).toBe('change');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(true);
      expect(event.cancelable).toBe(false);
    }).and.callThrough();

    const checkboxElement = <input type="checkbox" /> as HTMLInputElement;
    const divElement: HTMLElement =
      <div
        onclick={clickSpy}
        onmousedown={mousedownSpy}
        onmouseup={mouseupSpy}
        onchange={changeSpy}
        oninput={inputSpy}
      >{checkboxElement}</div>;

    click(checkboxElement);

    expect(checkboxElement.checked).toBe(true);
    expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
    expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);
    expect(clickSpy).toHaveBeenCalledBefore(inputSpy);
    expect(inputSpy).toHaveBeenCalledBefore(changeSpy);
  });

  it('oninput and onchange are not called, when onclick makes preventdefault', () => {
    const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mousedown');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(false);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
      expect(event.type).toBe('mouseup');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(false);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
      expect(event.type).toBe('click');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(checkboxElement);
      expect((event.target as HTMLInputElement).checked).toBe(true);
      expect(event.cancelable).toBe(true);
      event.preventDefault();
    }).and.callThrough();

    const inputSpy = jasmine.createSpy('inputSpy');
    const changeSpy = jasmine.createSpy('changeSpy');

    const checkboxElement = <input type="checkbox" /> as HTMLInputElement;
    const divElement: HTMLElement =
      <div
        onclick={clickSpy}
        onmousedown={mousedownSpy}
        onmouseup={mouseupSpy}
        onchange={changeSpy}
        oninput={inputSpy}
      >{checkboxElement}</div>;

    click(checkboxElement);

    expect(checkboxElement.checked).toBe(false);
    expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
    expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);

    expect(inputSpy).not.toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });
});
