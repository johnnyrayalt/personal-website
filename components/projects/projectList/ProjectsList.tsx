import React, { FC, useEffect, useState } from 'react';
import { WORKS_LIST, MONTHS } from '../../../assets/constants';
import { useViewport } from '../../../utils/useViewportHook';
import Link from 'next/link';

interface Props {
	worksRootIndex: string,
}

const ProjectsList: FC<Props> = (Props): JSX.Element => {
	const { worksRootIndex } = Props;
	const widthBreakPoint: number = 730;
	const { width } = useViewport();
	const [worksList, setWorksList] = useState<{ name: string, key: string }[]>([]);

	useEffect(() => {
		const handleWorksListSelection = async (): Promise<void> => {
			const schema = WORKS_LIST
				.filter(work => work.type === worksRootIndex)
				.map(work => ({ name: work.name, key: work.key }));

			if (!schema) throw new Error(`No schema found for ${worksRootIndex}! How'd that happen?`)
			await setWorksList(schema);
		}
		handleWorksListSelection().then(() => {return});
	}, [worksRootIndex])

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

	const assembleDefaultTopDirsHTML = (): JSX.Element[] => {
		return ['.', '..'].map(dir => (
			<li className='works-list-li' key={dir}>
				{boilerPlate()}
				{fileName(dir)}
			</li>
		))
	}

	const assembleWorksListHTML = (): JSX.Element[] => {
		return worksList.map(project => (
			<li className='works-list-li' key={project.key}>
				<Link
					href={{pathname: '/projects/[root]/[slug]', query: { root: `${worksRootIndex}`, slug: `${project.key}` }}}
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
		assembleDefaultTopDirsHTML().concat(assembleWorksListHTML())

	return (
		<div className='projects-container'>
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

export default ProjectsList;