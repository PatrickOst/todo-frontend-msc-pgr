import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import './App.css'
import { Overview } from './pages/Overview'
import { NoteDetails } from './pages/NoteDetails'

export const App = () => (
	<div>
		<main className="app__main">
			<Switch>
				<Route key="Overview" exact path="/" component={Overview} />
				<Route key="Overview-delete" exact path="/" component={Overview} />
				<Route key="modify-note" exact path="/note/:id" component={NoteDetails} />
				<Route key="new-note" exact path="/newNote" component={NoteDetails} />
				<Redirect to="/" />
			</Switch>
		</main>
	</div>
)
