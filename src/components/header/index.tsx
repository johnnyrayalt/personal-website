import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

const Header: FC = (): JSX.Element => {
	return (
		<div className='name-container'>
			<NavLink className='link' to='/'>
				&#x263B; Johnny_Ray_Alt: ~/ website.exe
			</NavLink>
		</div>
	)
}

export default Header
