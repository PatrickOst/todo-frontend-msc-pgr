import React from 'react'
import { NavLink } from 'react-router-dom'
import './Appbar.css'

export const Appbar = () => (
	<nav className="appbar__nav">
		<NavLink
			to="/"
			className="appbar__link"
			activeClassName="appbar__link--active"
			exact
		>
			Übersicht
		</NavLink>
		<NavLink
			to="/newNote"
			className="appbar__link"
			activeClassName="appbar__link--active"
			exact
		>
			Create Note
		</NavLink>
	</nav>
)
