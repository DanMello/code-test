import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { CSQuestions } from './CSQuestions';
import { JavaScriptQuestions } from './JavaScriptQuestions';
import { ReactQuestions } from './ReactQuestions';
import Styles from 'styles/App.css';

const Components = [
  ({ style }) => <CSQuestions style={style} className={Styles.container}/>,
  ({ style }) => <JavaScriptQuestions style={style} className={Styles.container}/>,
  ({ style }) => <ReactQuestions style={style} className={Styles.container}/>
];

export function App() {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)'},
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)'},
  });
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.heading}>Mediazact Code Test</div>
      <div className={Styles.navContainer}>
        <div
          className={index === 0 ? [Styles.navItem, Styles.activeNavItem].join(' ') : Styles.navItem} 
          onClick={() => setIndex(0)}
          >
          Computer Science
        </div>
        <div 
          className={index === 1 ? [Styles.navItem, Styles.activeNavItem].join(' ') : Styles.navItem} 
          onClick={() => setIndex(1)}
          >
          JavaScript
        </div>
        <div 
          className={index === 2 ? [Styles.navItem, Styles.activeNavItem].join(' ') : Styles.navItem} 
          onClick={() => setIndex(2)}
          >
          React
        </div>
      </div>
      <div className={Styles.contentContainer}>
        {transitions.map(({ item, props, key }) => {
          const Component = Components[item];
          return <Component key={key} style={props} />
        })}
      </div>
    </div>
  );
};