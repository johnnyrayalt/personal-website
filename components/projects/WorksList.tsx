import React, { FC } from 'react';
import Link from 'next/link';
import c, { Schema } from '../../assets/constants';
import { useViewport } from '../../utils/useViewportHook';

interface Props {
	worksList: Schema,
	worksRootIndex: string,
}

const WorksList: FC<Props> = (Props): JSX.Element => {
	const { worksList, worksRootIndex } = Props;
	const { width } = useViewport();
	const widthBreakPoint: number = 730;

	const handleSettingWorksList = (): JSX.Element[] => {
		const worksListArray: JSX.Element[] = [];

		for (const project in worksList) {
			worksListArray.push((
				<li className='works-list-li' key={project}>
					<Link
						href={`/projects/${worksRootIndex}/${project}`}
					>
						<div>
							<span className='text mobile-works-list' style={{ paddingRight: '1em' }}>-rw-r--r--</span>
							<span className='text mobile-works-list' style={{ paddingRight: '0.4em' }}>1</span>
							<span className='text mobile-works-list' style={{ paddingRight: '0.8em' }}>johnny</span>
							<span className='text mobile-works-list' style={{ paddingRight: '1em' }}>staff</span>
							<span className='text mobile-works-list'
										style={{ paddingRight: '0.8em' }}>{c.MONTHS[new Date().getMonth()]}</span>
							<span className='text mobile-works-list' style={{ paddingRight: '0.4em' }}>{new Date().getDate()}</span>
							<span className='text mobile-works-list'
										style={{ paddingRight: '0.4em' }}>{new Date().getHours()}:{new Date().getMinutes()}</span>
							{(width < widthBreakPoint) ? <span><span>\</span><br /></span> : <></>}
							<span className='text mobile-works-list' style={{
								paddingLeft: `${(width < widthBreakPoint) ? '3em' : '1em'}`,
								fontWeight: 'bold',
							}}>{`${worksList[project].name}`}</span>
							<span className='text mobile-works-list'>{`.json`}</span>
						</div>
					</Link>
				</li>
			))
		}

		return worksListArray;
	}

	return (
		<div className='works-list-container'>
			<div className='text'>{'>'} ls -al</div>
			<div>
				<div className='text'>total {Object.keys(worksList).length}</div>
				<ul className='works-list-ul'>
					{handleSettingWorksList()}
				</ul>
			</div>
		</div>
	)
}

export default WorksList;