import {NavLink} from "react-router-dom";
import {ThemeSwitcher} from "../controls/ThemeSwitcher";
import React from "react";

export class AppbarNoteDetails extends React.Component {

    state = { darkFlag: [] }

    render() {
        return (
            <div className="appbar-notedetails__container">
                <nav className="appbar-notedetails__nav">
                    <NavLink
                        to="/"
                        className="appbar-home__link"
                        activeClassName="appbar__link--active"
                        exact
                    >
                        HOME
                    </NavLink>
                </nav>
                <ThemeSwitcher
                    defaultChecked = {this.getTheme()}
                    onChange={this.handleThemeSwitchClick("ThemeSwitcher")}
                />
            </div>

        );
    }

    getTheme(){
        document.body.classList.add(localStorage.getItem("theme").toString());
        return (localStorage.getItem("theme").toString()==="light" ? false : true)
    }

    handleThemeSwitchClick = control => value => {
        if (value === true){
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }


}