import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { NotesUrl } from '../../models/note'
import './Overview.css'
import StarRatings from "react-star-ratings";
import { CheckBox } from '../controls/CheckBox'
import {NoteDetails} from "./NoteDetails";
import moment from "moment";

export class Overview extends Component {
	state = { notes: [] }

	async componentDidMount() {
		const response = await fetch(NotesUrl)
		const notes = await response.json()
		this.setState({ notes })
	}

	getIndexOfId(id){
		let index = 0;
		for(let i=0; i<this.state.notes.length; i++){
			if(id === this.state.notes[i].id){
				index = i;
				break
			}
		}
		return index
	}

	save = async (index) => {
		const { notes } = this.state
		const response = await fetch(`${NotesUrl}/${notes[index]}`, {
			method: 'put',
			headers: new Headers({'content-type':'application/json'}),
			body: JSON.stringify(notes[index])
		})
		if (response.status >= 300) {
			console.log("fehler aufgetreten")
		} else {
			console.log("speichern erfolgreich")
		}
	}

	updateErledigt = id => value => {
		let index = this.getIndexOfId(id)
		const updatedNote = Object.assign(this.state.notes[index], {
			erledigt: value
		})
		this.setState({ note: updatedNote })
		this.save(index)
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
						<StarRatings
							rating={Number(u.prio)}
							starRatedColor="MediumSeaGreen"
							starEmptyColor="grey"
							starHoverColor="MediumSeaGreen"
							starDimension="15px"
							numberOfStars={5}
							name='rating'
						/>
						<div>{u.erledigenBis}</div>
						<Link to={`/note/${u.id}`}>Bearbeiten</Link>
						<CheckBox
							value={u.erledigt}
							checked = {u.erledigt}
							onChange={this.updateErledigt(u.id)}
						/>
					</Fragment>
				))}
			</div>
		)
	}
}