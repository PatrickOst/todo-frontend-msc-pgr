import React from 'react'
import './TextInput.css'

export const ThemeSwitcher = ({ onChange, check, disabled, ...rest }) => (
	<div>
		<p>Dark</p>
		<span>
			<label className="switch">
					<p>{check}</p>
				<input
					id="theme-switch"
					type="checkbox"
					onChange={e => onChange(e.target.checked)}
					{...rest}
				/>
				<span className="slider round"></span>
			</label>
		</span>
		<p>Light</p>
	</div>

)
