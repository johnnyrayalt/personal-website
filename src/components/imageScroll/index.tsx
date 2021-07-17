import React, { FC } from 'react'
import { IImageList } from '../../interfaces/IImageList'
import { IMAGE_SIZE_DEFAULTS } from '../../assets/constants'
import { StringObj } from '../../types/StringObj'
import './styles.css'

interface Props {
	imageList: IImageList[],
	defaultSize: string,
	altText: string | string[],
}

const ImageScroll: FC<Props> = (Props): JSX.Element => {
	const { imageList, defaultSize, altText } = Props

	const mapImages = (): JSX.Element[] => {
		return imageList.map((image: IImageList): JSX.Element => {
			const sizes: string[] = IMAGE_SIZE_DEFAULTS
			const returnObj: StringObj = {}
			let returnString: string = ''

			for (const size of sizes) {
				const url = image.url.replace(defaultSize, size)
				returnString += ` ${url} ${size}w,`
			}

			return (
				<li key={image.id}>
					<img
						className='image'
						srcSet={returnString.trimLeft().slice(0, -1)}
						alt={altText as string} />
				</li>
			)
		})
	}

	return (
		<div className='image-scroll-container'>
			<ul>
				{mapImages()}
			</ul>
		</div>
	)
}

export default ImageScroll
