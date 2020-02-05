import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { animated, useSpring } from 'react-spring';
import Styles from 'styles/JavaScriptQuestions.css';

const html = `
  <table id="tbl" border="1">
    <tbody>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
`;

const appendRowString = `
  function appendRow() {
    var table = document.querySelector('#tbl'); // Find the table with id tbl and store it in the variable table.
    var tr = document.createElement("tr"); // Create a new table row.
    var td = document.createElement("td"); // Create a new table cell.
    tr.appendChild(td); // Append the newly created table cell to the newly created table row.
    tr.appendChild(td.cloneNode(true)); // Since a node cant be in two locations in the tree at once, we have to clone it when we append it again.
    table.firstElementChild.appendChild(tr); // Append the new tr with two tds to the first element child of the table which is tbody
  };
`;

const htmlButton = `
  <button id="btn" onClick="addClickHandler(this);">Button</button>
`;

const addClickHandlerString = `
  function addClickHandler(button) { // Function takes parameter button which is the DOMElement itself, the button.
    button.classList.add('hide'); // We can add a class to the button and call it hide which is just a css class with display none .hide { display: none }
    setTimeout(() => button.classList.remove('hide'), 1000); // We create a timeout function that in 1 second or 1000 milliseconds will remove the class hide from the button.
  };
`;

const modifyArrayString = `
  function modifyArray(arr) { // Function modifyArray takes parameter arr which is the array we want to modify by removing everything but numbers from it.
    for (var i = arr.length - 1; i >= 0; i--) { // We loop though the array backwards. arr.length equals 4 and the last index of the arr equals 3, so i = 4 - 1 and we decrement i until we hit 0 looping though all indexes in the array.
      if (typeof arr[i] !== "number") { // We check if the current item is not a number
        /* 
          The reason we loop backwards is because we are modifying the array as we loop through it.
          If we loop though the array forward, once we remove 'a' from the array the index of 'b' will become 1 instead of 2
          but the current index will be 2 in the loop and arr[2] will equal to 2 completely skipping 'b' in the array.
          By looping backwards we can remove 'b' and the index of 'a' will not change.
        */
        arr.splice(i, 1); // remove item from array at index i and the 1 means only remove one item.
      };
    };
    return arr;
  };

  modifyArray([1, 'a', 'b', 2]); // returns [1, 2]
`

export function JavaScriptQuestions({style, className}) {

  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState('Click me');
  const [hide, setHide] = useState(false);
  const props = useSpring({opacity: hide ? 0 : 1});

  function addClickHandler() {
    if (disabled) return;
    setDisabled(true);
    setText("I'm disappearing");
    setHide(true);
    setTimeout(() => {
      setDisabled(false);
      setText("I'm back");
      setHide(false);
    }, 1000);
  };

  return (
    <animated.div style={style} className={className}>
      <div className={Styles.heading}>JavaScript Questions:</div>
      <div className={Styles.paragraph}>
          Write a function appendRow that appends a table row to the table with ID "tbl". 
          The appended row should have the same number of cells as the last row in that table. 
          For example, after appending a row to the table below, the table should have 2 rows where each row has 2 cells.
      </div>
      <SyntaxHighlighter language="html" style={monokai}>
        {html}
      </SyntaxHighlighter>
      <div>Here is the function appendRow</div>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {appendRowString}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>Write an addClickHandler function that registers a click handler and implements the following logic:</div>
      <div className={Styles.paragraph}>When a button with id "btn"; is clicked, it disappears.</div>
      <div className={Styles.paragraph}>1 second after the click, it reappears.</div>
      <div className={Styles.paragraph}>So lets say we have the following button below</div>
      <SyntaxHighlighter language="html" style={monokai}>
        {htmlButton}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>If we pass "this" to the function we can actually pass the DOMElement itself to the function.</div>
      <div className={Styles.paragraph}>Then the function addClickHandler can go as follows.</div>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {addClickHandlerString}
      </SyntaxHighlighter>
      <div className={Styles.buttonContainer}>
        <animated.button style={props} className={Styles.button} onClick={addClickHandler}>{text}</animated.button>
      </div>
      <div className={Styles.paragraph}>
        Write a function that removes all items that are not numbers from the array. 
        The function should modify the existing array, not create a new one.
      </div>
      <div className={Styles.paragraph}>For example, if the input array contains values [1, "a", "b", 2], after processing, the array will contain only values [1, 2].</div>
      <div className={Styles.paragraph}>Here is the function modifyArray</div>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {modifyArrayString}
      </SyntaxHighlighter>
    </animated.div>
  );
};