import React from 'react'
import { NavLink } from 'react-router-dom'
import './Appbar.css'
import {ThemeSwitcher} from "../controls/ThemeSwitcher";
import {CheckBox} from "../controls/CheckBox";


export class AppbarOverview extends React.Component {

	state = { darkFlag: [] }

	handleSortedByClick = (sortedBy) => {
		localStorage.setItem("sortedBy", sortedBy);
	}

	handleShowFinishedClick (){
		if(localStorage.getItem("showFinished") === null || localStorage.getItem("showFinished") === "off"){
			localStorage.setItem("showFinished", "on")}
		else{
			localStorage.setItem("showFinished", "off");
		}
	}

	render() {
		return (
			<div className="appbar__container">
				<nav className="appbar__nav">
					<NavLink
						to="/newNote"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						Create Note
					</NavLink>
					<NavLink
						onClick={this.handleSortedByClick.bind(this,"finishDate")}
						to="/"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						By finish Date
					</NavLink>
					<NavLink
						onClick={this.handleSortedByClick.bind(this,"createdDate")}
						to="/"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						By created Date
					</NavLink>
					<NavLink
						onClick={this.handleSortedByClick.bind(this, "Importance")}
						to="/"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						By Importance
					</NavLink>
					<NavLink
						to="/"
						onClick={this.handleShowFinishedClick.bind(this)}
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						Show finished
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


