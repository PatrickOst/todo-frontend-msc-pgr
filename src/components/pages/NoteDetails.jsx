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
	}

	save = async note => {
		console.log("save runs")
		this.setState({ error:'', loading: true })
		const response = await fetch(`${NotesUrl}/${note.id ?? ''}`, {
			method: note.id ? 'put' : 'post',
			headers: new Headers({'content-type':'application/json'}),
			body: JSON.stringify(note)
		})
		if (response.status >= 300) {
			this.setState({ error: 'Fehler aufgetreten!', loading: false })
		} else {
			const update = await response.json()
			const notes = Object.assign(this.state.note, update)
			this.setState({ error: 'Erfolgreich gespeichert', loading: false, notes })
		}
	}

	deleting = async note => {
		this.setState({ error:'', loading: true })
		const response = await fetch(`${NotesUrl}/delete/${note.id ?? ''}`, {
			method: 'put',
			headers: new Headers({'content-type':'application/json'}),
			body: JSON.stringify(note)
		})
		if (response.status >= 300) {
			this.setState({ error: 'Fehler aufgetreten!', loading: false })
		} else {
			const update = await response.json()
			const notes = Object.assign(this.state.note, update)
			this.setState({ error: 'Erfolgreich gelöscht', loading: false, notes })
		}
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
				<TextInput
					label="ID"
					value={note.id}
					disabled={true}
					onChange={this.update('id')}
				/>
				<div>Erstellungsdatum</div>
				<div>{this.insertDateTimePicker("erstelltAm", note.erstelltAm, true)}</div>
				<TextInput
					label="Titel"
					required = {true}
					value={note.title}
					disabled={loading}
					onChange={this.update('title')}
				/>
				<TextInput
					label="Beschreibung"
					value={note.beschreibung}
					disabled={loading}
					onChange={this.update('beschreibung')}
				/>
				<StarRatings
					rating={Number(note.prio)}
					starRatedColor="MediumSeaGreen"
					starEmptyColor="grey"
					starHoverColor="MediumSeaGreen"
					starDimension="25px"
					changeRating={this.update('prio')}
					numberOfStars={5}
					name='rating'
				/>
				<div>Zu erledigen bis</div>
				<div>{this.insertDateTimePicker("erledigenBis", note.erledigenBis, false)}</div>
				<Link to={`/`}>
					<Button disabled={titleEmpty} onClick={() => this.save(note)}>
						{note.id ? 'Speichern' : 'Erstellen'}
					</Button>
					{this.showDeleteButton(note)}
				</Link>
				<div>{error}</div>
			</div>
		)
	}
}
