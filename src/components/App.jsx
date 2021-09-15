import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import './App.css'
import { Overview } from './pages/Overview'
import { NoteDetails } from './pages/NoteDetails'
import { Appbar } from './widgets/Appbar'

export const App = () => (
	<div>
		<Appbar />
		<main className="app__main">
			<Switch>
				<Route exact path="/" component={Overview} />
				<Route key="modify-note" exact path="/note/:id" component={NoteDetails} />
				<Route key="new-note" exact path="/newNote" component={NoteDetails} />
				<Redirect to="/" />
			</Switch>
		</main>
	</div>
)
