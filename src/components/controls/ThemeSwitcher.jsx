import React from 'react'
import './ThemeSwitcher.css'

export const ThemeSwitcher = ({ onChange, check, disabled, ...rest }) => (
	<div>
		<p className="theme-switcher-title__container">Dark | Light</p>
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
	</div>
)
