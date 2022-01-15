import React, { FC, useEffect } from 'react';
import ProjectInfo from '../projectInfo/ProjectInfo';
import { WORKS_LIST } from '../../../assets/constants';
import ImageScroll from '../../images/ImageScroll';

interface Props {
	worksRootIndex: string,
}

const IndividualProject: FC<Props> = (Props, { data }): JSX.Element => {
	const { worksRootIndex } = Props;

	const extractProjectInfo = () => {
		return WORKS_LIST.filter(value => value.key === worksRootIndex)[0]
	}
	console.log(data)
	return (
		<div className='individual-project-container'>
			<span className='text brackets'>{'{'}</span>
			<ProjectInfo details={extractProjectInfo()} />
			{/*<ImageScroll imagesList={data} defaultSize={''} altText={''}/>*/}
			<span className='text brackets'>{'}'}</span>
		</div>
	);
}

export async function getServerSideProps(context: any) {
	const { project } = context.params;
	console.log(project)
	const images = await fetch(`http://localhost:4200/images/art/alpha_decay/500`)
	const data = await images.json();

	if (!data) return { notFound: true }

	return { props: { images: data } };
}

export default IndividualProject;