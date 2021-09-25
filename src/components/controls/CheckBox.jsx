import React from 'react'
import './CheckBox.css'

export const CheckBox = ({ onChange, label, disabled, ...rest }) => (
	<div>
		<label>
			<input
				className="checkbox__input"
				type="checkbox"
				onChange={e => onChange(e.target.checked)}
				{...rest}
			/>
		</label>
	</div>
)
