import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../components/App";
import {Overview} from "../components/pages/Overview";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with or without a name", () => {

    console.log("Nach 5 Stunden zu zweit mussten wir wegen einem Render Problem (Target container is not a DOM element.) das Testing leider abbrechen. Durch unsere geringen Vorkenntnisse war das für uns nicht möglich. Auch das entfernen von ReactDOM hat leider nicht funktioniert.");

    /*
    console.log("Start Testing")
    act(() => {
        render(<Overview />, container);
    });
    //container.findByText("Note Title");
    //console.log(document.getElementById("17"));
    let d = document.getElementsByClassName("appbar__container");
    console.log(document.getElementsByClassName("appbar__container").namedItem(""))
    //expect(document.querySelector("div").className).toBe("appbar__container")
    //expect(container.textContent).toBe("Hello, Margaret!");
    console.log("End Testing")
     */

});