import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { NotesUrl } from '../../models/note'
import './Overview.css'
import StarRatings from "react-star-ratings";

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
					</Fragment>
				))}
			</div>
		)
	}
}
