import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { NotesUrl } from '../../models/note'
import './Overview.css'


export class Overview extends Component {
	state = { notes: [] }

	async componentDidMount() {
		const response = await fetch(NotesUrl)
		const notes = await response.json()
		this.setState({ notes })
	}

	render() {
		const { notes } = this.state

		return (
			<div className="overview__container">
				{notes.map(u => (
					<Fragment key={u.id}>
						<div>{u.id}</div>
						<div>{u.title}</div>
						<div>{u.beschreibung}</div>
						<div>{u.erstelltAm}</div>
						<div>{u.prio}</div>
						<div>{u.erledigenBis}</div>
						<Link to={`/users/${u.id}`}>Bearbeiten</Link>
					</Fragment>
				))}
			</div>
		)
	}
}
