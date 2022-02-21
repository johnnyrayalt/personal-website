import React, { FC, useState } from 'react'
import { BooleanObj } from '../../types/BooleanObj'
import { EXPANDED_STATE_KEYS } from '../../assets/constants'
import { NavLink } from 'react-router-dom'
import './styles.css'

const Navigation: FC = (): JSX.Element => {
	const defaultExpanded: BooleanObj = {
		socials: false,
	}

	const [expanded, setExpanded] = useState<BooleanObj>(defaultExpanded)

	const handleChangeExpanded = (stateToChange: string): void => {
		switch (stateToChange) {
		case (EXPANDED_STATE_KEYS.SOCIALS):
			return !expanded.socials
				? setExpanded({ socials: true })
				: setExpanded({ socials: false })
		}
	}

	const resetExpandedOnClick = (): void => {
		setExpanded(defaultExpanded)
	}

	return (
		<div id='navigation-container'>
			<div className='navigation-links-container'>
				<nav>
					<ul className='nav-ul'>
						<li className='nav-li'>
							<NavLink onClick={() => resetExpandedOnClick()} className='link' to='/about'>
								.about()
							</NavLink>
						</li>
						<li className='nav-li'>
							<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.SOCIALS)} className='link btn'>
								.contacts(↳)
							</button>
							{expanded.socials && (
								<ul className='sub-nav-ul'>
									<li className='sub-nav-li'>
										<a
											className='link'
											href='https://linkedin.com/in/johnnyrayalt'
											rel='noopener noreferrer'
											target='_blank'
											onClick={() => resetExpandedOnClick()}
										>
											.linkedin(&#x02197;)
										</a>
									</li>
									<li className='sub-nav-li'>
										<a
											className='link'
											href='mailto:johnnyrayalt@gmail.com'
											onClick={() => resetExpandedOnClick()}
										>
											.email(&#x02197;)
										</a>
									</li>
								</ul>
							)}
						</li>
						<li className='nav-li'>
							<a className='link' href='https://github.com/johnnyrayalt' rel='noopener noreferrer' target='_blank'>
								.github(&#x02197;)
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default Navigation
