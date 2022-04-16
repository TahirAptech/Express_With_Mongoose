import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/User/Login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider } from 'react-redux';
import store from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TodoAddEditForm from './components/User/TodoAddEditForm';
import Todo from './components/User/Todo';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<App />} />
        <Route path='/Todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
//<Route path='*' element={<Navigate to="/" />} />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
