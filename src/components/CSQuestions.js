import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { animated } from 'react-spring';
import Styles from 'styles/CSQuestions.css';

const frogCommunitySumString = `
  function frogCommunitySum(n) { // Function takes parameter n which is the day we want to check for
    let frogsArray = new Array(n).fill(0); // Creates an array the length of n and fills it with zeros
    let sum = 0; // Create let sum to store the sum of all frogs
    for (var i = 0; i < frogsArray.length; i++) { // The first loop i represents the current day.
      for (var j = 0; j < frogsArray.length; j++) { // The second loop j represents the current frog index.
        if (j <= i && frogsArray[j] < 100) { // if j the current frog index is less then or equal to the day that means the frog has been born, we then check if the current frogs weight is less then 100 to see if it can still grow.
          frogsArray[j] += 10; // if the conditions are met the current frog weight will be concatenated by 10.
        };
      };
    };
    for(var s in frogsArray) { sum += frogsArray[s]; } // Once all the frogs weights are in the array we can loop though each value and concatenate it to the sum
    return sum; // return the sum 
  };
`

const frogCommunityAverageWeightString = `
  function frogCommunityAverageWeight(n) { // Function takes parameter n which is the day we want to check for
    return frogCommunitySum(n) / n; // returns the sum from the function above divided by n
  };
`

export function CSQuestions({style, className}) {

  const [frogSum, setFrogCommunitySum] = useState(0);
  const [frogAverage, setFrogAverage] = useState(0);
  const [error, setError] = useState('');

  function frogCommunitySum(n) {
    let frogsArray = new Array(n).fill(0);
    let sum = 0;
    for (var i = 0; i < frogsArray.length; i++) {
      for (var j = 0; j < frogsArray.length; j++) {
        if (j <= i && frogsArray[j] < 100) {
          frogsArray[j] += 10;
        };
      };
    };
    for(var s in frogsArray) { sum += frogsArray[s]; }
    return sum;
  };
  
  function frogCommunityAverageWeight(n) {
    if (n === 0) return 0;
    return (frogCommunitySum(n) / n).toFixed(2);
  };

  function handleInputChange(e) {
    setError('');
    const value = e.target.value;
    const parsedValue = value === '' ? 0 : parseInt(value);
    if (isNaN(parsedValue)) {
      setError('Value of n must be a number.');
      return;
    };
    if (Math.sign(value) === -1) {
      setError('Value of n cannot be negative.');
      return;
    };
    setFrogCommunitySum(frogCommunitySum(parsedValue));
    setFrogAverage(frogCommunityAverageWeight(parsedValue));
  };

  return (
    <animated.div style={style} className={className}>
      <div className={Styles.heading}>CS Questions:</div>
      <div className={Styles.paragraph}>Every day a new frog is born weight 0grams and grows at a rate of 10grams/day, maxing out at 100grams in 10 days</div>
      <div className={Styles.paragraph}>On day n, what is the total weight of the frog community?</div>
      <div className={Styles.paragraph}>To solve this problem I used what I know best which is JavaScript.</div>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {frogCommunitySumString}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>On day n, what is the average weight of the average frog?</div>
      <div className={Styles.paragraph}>To find the average weight of the frogs I wrote a function that divides the total weight of the frogs by n.</div>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {frogCommunityAverageWeightString}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>Try it for yourself. Change the value of n below and see what the total weight and average weight of the frogs are on a particular day.</div>
      <div className={Styles.error}>{error}</div>
      <div className={Styles.inputContainer}>
        <label className={Styles.label}>n: </label>
        <input
          placeholder={'0'}
          type={'text'}
          onChange={handleInputChange} 
          className={Styles.input}>
        </input>
      </div>
      <div className={Styles.frogSum}>Total weight in grams: {frogSum}</div>
      <div className={Styles.frogSum}>Average weight in grams: {frogAverage}</div>
      <div className={Styles.paragraph}>How might we redesign the model to allow for new frogs to be born on a manually set schedule?</div>
      <div className={Styles.paragraph}>We could add another variable like n to represent days and say that a new frog is born every n amount of days.</div>
    </animated.div>
  );
};