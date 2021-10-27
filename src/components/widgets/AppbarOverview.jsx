import React from 'react'
import { NavLink } from 'react-router-dom'
import './Appbar.css'
import {ThemeSwitcher} from "../controls/ThemeSwitcher";


export class AppbarOverview extends React.Component {

	state = { darkFlag: [] }

	handleSortedByClick = (sortedBy) => {
		localStorage.setItem("sortedBy", sortedBy);
		if (localStorage.getItem("sortedBy") === "finishDate") {
			this.focusColor("appbar-sortedby-finishdate");
			this.revertColor("appbar-sortedby-createddate");
			this.revertColor("appbar-sortedby-importance");
		}
		else if (localStorage.getItem("sortedBy") === "createdDate"){
			this.focusColor("appbar-sortedby-createddate");
			this.revertColor("appbar-sortedby-finishdate");
			this.revertColor("appbar-sortedby-importance");
		}
		else if (localStorage.getItem("sortedBy") === "Importance"){
			this.focusColor("appbar-sortedby-importance");
			this.revertColor("appbar-sortedby-finishdate");
			this.revertColor("appbar-sortedby-createddate");
		}
	}

	handleShowFinishedClick (){
		if(localStorage.getItem("showFinished") === null || localStorage.getItem("showFinished") === "off"){
			localStorage.setItem("showFinished", "on")
			this.focusColor("appbar-showfinished");
		}
		else{
			localStorage.setItem("showFinished", "off");
			this.revertColor("appbar-showfinished");
		}
	}

	render() {
		return (
			<div className="appbar__container">
				<NavLink
					to="/newNote"
					className="appbar-createnote__link"
					activeClassName="appbar__link--active"
					exact
				>
					+
				</NavLink>
				<nav className="appbar__nav">
					<div className="appbar__sort-description">SORT BY</div>
					<NavLink
						onClick={this.handleSortedByClick.bind(this,"finishDate")}
						to="/"
						id="appbar-sortedby-finishdate"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						FINISH DATE
					</NavLink>
					<NavLink
						onClick={this.handleSortedByClick.bind(this,"createdDate")}
						to="/"
						id="appbar-sortedby-createddate"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						CREATED DATE
					</NavLink>
					<NavLink
						onClick={this.handleSortedByClick.bind(this, "Importance")}
						to="/"
						id="appbar-sortedby-importance"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						IMPORTANCE
					</NavLink>
					<div className="appbar__filter-description">FILTER</div>
					<NavLink
						to="/"
						onClick={this.handleShowFinishedClick.bind(this)}
						id="appbar-showfinished"
						className="appbar__link"
						activeClassName="appbar__link--active"
						exact
					>
						SHOW FINISHED
					</NavLink>
				</nav>
				<ThemeSwitcher
					className="appbar_themeSwitcher"
					defaultChecked = {this.getTheme()}
					onChange={this.handleThemeSwitchClick("ThemeSwitcher")}
				/>
			</div>

		);
	}

	getTheme(){

		document.body.classList.add(localStorage.getItem("theme"));
		console.log(localStorage.getItem("theme"));

		return (localStorage.getItem("theme")==="light" ? false : true)
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

	revertColor = function (element){
		document.getElementById(element).style.background = "none";
	}

	focusColor = function (element){
		document.getElementById(element).style.background = "#3C3F41";
	}
}

window.onload = function () {
	if (localStorage.getItem("theme") !== "dark" && localStorage.getItem("theme") !== "light"){
		document.body.classList.add("light");
		document.body.classList.remove("dark");
		localStorage.setItem("theme", "light");
		window.location.reload();
	}
}


