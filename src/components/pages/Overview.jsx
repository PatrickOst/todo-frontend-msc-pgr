import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { NotesUrl } from '../../models/note'
import './Overview.css'
import StarRatings from "react-star-ratings";
import { CheckBox } from '../controls/CheckBox'
import {AppbarOverview} from "../widgets/AppbarOverview";

export class Overview extends Component {
	render() {
		return(
			<div>
				<AppbarOverview />
				<NotesOverview />
			</div>
		);
	}
}

export class NotesOverview extends Component {

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

	getSortedAndFilteredNotes(notes){
		if(localStorage.getItem("showFinished") === 'on'){
			if(localStorage.getItem("sortedBy") === 'finishDate'){
				return notes.filter(a => a.erledigt === true).sort((a, b) => a.erledigenBis > b.erledigenBis ? 1:-1);
			} else if(localStorage.getItem("sortedBy") === 'createdDate'){
				return notes.filter(a => a.erledigt === true).sort((a, b) => a.erstelltAm > b.erstelltAm ? 1:-1);
			} else{
				return notes.filter(a => a.erledigt === true).sort((a, b) => a.prio < b.prio ? 1:-1);
			}
		} else{
			if(localStorage.getItem("sortedBy") === 'finishDate'){
				return notes.sort((a, b) => a.erledigenBis > b.erledigenBis ? 1:-1);
			} else if(localStorage.getItem("sortedBy") === 'createdDate'){
				return notes.sort((a, b) => a.erstelltAm > b.erstelltAm ? 1:-1);
			} else{
				return notes.sort((a, b) => a.prio < b.prio ? 1:-1);
			}
		}
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

	textErledigenBis (pDate) {
		const dateFormat = new Date(pDate);
		switch (dateFormat.getDate()){

			case (new Date().getDate()):    pDate = "Heute";         break;
			case (new Date().getDate()+1):  pDate = "Morgen";        break;
			case (new Date().getDate()+2):  pDate = "Übermorgen";    break;
			case (new Date().getDate()-1):  pDate = "Gestern";       break;
			case (new Date().getDate()-2):  pDate = "Vorgestern";    break;
			default: {
				const heute = new Date();
				if(dateFormat < heute){
					pDate = "Überfällig";
				}else{
					pDate = "Irgendwann";
				}
			}
		}
		return pDate;
	}


	render() {
		const { notes } = this.state
		return (
			<div className="overview__container">
				{this.getSortedAndFilteredNotes(notes).map(u => (
					<Fragment key={u.id}>
						<div className="singlenote__container">
							<div className="finishdate__container">{this.textErledigenBis(u.erledigenBis)}</div>
							<input className="note-title__container" type='text' name='title' placeholder='Note title' value={u.title} readOnly></input>
							<div className="starratings__container">
								<StarRatings
									rating={Number(u.prio)}
									starRatedColor="MediumSeaGreen"
									starEmptyColor="grey"
									starHoverColor="MediumSeaGreen"
									starDimension="15px"
									numberOfStars={5}
									name='rating'
								/>
							</div>
							<CheckBox
								className="finishedbox__container"
								value={u.erledigt}
								checked = {u.erledigt}
								onChange={this.updateErledigt(u.id)}
							/>
							<textarea className="note-description__container" type='text' placeholder='Note text' value={u.beschreibung} readOnly></textarea>
							<Link to={`/note/${u.id}`} className="modifynote__container">Bearbeiten</Link>
						</div>
					</Fragment>
				))}
			</div>
		);
	}
}

