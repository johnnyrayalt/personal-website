import React, { FC, useState } from 'react';
import Link from 'next/link';
import { BooleanObj } from '../../../types/BooleanObj';
import { EXPANDED_STATE_KEYS, IMAGE_ROOTS } from '../../../assets/constants';

const Navigation: FC = (): JSX.Element => {
	const defaultExpanded: BooleanObj = {
		works: false,
		socials: false,
		main: false,
	}

	const [expanded, setExpanded] = useState<BooleanObj>(defaultExpanded);

	const handleChangeExpanded = (stateToChange: string): void =>
		setExpanded({
			[stateToChange.toLocaleLowerCase()]: !expanded[stateToChange.toLocaleLowerCase()]
		})

	const resetExpandedOnClick = (): void =>
		setExpanded(defaultExpanded);

	return (
		<div id='navigation-container'>
			<div className='navigation-links-container'>
				<nav>
					<ul className='nav-ul'>
						<li className='nav-li'>
							<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.WORKS)} className='link btn'>
								works(↳)
							</button>
							{expanded.works && (
								<ul className='sub-nav-ul'>
									<li className='sub-nav-li'>
										<Link href={`/projects/${IMAGE_ROOTS.art}`} passHref>
											<div className='sub-nav-link link' onClick={() => resetExpandedOnClick()}>
												.art(→);
											</div>
										</Link>
									</li>
									<li className='sub-nav-li'>
										<Link href={`/projects/${IMAGE_ROOTS.professional}`} passHref>
											<div className='sub-nav-link link' onClick={() => resetExpandedOnClick()}>
												.professional(→);
											</div>
										</Link>
									</li>
								</ul>
							)}
						</li>
						<li className='nav-li'>
							<Link href={`/about`} passHref>
								<div>about(→);</div>
							</Link>
						</li>
						<li className='nav-li'>
							<button onClick={() => handleChangeExpanded(EXPANDED_STATE_KEYS.SOCIALS)} className='link btn'>
								contacts(↳)
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
											.linkedin(&#x02197;);
										</a>
									</li>
									<li className='sub-nav-li'>
										<a
											className='link'
											href='mailto:johnnyrayalt@gmail.com'
											onClick={() => resetExpandedOnClick()}
										>
											.email(&#x02197;);
										</a>
									</li>
								</ul>
							)}
						</li>
						<li className='nav-li'>
							<a className='link' href='https://github.com/johnnyrayalt' rel='noopener noreferrer' target='_blank'>
								github(&#x02197;);
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Navigation;