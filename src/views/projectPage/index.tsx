import ImagesApi from '../../services/ImagesApi'
import ImageScroll from '../../components/imageScroll'
import ProjectInfo from '../../components/projectInfo'
import React, { FC, useEffect, useState } from 'react'
import { ART, IMAGE_ROOTS, PROFESSIONAL } from '../../assets/constants'
import { IImageList } from '../../interfaces/IImageList'
import { IParsedImageList } from '../../interfaces/IParsedImageList'
import { IViewport } from '../../interfaces/IViewport'
import { IWorkObj } from '../../interfaces/IWorkObj'
import { useParams } from 'react-router-dom'
import { useViewport } from '../../utils/useViewportHook'

interface Props {
	root: string
}

const ProjectPage: FC<Props> = (Props): JSX.Element => {
	const { root } = Props
	const { width }: IViewport = useViewport()
	const param = useParams<{ id: string }>()
	const workKey = param.id

	const [work, setWork] = useState<IWorkObj>({} as IWorkObj)
	const [images, setImages] = useState<IImageList[] | []>([])
	const [defaultSize, setDefaultSize] = useState<string>('')

	const fetchImages = (defaultSize: string): Promise<IParsedImageList | undefined> => {
		return ImagesApi.get(root, workKey, defaultSize)
	}

	const extractInfo = (): void => {
		let work: IWorkObj = {} as IWorkObj

		switch (root) {
		case IMAGE_ROOTS.art:
			work = ART[workKey]
			break
		case IMAGE_ROOTS.professional:
			work = PROFESSIONAL[workKey]
			break
		}

		if (!work) {
			throw new Error(`No info found for ${root}! How'd that happen?`)
		}

		setWork(work)

		if (work.hasImages) {
			const setDefaultImageWidth: string =
				(width > 500 && width <= 750) ? '750'
					: (width >= 864) ? '864'
						: '500'

			setDefaultSize(setDefaultImageWidth)

			void fetchImages(setDefaultImageWidth).then((res: IParsedImageList | undefined) => {
				if (!res) return
				setImages(res.data)
			})
		}
	}

	useEffect(() => {
		extractInfo()
	}, [])

	return (
		<>
			<div className='project-page-container'>
				<ProjectInfo details={work} />
				{images.length !== 0 ?
					<ImageScroll
						imageList={images} defaultSize={defaultSize}
						altText={work.altText !== undefined ? work.altText : ''} />
					: <></>}
			</div>
		</>
	)
}

export default ProjectPage
