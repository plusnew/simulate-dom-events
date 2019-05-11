# domevents
Simulates browser behaviour of dom event groups 

## Goal
To have an abstraction layer for testing applications with dom events.

## API
```ts

  import { click } from '@plusnew/simulate-dom-events';

  const checkboxElement = <input type="checkbox" onclick={() => console.log('click fired')} onchange={() => console.log('change fired!')}/> as HTMLInputElement;

  click(checkboxElement);
  // The mousedown, mouseup, click, input and change event will fire synchronously with the correct values
  // In case in the click event a prevendDefault() is called, the input and change event will not occur
```