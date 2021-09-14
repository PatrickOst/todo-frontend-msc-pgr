import React, { Component } from 'react'
import { createNewNote, NotesUrl } from '../../models/note'
import { Button } from '../controls/Button'
import { TextInput } from '../controls/TextInput'
import DateTimePicker from 'react-datetime-picker';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment"
import 'moment/locale/de';


export class NoteDetails extends Component {

	state = {
		loading: false,
		note: createNewNote(),
	}

	async componentDidMount() {
		const id = this.props.match.params.id
		if (id) {
			this.fetchNote(id)
		}
	}

	async componentDidUpdate(prevProps) {

	}

	fetchNote = async id => {
		this.setState({ loading: true })
		const response = await fetch(`${NotesUrl}/${id}`)
		const note = await response.json()
		this.setState({ loading: false, note})
	}


	updateDateTime = property => value => {
		console.log("update ausgeführt");
		console.log(property);
		console.log(moment(value).format("YYYYMMDDThhmmss"));
		const DateTimeConverted = moment(value).format("YYYYMMDDThhmmss")
		console.log(DateTimeConverted);
		//console.log(moment(moment(value).format()));
		const updatedNote = Object.assign(this.state.note, {
			[property]: DateTimeConverted
		})
		this.setState({ note: updatedNote })
		console.log(updatedNote)
	}

	update = property => value => {
		console.log("update ausgeführt");
		console.log(value);
		const updatedNote = Object.assign(this.state.note, {
			[property]: value
		})
		this.setState({ note: updatedNote })
		console.log(updatedNote);
	}

	save = async note => {
		console.log("Save ausgeführt");
		console.log();
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





	render() {
		const { loading, note, error } = this.state
		let inputProps = {
			//disabled: true
		};
		return (
			<div>
				<TextInput
					label="ID"
					value={note.id}
					disabled={true}
					onChange={this.update('id')}
				/>
				<div>Erstellungsdatum</div>
				<Datetime
					inputProps={inputProps}
					value={note.erstelltAm ? moment(note.erstelltAm) : moment()}
					initialValue={note.erstelltAm ? moment(note.erstelltAm) : moment()}
					onChange={this.updateDateTime("erstelltAm")}
				/>
				<TextInput
					label="Titel"
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
				<TextInput
					label="Prio"
					value={note.prio}
					disabled={loading}
					onChange={this.update('prio')}
				/>
				<div>Zu erledigen bis</div>
				<div>{note.erledigenBis}</div>
                <Datetime
					initialValue={moment(note.erledigenBis)}
					value={moment(note.erledigenBis)}
					onChange={this.updateDateTime("erledigenBis")}
				/>
					<Button disabled={loading} onClick={() => this.save(note)}>
						{note.id ? 'Speichern' : 'Erstellen'}
					</Button>
				<div>{error}</div>
			</div>
		)
	}
}
