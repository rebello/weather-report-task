// const Init = require('./init');
// import { fireEvent, getByText } from '@testing-library/dom'
// import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
const parse = require('jsdom');

let dom;
let container;

describe('Testing of data in DOM', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body
      })

      it('renders a heading element', () => {
        expect(container.querySelector('#cityName').textContent).not.toBeNull()
        expect(getByText(container, 'Pun Generator')).toBeInTheDocument()
      })
});
// describe("Testing weather application", () => {
//     describe("Testing application initial state: ", () => {
//       it("Should get the first french city as default", () => {
//       //   Init.init();
        
//         expect(document.getElementById("cityName").innerText).toBe('Abbeville');
//       });
//     });
//   });
  