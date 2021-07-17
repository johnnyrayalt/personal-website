import React, { FC } from 'react'
import { IWorkObj } from '../../interfaces/IWorkObj'
import './styles.css'

interface Props {
	details: IWorkObj
}

const ProjectInfo: FC<Props> = (Props): JSX.Element => {
	const { details } = Props

	const mapDescription = (key: string): JSX.Element[] => {
		const descriptionArray: JSX.Element[] = []

		details.description.forEach((desc: string): void => {
			descriptionArray.push((
				<li key={desc} className='project-details-li-item'>
					<span className='text'>
						{`${key}: ${desc}`}
					</span>
				</li>
			))
		})

		return descriptionArray
	}

	const mapLink = (key: string): JSX.Element => (
		<li key={key} className='project-details-li-item'>
			<span className='text'> link:
				<a
					href={`https://${details.link}/`}
					style={{ marginLeft: '8px' }}
					target='_blank'
					rel='noreferrer'
					className='link'
				>
					{details.link}
				</a>
			</span>
		</li>
	)

	const mapFields = (key: string): JSX.Element => (
		<li key={key} className='project-details-li-item'>
			<span className='text'>
				{`${key}: ${details[key]}`}
			</span>
		</li>
	)

	const mapDetails = (): (JSX.Element | JSX.Element[])[] => {
		const arr: (JSX.Element | JSX.Element[])[] = []

		for (const key in details) {
			if (key !== 'description') {
				if (key === 'altText') break

				if (key === 'link') {
					arr.push(mapLink(key))
				} else {
					arr.push(mapFields(key))
				}
			} else {
				arr.push(mapDescription(key))
			}
		}
		return arr
	}

	return (
		<div className='project-details-container'>
			<span className='text brackets'>{'{'}</span>
			<ul>
				{mapDetails()}
			</ul>
			<span className='text brackets'>{'}'}</span>
		</div>
	)
}

export default ProjectInfo
