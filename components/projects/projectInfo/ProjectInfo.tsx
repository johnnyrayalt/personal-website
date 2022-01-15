import React, { FC, useEffect, useState } from 'react';
import { Schema } from '../../../assets/constants';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	details: Schema;
}

const ProjectInfo: FC<Props> = (Props): JSX.Element => {
	const { details } = Props;

	const [projectDetails, setProjectDetails] = useState<(JSX.Element | JSX.Element[])[]>([]);

	const assembleDetails = (assembleDetailsDetails: {name: string, year: string}): JSX.Element[] => {
		return Object.keys(assembleDetailsDetails).map((detail: string) => (
			<li key={uuidv4()} className='project-details-li-item text'>
				{`${detail}: ${details[detail as keyof Schema]},`}
			</li>
		));
	}

	const assembleDescription = (assembleDescriptionDetails: string[]): JSX.Element => {
		return (
			<li key={uuidv4()} className='project-details-li-item text'>
				<span>{'description: ['}</span>
				{assembleDescriptionDetails.map((desc: string): JSX.Element => (
						<p key={uuidv4()}>
							{`"${desc}"`}
						</p>
				))}
				<span>{'],'}</span>
			</li>
		)
	}

	const assembleLink = (link: string) => {
		return (
			<li key={uuidv4()} className='project-details-li-item text'>
				<a
					className='link text'
					href={`https://${link}/`}
					target='_blank'
					rel='noreferrer'
				>
					link: {link},
				</a>
			</li>
		)
	}

	useEffect(() => {
		if (!details) return;

		const assembleProjectDetails = (): (JSX.Element | JSX.Element[])[] => {
			const assembledDetailsArray = [
				assembleDetails({ name: details.name, year: details.year }),
				assembleDescription(details.description)
			]

			if (details.link) assembledDetailsArray.push(assembleLink(details.link))

			return assembledDetailsArray;
		};

		setProjectDetails(assembleProjectDetails());
	}, [details])

	return (
		<div className='project-details-container'>
				{projectDetails}
		</div>
	)
}

export default ProjectInfo;