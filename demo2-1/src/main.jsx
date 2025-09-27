import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const employees = [
  {name: "Jarles", salary: 1000},
  {name: "Carles", salary: 1200},
  {name: "Parles", salary: 1050},
  {name: "Selrap", salary: 5010},
  {name: "Selrac", salary: 5011},
];


ReactDOM.createRoot(document.getElementById('root'))
  .render(<App employees={employees}/>);
