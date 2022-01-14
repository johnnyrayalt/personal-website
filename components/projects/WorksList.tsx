import React, { FC } from 'react';
import Link from 'next/link';
import { MONTHS, Schema } from '../../assets/constants';
import { useViewport } from '../../utils/useViewportHook';

interface Props {
	worksList: Schema[],
	worksRootIndex: string,
}

const WorksList: FC<Props> = (Props): JSX.Element => {
	const { worksList, worksRootIndex } = Props;
	const { width } = useViewport();
	const widthBreakPoint: number = 730;

	const fileName = (name: string): JSX.Element => (
		<span className='text mobile-works-list' style={{
			paddingLeft: `${(width < widthBreakPoint) ? '3em' : '1em'}`,
			fontWeight: 'bold',
		}}>{`${name}`}</span>
	)

	const boilerPlate = (): JSX.Element => (
		<>
			<span className='text mobile-works-list' style={{ paddingRight: '1em' }}>-rw-r--r--</span>
			<span className='text mobile-works-list' style={{ paddingRight: '0.4em' }}>1</span>
			<span className='text mobile-works-list' style={{ paddingRight: '0.8em' }}>johnny</span>
			<span className='text mobile-works-list' style={{ paddingRight: '1em' }}>staff</span>
			<span className='text mobile-works-list'
						style={{ paddingRight: '0.8em' }}>{MONTHS[new Date().getMonth()]}</span>
			<span className='text mobile-works-list' style={{ paddingRight: '0.4em' }}>{new Date().getDate()}</span>
			<span className='text mobile-works-list'
						style={{ paddingRight: '0.4em' }}>{new Date().getHours()}:{new Date().getMinutes()}</span>
			{(width < widthBreakPoint) ? <span><span>\</span><br /></span> : <></>}
		</>
	)

	const defaultTopDirs = (): JSX.Element[] => {
		return ['.', '..'].map(dir => (
			<li className='works-list-li' key={dir}>
				{boilerPlate()}
				{fileName(dir)}
			</li>
		))
	}

	const setWorksList = (): JSX.Element[] => {
		return worksList.map(project => (
			<li className='works-list-li' key={project.key}>
				<Link
					href={`/projects/${worksRootIndex}/${project.key}`}
					passHref
				>
					<div>
						{boilerPlate()}
						{fileName(project.name)}
						<span className='text mobile-works-list'>{`.json`}</span>
					</div>
				</Link>
			</li>
		));
	}

	const handleSettingWorksList = (): JSX.Element[]  =>
			defaultTopDirs().concat(setWorksList())

	return (
		<div className='works-list-container'>
			<div className='text'>{'>'} ls -al</div>
			<div>
				<div className='text'>total {worksList.length + 2}</div>
				<ul className='works-list-ul'>
					{handleSettingWorksList()}
				</ul>
			</div>
		</div>
	)
}

export default WorksList;