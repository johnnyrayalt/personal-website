import EyeSvg from '../svg/eye.svg'
import React, { FC, useState } from 'react'
import { BooleanObj } from '../../types/BooleanObj'
import { EXPANDED_STATE_KEYS } from '../../assets/constants'
import { eyeColor, lashGroups, topLid } from '../../assets/eye.svg.constants'
import { gsap } from 'gsap'
import { NavLink } from 'react-router-dom'
import './styles.css'

const MobileNav: FC = (): JSX.Element => {
	const defaultExpanded: BooleanObj = {
		main: false,
		socials: false,
	}

	const [expanded, setExpanded] = useState<BooleanObj>(defaultExpanded)
	const [eyeIsOpen, setEyeIsOpen] = useState<boolean>(true)

	const handleLashGroupAnimation = (): void => {
		gsap.fromTo('#lashGroup',
			{ attr: { stroke: (eyeIsOpen) ? eyeColor.white : eyeColor.coral } },
			{ attr: { stroke: (eyeIsOpen) ? eyeColor.coral : eyeColor.white } },
		)

		for (const lashGroup in lashGroups) {
			const y1Start = lashGroups[lashGroup].y1.start
			const y2Start = lashGroups[lashGroup].y2.start
			const y1End = lashGroups[lashGroup].y1.end
			const y2End = lashGroups[lashGroup].y2.end

			gsap.fromTo(
				`#${lashGroup}`,
				{
					attr: {
						y1: (eyeIsOpen) ? y1Start : y1End,
						y2: (eyeIsOpen) ? y2Start : y2End,
					},
				},
				{
					attr: {
						y1: (eyeIsOpen) ? y1End : y1Start,
						y2: (eyeIsOpen) ? y2End : y2Start,
					},
				})
		}
	}

	const handleRemovingIris = (): void => {
		gsap.fromTo(
			'#eyeballGroup',
			{ attr: { opacity: (eyeIsOpen) ? 1 : 0 } },
			{ attr: { opacity: (eyeIsOpen) ? 0 : 1 } },
		)
	}

	const handleLipOpenOrClose = (): void => {
		gsap.fromTo(
			topLid.id,
			{
				attr: {
					d: (eyeIsOpen) ? topLid.start : topLid.end,
					stroke: (eyeIsOpen) ? eyeColor.white : eyeColor.coral,
				},
			},
			{
				attr: {
					d: (eyeIsOpen) ? topLid.end : topLid.start,
					stroke: (eyeIsOpen) ? eyeColor.coral : eyeColor.white,
				},
			},
		)
	}

	const handleOpenClose = (): void => {
		if (eyeIsOpen) {
			setEyeIsOpen(false)
			handleLipOpenOrClose()
			handleLashGroupAnimation()
			handleRemovingIris()
		} else {
			setEyeIsOpen(true)
			handleLipOpenOrClose()
			handleLashGroupAnimation()
			handleRemovingIris()
		}
	}

	const handleChangeExpanded = (stateToChange: string): void => {
		switch (stateToChange) {
		case (EXPANDED_STATE_KEYS.MAIN):
			return !expanded.main ? setExpanded({
				main: true,
				socials: false,
			}) : setExpanded({
				main: false,
				socials: false,
			})
		case (EXPANDED_STATE_KEYS.SOCIALS):
			return !expanded.socials ? setExpanded({
				socials: true,
				main: true,
			}) : setExpanded({
				socials: false,
				main: expanded.main,
			})
		}
	}

	const resetExpandedOnClick = (): void => {
		setExpanded(defaultExpanded)
		handleOpenClose()
	}

	return (
		<div id='mobile-navigation-container'>
			<div
				className={`mobile-navigation-links-container ${!expanded.main ? 'mobile-closed-nav' : 'mobile-open-nav'}`}>
				<nav>
					<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.MAIN)}
						className='mobile-main-nav-btn mobile-link mobile-btn'>
						<div style={{ height: '60px', width: '100%', margin: 'auto 0', padding: '0' }} onClick={handleOpenClose}>
							<EyeSvg />
						</div>
					</button>
					<div className={`${!expanded.main ? 'fade-out' : 'fade-in'}`}>
						{expanded.main && (
							<ul className='mobile-nav-ul'>
								<li className='mobile-nav-li'>
									<NavLink onClick={() => resetExpandedOnClick()} className='mobile-link' to='/about'>
										.about()
									</NavLink>
								</li>
								<li className='mobile-nav-li'>
									<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.SOCIALS)}
										className='mobile-link mobile-btn'>
										.contacts(↳)
									</button>
									{expanded.socials && (
										<ul className='mobile-sub-nav-ul'>
											<li className='mobile-sub-nav-li'>
												<a
													className='mobile-sub-nav-link mobile-link fade-in'
													href='https://linkedin.com/in/johnnyrayalt'
													rel='noopener noreferrer'
													target='_blank'
													onClick={() => resetExpandedOnClick()}
												>
													.linkedin(&#x02197;)
												</a>
											</li>
											<li className='mobile-sub-nav-li'>
												<a
													className='mobile-sub-nav-link mobile-link fade-in'
													href='mailto:johnnyrayalt@gmail.com'
													onClick={() => resetExpandedOnClick()}
												>
													.email(&#x02197;)
												</a>
											</li>
										</ul>
									)}
								</li>
								<li className='mobile-nav-li'>
									<a
										className='mobile-link'
										href='https://github.com/johnnyrayalt'
										rel='noopener noreferrer'
										target='_blank'
									>
										.github(&#x02197;)
									</a>
								</li>
							</ul>
						)}
					</div>
				</nav>
			</div>
		</div>
	)
}

export default MobileNav