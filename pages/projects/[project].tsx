import React, { FC, useEffect, useState } from 'react';
import MastHeader from '../../components/common/mastHeader/MastHeader';
import Projects from '../../components/projects/Projects';
import checkSlug from '../../utils/checkSlug';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { IMAGE_ROOTS } from '../../assets/constants';

const Project: FC = (): JSX.Element => {
	const router = useRouter();
 	const { project } = router.query;

	const [slug, setSlug] = useState<{err: boolean, code: number, slug: string}>({ err: false, code: 200, slug: ''});

	useEffect(() => {
	 if (!project) return

	 (async (): Promise<void> => {
		 const projectRoot = project.toString();

		 checkSlug(projectRoot, [IMAGE_ROOTS.art, IMAGE_ROOTS.professional], setSlug);
	 })()
		 .then(() => {return});
	}, [project])

	return (
		<>
			<MastHeader />
			{(slug.err) ?
				(<ErrorPage statusCode={slug.code}/>) :
				(<Projects worksRootIndex={slug.slug}/>)}
		</>
	);
};

export default Project;