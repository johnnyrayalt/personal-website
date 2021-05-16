import { gsap } from 'gsap';
import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { EXPANDED_STATE_KEYS } from '../../assets/constants';
import { eyeColor, lashGroups, topLid } from '../../assets/eye.svg.constants';
import { BooleanObj } from '../../types/BooleanObj';
import EyeSvg from '../svg/eye.svg';
import './styles.css';

const MobileNav: FC = (): JSX.Element => {
	const defaultExpanded: BooleanObj = {
		main: false,
		works: false,
		socials: false,
	};

	const [expanded, setExpanded] = useState<BooleanObj>(defaultExpanded);
	const [eyeIsOpenOrClosed, setEyeIsOpenOrClosed] = useState<boolean>(true);

	const handleLashGroupAnimation = (): void => {
		gsap.fromTo('#lashGroup',
			{ attr: { stroke: (eyeIsOpenOrClosed) ? eyeColor.white : eyeColor.coral } },
			{ attr: { stroke: (eyeIsOpenOrClosed) ? eyeColor.coral : eyeColor.white } },
		);

		for (const lashGroup in lashGroups) {
			const y1Start = lashGroups[lashGroup].y1.start;
			const y2Start = lashGroups[lashGroup].y2.start;
			const y1End = lashGroups[lashGroup].y1.end;
			const y2End = lashGroups[lashGroup].y2.end;

			gsap.fromTo(
				`#${lashGroup}`,
				{
					attr: {
						y1: (eyeIsOpenOrClosed) ? y1Start : y1End,
						y2: (eyeIsOpenOrClosed) ? y2Start : y2End,
					},
				},
				{
					attr: {
						y1: (eyeIsOpenOrClosed) ? y1End : y1Start,
						y2: (eyeIsOpenOrClosed) ? y2End : y2Start,
					},
				});
		}
	};

	const handleRemovingIris = (): void => {
		gsap.fromTo(
			'#eyeballGroup',
			{ attr: { opacity: (eyeIsOpenOrClosed) ? 1 : 0 } },
			{ attr: { opacity: (eyeIsOpenOrClosed) ? 0 : 1 } },
		);
	};

	const handleLipOpenOrClose = (): void => {
		gsap.fromTo(
			topLid.id,
			{
				attr: {
					d: (eyeIsOpenOrClosed) ? topLid.start : topLid.end,
					stroke: (eyeIsOpenOrClosed) ? eyeColor.white : eyeColor.coral,
				},
			},
			{
				attr: {
					d: (eyeIsOpenOrClosed) ? topLid.end : topLid.start,
					stroke: (eyeIsOpenOrClosed) ? eyeColor.coral : eyeColor.white,
				},
			},
		);
	};

	const handleOpenClose = (): void => {
		if (eyeIsOpenOrClosed) {
			setEyeIsOpenOrClosed(false);
			handleLipOpenOrClose();
			handleLashGroupAnimation();
			handleRemovingIris();
		} else {
			setEyeIsOpenOrClosed(true);
			handleLipOpenOrClose();
			handleLashGroupAnimation();
			handleRemovingIris();
		}
	};

	const handleChangeExpanded = (stateToChange: string): void => {
		switch (stateToChange) {
			case (EXPANDED_STATE_KEYS.MAIN):
				return !expanded.main ? setExpanded({
					main: true,
					works: false,
					socials: false,
				}) : setExpanded({
					main: false,
					works: false,
					socials: false,
				});
			case (EXPANDED_STATE_KEYS.WORKS):
				return !expanded.works ? setExpanded({
					works: true,
					main: true,
					socials: expanded.socials,
				}) : setExpanded({
					works: false,
					main: expanded.main,
					socials: expanded.socials,
				});
			case (EXPANDED_STATE_KEYS.SOCIALS):
				return !expanded.socials ? setExpanded({
					socials: true,
					main: true,
					works: expanded.works,
				}) : setExpanded({
					socials: false,
					main: expanded.main,
					works: expanded.works,
				});
		}
	};

	const resetExpandedOnClick = (): void => {
		setExpanded(defaultExpanded);
		handleOpenClose();
	};

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
									<div className='mobile-link'>
										<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.WORKS)}
														className='mobile-link mobile-btn'>
											.works(↳)
										</button>

									</div>
									{expanded.works && (
										<ul className='mobile-sub-nav-ul'>
											<li className='mobile-sub-nav-li'>
												<NavLink
													className='mobile-sub-nav-link mobile-link fade-in'
													to='/works/art'
													onClick={() => resetExpandedOnClick()}
												>
													.art()
												</NavLink>
											</li>
											<li className='mobile-sub-nav-li'>
												<NavLink
													className='mobile-sub-nav-link mobile-link fade-in'
													to='/works/professional'
													onClick={() => resetExpandedOnClick()}
												>
													.professional()
												</NavLink>
											</li>
										</ul>
									)}
								</li>
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
									<a className='mobile-link' href='https://github.com/johnnyrayalt'
										 rel='noopener noreferrer' target='_blank'>
										.github(&#x02197;)
									</a>
								</li>
							</ul>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default MobileNav;