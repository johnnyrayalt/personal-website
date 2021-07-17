import React, { FC, useState } from 'react'
import { BooleanObj } from '../../types/BooleanObj'
import { EXPANDED_STATE_KEYS } from '../../assets/constants'
import { NavLink } from 'react-router-dom'
import './styles.css'

const Navigation: FC = (): JSX.Element => {
	const defaultExpanded: BooleanObj = {
		works: false,
		socials: false,
	}

	const [expanded, setExpanded] = useState<BooleanObj>(defaultExpanded)

	const handleChangeExpanded = (stateToChange: string): void => {
		switch (stateToChange) {
		case (EXPANDED_STATE_KEYS.WORKS):
			return !expanded.works ? setExpanded({
				works: true,
				socials: expanded.socials,
			}) : setExpanded({
				works: false,
				socials: expanded.socials,
			})
		case (EXPANDED_STATE_KEYS.SOCIALS):
			return !expanded.socials ? setExpanded({
				socials: true,
				works: expanded.works,
			}) : setExpanded({
				socials: false,
				works: expanded.works,
			})
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
							<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.WORKS)} className='link btn'>
								.works(↳)
							</button>
							{expanded.works && (
								<ul className='sub-nav-ul'>
									<li className='sub-nav-li'>
										<NavLink
											className='sub-nav-link link'
											to='/works/art'
											onClick={() => resetExpandedOnClick()}
										>
											.art()
										</NavLink>
									</li>
									<li className='sub-nav-li'>
										<NavLink
											className='sub-nav-link link'
											to='/works/professional'
											onClick={() => resetExpandedOnClick()}
										>
											.professional()
										</NavLink>
									</li>
								</ul>
							)}
						</li>
						<li className='nav-li'>
							<NavLink className='link' to='/about'>
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
