import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import style from './styles/style.css';

import './scripts/config/Config.js';
document.getElementById("app").className = style.app;
ReactDOM.render(
    <AppRouter/>,
    document.getElementById("app")
);
