import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { animated } from 'react-spring';
import Styles from 'styles/ReactQuestions.css';

const reactStringComponent = `
  function StringInput() {
    return <input type="text" />
  };
`;

const reactReverseComponent = `
  function ReverseString({string}) { 
    return <div>{string.split("").reverse().join("")}</div>
  };
`;

const reactContainComponent = `
  function AnotherComponent() { 
    return (
      <div>
        <StringInput />
        <ReverseString string={'Hello World'} />
      </div>
    );
  };
`;

const zipCodeString = `
// The backend in node js that calculates the distance using the zip code database.
exports.init = function (req, res) {

  const csv = require('csvtojson'); // Library used to parse csv to json
  const filePath = '/home/deploy/mellocloud/api/files/free-zipcode-database.csv';

  csv() // Parse csv file to a javascript array of objects
  .fromFile(filePath) // File location from above
  .then(data => {
    const zipCodeOne = req.body.zipCodeOne;
    const zipCodeTwo = req.body.zipCodeTwo;
    const filteredZipCodeArray = data.filter(zipObj => zipObj.Zipcode === zipCodeOne || zipObj.Zipcode === zipCodeTwo); // Since data is now an array of object I can filter out the objects with the zipcodes I need.
    const zipCodeOneObj = filteredZipCodeArray.find(x => x.Zipcode === zipCodeOne); // Since one zip code can return multiple locations I use find to grab the first one because the long and lat will be the same for the zipcode.
    const zipCodeTwoObj = filteredZipCodeArray.find(x => x.Zipcode === zipCodeTwo); // Same for the second zip code.

    if (zipCodeOneObj === undefined || zipCodeTwoObj === undefined) { // If any of the two zip codes is undefined respond with an error.

      res.json({error: true, message: 'One or more of the zip codes are invalid, please double check and try again.'});
      
    } else {

      //Haversine formula to calculate distance in miles between two longitudes and latitudes.

      function toRadians(coordinate) {
        return Math.PI / 180 * coordinate;
      };
      
      const radiusInMiles = 3958.8; // You can also pass the radius of the earth in kilometers (6,371) and you get the distance between two points in kilometers.
      const radian1 = toRadians(zipCodeOneObj.Lat);
      const radian2 = toRadians(zipCodeTwoObj.Lat);
      const deltaLat = toRadians(zipCodeTwoObj.Lat - zipCodeOneObj.Lat);
      const deltaLong = toRadians(zipCodeTwoObj.Long - zipCodeOneObj.Long);
  
      const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(radian1) * Math.cos(radian2) *
              Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
      const d = radiusInMiles * c;
      
      //Respond with city state and distance in miles.
      res.json({distance:
          The distance between zipCodeOneObj.City, zipCodeOneObj.State and // This is a template string didnt write here because it messed with the markdown
          zipCodeTwoObj.City, zipCodeTwoObj.State is d.toFixed(2) miles. // This is a template string didnt write here because it messed with the markdown
      });
    };
  });
};
`

function ReverseString({string}) {
  return <div>{string.split("").reverse().join('')}</div>
};

export function ReactQuestions({style, className}) {
  const [text, setText] = useState('Hello World');
  const [loading, setLoading] = useState(false);
  const [zipCodeOne, setZipCodeOne] = useState('');
  const [zipCodeTwo, setZipCodeTwo] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

  function handleChange(e) {
    if (e.target.value === '') {
      setText('Hello World');
      return;
    };
    setText(e.target.value);
  };

  function distanceBetweenZipCodes() {
    if (loading) return;
    setError('');
    setResponse('');
    const zipCodeOneParsed = parseInt(zipCodeOne);
    const zipCodeTwoParsed = parseInt(zipCodeTwo);
    if (isNaN(zipCodeOneParsed) || isNaN(zipCodeTwoParsed)) {
      setError('Zipcodes must be a numbers.');
      return;
    };

    //https://api.mellocloud.com/zipcodes
    //http://localhost:3001/zipcodes

    setLoading(true);
    fetch('https://api.mellocloud.com/zipcodes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ zipCodeOne, zipCodeTwo })
    }).then(response => {
      return response.json()
    }).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message)
      } else {
        setResponse(response.distance);
      };
    }).catch(err => {
      setLoading(false);
      setError(err);
    });
  };

  function handleZipCodeOne (e) {
    setZipCodeOne(e.target.value);
  };

  function handleZipCodeTwo (e) {
    setZipCodeTwo(e.target.value);
  };

  return (
    <animated.div style={style} className={className}>
      <div className={Styles.heading}>React Questions:</div>
      <div className={Styles.paragraph}>Create three components:</div>
      <div className={Styles.paragraph}>The first component is an input for a string.</div>
      <SyntaxHighlighter style={monokai}>
        {reactStringComponent}
      </SyntaxHighlighter> 
      <div className={Styles.paragraph}>The second component accepts a string as a prop and displays it reversed. Eg. “Hello World” becomes “dlroW olleH”.</div>
      <div className={Styles.paragraph}>So below I just use some higher order functions. Split pushes each character into an array and reverse will reverse the array then join will concatenate each item in the reversed array.</div> 
      <SyntaxHighlighter style={monokai}>
        {reactReverseComponent}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>Try for yourself.</div>
      <div className={Styles.inputContainer}>
        <input className={Styles.input} type='text' onChange={handleChange} placeholder='Hello World'/>
        <ReverseString string={text} />
      </div>
      <div className={Styles.paragraph}>The third component contains the first two.</div>
      <SyntaxHighlighter language="react" style={monokai}>
        {reactContainComponent}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>Create a React App that accepts two zipcodes and outputs the distance between them in miles.</div>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {zipCodeString}
      </SyntaxHighlighter>
      <div className={Styles.paragraph}>Try it for yourself.</div>
      <div className={Styles.error}>{error}</div>
      <div className={Styles.response}>{response}</div>
      <div className={Styles.inputContainer}>
        <label>Zip code one:</label>
        <input type='text' onChange={handleZipCodeOne} value={zipCodeOne} className={Styles.input2} placeholder='02370' />
      </div>
      <div className={Styles.inputContainer}>
        <label>Zip code Two:</label>
        <input type='text' onChange={handleZipCodeTwo} value={zipCodeTwo} className={Styles.input2} placeholder='02018' />
      </div>
      <div className={Styles.buttonContainer}>
        <div className={Styles.button} onClick={distanceBetweenZipCodes}>Check Distance</div>
        {loading && <div className={Styles.loader}></div>}
      </div>
    </animated.div>
  );
};