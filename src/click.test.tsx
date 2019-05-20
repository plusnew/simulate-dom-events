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
      expect(event instanceof MouseEvent).toBe(true);
      expect(event.type).toBe('mousedown');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
      expect(event instanceof MouseEvent).toBe(true);
      expect(event.type).toBe('mouseup');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
      expect(event instanceof MouseEvent).toBe(true);
      expect(event.type).toBe('click');
      expect(event.currentTarget).toBe(divElement);
      expect(event.target).toBe(spanElement);
      expect(event.cancelable).toBe(true);
    }).and.callThrough();

    const inputSpy = jasmine.createSpy('inputSpy');
    const changeSpy = jasmine.createSpy('changeSpy');

    const spanElement = <span />;
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

  describe('checkbox', () => {

    it('trigger oninput and onchange on checkbox', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('click');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(true);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const inputSpy = jasmine.createSpy('inputSpy', (event: Event) => {
        expect(event instanceof Event).toBe(true);
        expect(event.type).toBe('input');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(true);
        expect(event.cancelable).toBe(false);
      }).and.callThrough();

      const changeSpy = jasmine.createSpy('changeSpy', (event: Event) => {
        expect(event instanceof Event).toBe(true);
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

    it('trigger oninput and onchange on checkbox, when clicking on label', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(labelElement);
        expect(checkboxElement.checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(labelElement);
        expect(checkboxElement.checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('click');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(labelElement);
        expect(checkboxElement.checked).toBe(true);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const inputSpy = jasmine.createSpy('inputSpy', (event: Event) => {
        expect(event instanceof Event).toBe(true);
        expect(event.type).toBe('input');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(true);
        expect(event.cancelable).toBe(false);
      }).and.callThrough();

      const changeSpy = jasmine.createSpy('changeSpy', (event: Event) => {
        expect(event instanceof Event).toBe(true);
        expect(event.type).toBe('change');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(true);
        expect(event.cancelable).toBe(false);
      }).and.callThrough();

      const checkboxElement = <input type="checkbox" id="checkbox" /> as HTMLInputElement;
      const labelElement = <label htmlFor="checkbox"/>;

      const divElement: HTMLElement =
        <div
          onclick={clickSpy}
          onmousedown={mousedownSpy}
          onmouseup={mouseupSpy}
          onchange={changeSpy}
          oninput={inputSpy}
        >{checkboxElement}{labelElement}</div>;

      click(labelElement);

      expect(checkboxElement.checked).toBe(true);
      expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
      expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);
      expect(clickSpy).toHaveBeenCalledBefore(inputSpy);
      expect(inputSpy).toHaveBeenCalledBefore(changeSpy);
    });

    it('oninput and onchange are not called, when onclick makes preventdefault', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(checkboxElement);
        expect((event.target as HTMLInputElement).checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
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

    it('oninput and onchange are not called, when onclick makes preventdefault, when clicked on label', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(labelElement);
        expect(checkboxElement.checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(labelElement);
        expect(checkboxElement.checked).toBe(false);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('click');
        expect(event.currentTarget).toBe(divElement);
        expect(event.target).toBe(labelElement);
        expect(checkboxElement.checked).toBe(true);
        expect(event.cancelable).toBe(true);
        event.preventDefault();
      }).and.callThrough();

      const inputSpy = jasmine.createSpy('inputSpy');
      const changeSpy = jasmine.createSpy('changeSpy');

      const checkboxElement = <input type="checkbox" id="checkbox" /> as HTMLInputElement;
      const labelElement = <label htmlFor="checkbox"/>;

      const divElement: HTMLElement =
        <div
          onclick={clickSpy}
          onmousedown={mousedownSpy}
          onmouseup={mouseupSpy}
          onchange={changeSpy}
          oninput={inputSpy}
        >{checkboxElement}{labelElement}</div>;

      click(labelElement);

      expect(checkboxElement.checked).toBe(false);
      expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
      expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);

      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('without form', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('click');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const submitSpy = jasmine.createSpy('submitSpy');

      const submitElement = <input type="submit"
        onclick={clickSpy}
        onmousedown={mousedownSpy}
        onmouseup={mouseupSpy}
        onsubmit={submitSpy}
      />;

      click(submitElement);

      expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
      expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);
      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('with form', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('click');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const submitOnFormSpy = jasmine.createSpy('submitOnFormSpy', (event: Event) => {
        expect(event instanceof Event).toBe(true);
        expect(event.type).toBe('submit');
        expect(event.currentTarget).toBe(formElement);
        expect(event.target).toBe(formElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const submitSpy = jasmine.createSpy('submitSpy');

      const submitElement = <input type="submit"
        onclick={clickSpy}
        onmousedown={mousedownSpy}
        onmouseup={mouseupSpy}
        onsubmit={submitSpy}
      />;

      const formElement = <form onsubmit={submitOnFormSpy}>{submitElement}</form>;
      click(submitElement);

      expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
      expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);
      expect(clickSpy).toHaveBeenCalledBefore(submitOnFormSpy);

      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('with form', () => {
      const mousedownSpy = jasmine.createSpy('mousedownSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mousedown');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const mouseupSpy = jasmine.createSpy('mouseUpSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('mouseup');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
      }).and.callThrough();

      const clickSpy = jasmine.createSpy('clickSpy', (event: MouseEvent) => {
        expect(event instanceof MouseEvent).toBe(true);
        expect(event.type).toBe('click');
        expect(event.currentTarget).toBe(submitElement);
        expect(event.target).toBe(submitElement);
        expect(event.cancelable).toBe(true);
        event.preventDefault();
      }).and.callThrough();

      const submitOnFormSpy = jasmine.createSpy('submitOnFormSpy');

      const submitSpy = jasmine.createSpy('submitSpy');

      const submitElement = <input type="submit"
        onclick={clickSpy}
        onmousedown={mousedownSpy}
        onmouseup={mouseupSpy}
        onsubmit={submitSpy}
      />;

      <form onsubmit={submitOnFormSpy}>{submitElement}</form>;

      click(submitElement);

      expect(mousedownSpy).toHaveBeenCalledBefore(mouseupSpy);
      expect(mouseupSpy).toHaveBeenCalledBefore(clickSpy);

      expect(submitOnFormSpy).not.toHaveBeenCalled();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });
});
