import React, { Component } from 'react'
import { createNewNote, NotesUrl } from '../../models/note'
import { Button } from '../controls/Button'
import { TextInput } from '../controls/TextInput'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment"
import 'moment/locale/de';
import StarRatings from 'react-star-ratings'
import {Link} from "react-router-dom";
import {AppbarNoteDetails} from "../widgets/AppbarNoteDetails";
import './NoteDetails.css'

export class NoteDetails extends Component {
	state = {
		loading: false,
		titleEmpty: true,
		note: createNewNote(),
	}

	async componentDidMount() {
		const id = this.props.match.params.id
		if (id) {
			this.fetchNote(id)
		}
		this.releaseOrLockSaveButton()
	}

	fetchNote = async id => {
		this.setState({ loading: true })
		const response = await fetch(`${NotesUrl}/${id}`)
		const note = await response.json()
		this.setState({ loading: false, note})
		this.releaseOrLockSaveButton()
	}

	update = property => value => {
		console.log("update ausgeführt");
		let DateTimeConverted = value
		if(property==='erledigenBis' || property==='erstelltAm'){
			DateTimeConverted = moment(value).format()
		}
		const updatedNote = Object.assign(this.state.note, {
			[property]: DateTimeConverted
		})
		this.setState({ note: updatedNote })
		this.releaseOrLockSaveButton()
	}

	releaseOrLockSaveButton(){
			this.setState({ titleEmpty: (this.state.note.title.length < 1 ? true : false) })
			console.log(this.state.titleEmpty);
	}

	renderTitleEmpty(){
		if(this.state.titleEmpty){
			return(
				<div className="title__required__message">Titel zwingend erforderlich !</div>
			)
		}else{
			return(
				<div></div>
			)
		}
	}

	save = async note => {
		console.log("save runs")
		this.setState({ error:'', loading: true })
		await fetch(`${NotesUrl}/${note.id ?? ''}`, {
			method: note.id ? 'put' : 'post',
			headers: new Headers({'content-type':'application/json'}),
			body: JSON.stringify(note)
		})
	}

	deleting = async note => {
		this.setState({ error:'', loading: true })
		await fetch(`${NotesUrl}/delete/${note.id ?? ''}`, {
			method: 'put',
			headers: new Headers({'content-type':'application/json'}),
			body: JSON.stringify(note)
		})
	}

	insertDateTimePicker = (target, value, disabled) => {
		if(value === ''){		// Unterscheidung neue Notiz oder bestehende bearbeiten
			value = moment();
			const DateTimeConverted = moment(value).format()
			Object.assign(this.state.note, {[target]: DateTimeConverted})
		}else{
			value = moment(value);
		}
		let inputProps = {
			disabled: disabled
		};
		return(
			<Datetime
				inputProps={inputProps}
				value={value}
				initialValue={value}
				onChange={this.update(target)}
			/>
		)
	}

	showDeleteButton = (note) => {
		if(note.id===''){
			return(
				<div></div>
			)
		}else{
			return(
				<Button  visible='false' disabled={this.state.loading} onClick={() => this.deleting(note)}>{'Löschen'}</Button>
			)
		}
	};

	render() {
		const { loading,titleEmpty, note, error } = this.state
		return (
			<div>
				<AppbarNoteDetails />
				<div className="notedetails__container">
					<TextInput
						value={note.id}
						disabled={true}
						onChange={this.update('id')}
						className="id__container"
					/>
					<div label="Erstellungsdatum" className="createdDate__container">{this.insertDateTimePicker("erstelltAm", note.erstelltAm, true)}</div>
					<TextInput
						label="Titel"
						required = {true}
						value={note.title}
						disabled={loading}
						onChange={this.update('title')}
						className="notedetails-title__container"
					/>
					<div>{this.renderTitleEmpty()}</div>
					<TextInput
						label="Beschreibung"
						value={note.beschreibung}
						disabled={loading}
						onChange={this.update('beschreibung')}
						className="notedetails-description__container"
					/>
					<div className="notedetails-starratings-title__container">Priorität</div>
					<StarRatings
						rating={Number(note.prio)}
						starRatedColor="MediumSeaGreen"
						starEmptyColor="grey"
						starHoverColor="MediumSeaGreen"
						starDimension="25px"
						changeRating={this.update('prio')}
						numberOfStars={5}
						name='rating'
						className="notedetails-starratings__container"
					/>
					<div className="notedetails-finishDate-title__container">Zu erledigen bis</div>
					<div className="notedetails-finishDate__container">{this.insertDateTimePicker("erledigenBis", note.erledigenBis, false)}</div>
					<Link to={`/`}>
						<Button disabled={titleEmpty} onClick={() => this.save(note)}>
							{note.id ? 'Speichern' : 'Erstellen'}
						</Button>
						{this.showDeleteButton(note)}
					</Link>

					<div>{error}</div>

				</div>
			</div>
		)
	}
}
