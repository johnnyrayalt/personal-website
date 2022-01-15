import React, { FC, useEffect, useState } from 'react';
import MastHeader from '../../components/common/mastHeader/MastHeader';
import checkSlug from '../../utils/checkSlug';
import ErrorPage from 'next/error';
import { IMAGE_ROOTS } from '../../assets/constants';
import ProjectsList from '../../components/projects/projectList/ProjectsList';
import { useRouter } from 'next/router';

const Projects: FC = (): JSX.Element => {
	const router = useRouter();
	const { projects } = router.query;

	const [slug, setSlug] = useState<{err: boolean, code: number, slug: string}>({ err: false, code: 200, slug: ''});

	useEffect(() => {
	 if (!projects) return

	 const worksRootIndex = (): void => {
		 const projectRoot = projects.toString();
		 checkSlug(projectRoot, [IMAGE_ROOTS.ART, IMAGE_ROOTS.PROFESSIONAL], setSlug);
	 }

		worksRootIndex();
	}, [projects])

	return (
		<>
			<MastHeader />
			{(slug.err) ?
				(<ErrorPage statusCode={slug.code}/>) :
				(<ProjectsList worksRootIndex={slug.slug}/>)}
		</>
	);
};

export default Projects;