import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(

  <React.StrictMode>
    <App />
      <button id="my-button" className="button">Connect Backend</button>

  </React.StrictMode>,
  document.getElementById('root')

);

document.getElementById("my-button").addEventListener("click",myTestFunction)

async function myTestFunction(){
    console.log("fetch start");

    //fetch('http://example.com/movies.json')
     //   .then(response => response.json())
      //  .then(data => console.log(data));

    const response = await fetch('/api/todos')
    //const users = await response.json()
    //if(response.ok) this.setState({users})
    console.log(response);
    console.log("fetch end");
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
