import React, { FC } from 'react';
import { IMAGE_SIZE_DEFAULTS } from '../../assets/constants';

interface Props {
	imagesList: {id: number, url: string}[];
	defaultSize: string;
	altText: string | string [];
}

const ImageScroll: FC<Props> = (Props): JSX.Element => {
	const {imagesList, defaultSize, altText} = Props;
	console.log(imagesList);
	const mapImages = (): JSX.Element[] => {
		return imagesList.map((image: {id: number, url: string}): JSX.Element => {
			const sizes: string[] = IMAGE_SIZE_DEFAULTS;
			let returnString: string = ''

			for (const size of sizes)
				returnString += ` ${image.url.replace(defaultSize, size)} ${size}w`


			return (
				<li key={image.id}>
					<img
						className='image'
						srcSet={returnString.trimStart().slice(0, -1)}
					 	alt={altText as string}/>
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

export default ImageScroll;