import React, { FC, useEffect, useState } from 'react';
import MastHeader from '../../../components/common/mastHeader/MastHeader';
import checkSlug from '../../../utils/checkSlug';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { IMAGE_ROOTS } from '../../../assets/constants';
import ProjectsList from '../../../components/projects/ProjectsList';

const Projects: FC = (): JSX.Element => {
	const router = useRouter();
 	const { projects } = router.query;

	const [slug, setSlug] = useState<{err: boolean, code: number, slug: string}>({ err: false, code: 200, slug: ''});

	useEffect(() => {
	 if (!projects) return

	 const worksRootIndex = async (): Promise<void> => {
		 const projectRoot = projects.toString();

		 await checkSlug(projectRoot, [IMAGE_ROOTS.art, IMAGE_ROOTS.professional], setSlug);
	 }
		worksRootIndex().then(() => {return});
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