import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


// const arr =  [
//     {
//         rating: 4,
//     },
//     {
//         rating: 1,
//     },
//     {
//         rating: 9,
//     }
// ]
// console.log('arr',arr)

// const result = arr.sort((a,b) => {return b.rating - a.rating});

// console.log('result',result);


// [].slice(0,10).sort(solrting).map()