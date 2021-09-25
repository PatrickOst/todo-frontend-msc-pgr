import React from 'react'
import { NavLink } from 'react-router-dom'
import './Appbar.css'



export class Appbar extends React.Component {

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
			<div>
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
					<ThemeSwitcher />
				</nav>
			</div>

		);

	}
}

class ThemeSwitcher extends React.Component {

	handleThemeSwitchClick (){
		if (localStorage.getItem("theme") === null || localStorage.getItem("theme") === "light"){
			document.body.classList.remove("light");
			document.body.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}

	render(){
		return(
			<div className="toggle-switch__container">
				<p>Dark</p>
				<span>
				<label className="switch">
				<input onClick={this.handleThemeSwitchClick.bind(this)} id="theme-switch" type="checkbox"></input>
				<span className="slider round"></span>
				<p>Light</p>
				</label>
				</span>
			</div>
		);
	}
}

