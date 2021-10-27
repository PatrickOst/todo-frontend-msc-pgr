
import React from "react";
import { render, screen} from '@testing-library/react'

import ReactDOM from 'react-dom'
import '../index.css'
import { App } from '../components/App'
import {BrowserRouter} from "react-router-dom";
import {Overview} from "../components/pages/Overview";

/*ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
 */


    test('render learn react link', () => {
        //console.log(document.getElementById('root'));

        console.log("Nach 5 Stunden zu zweit mussten wir wegen einem Render Problem (Target container is not a DOM element.) das Testing leider abbrechen. Durch unsere geringen Vorkenntnisse war das für uns nicht möglich. Auch das entfernen von ReactDOM hat leider nicht funktioniert.");
    });
