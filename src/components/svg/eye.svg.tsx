import React, { FC } from 'react'
import { topLid } from '../../assets/eye.svg.constants'
import './styles.css'

const EyeSvg: FC = (): JSX.Element => {

	return (
		<svg
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 235 600 135'
			preserveAspectRatio='xMidYMid meet'
		>
			<g id='wholeEyeGroup'>
				<g id='eyeballGroup' opacity='1'>
					<g id='pupilIrisGroup'>
						<circle id='iris' fill='none' stroke='#FFFFFF' strokeWidth='2' strokeMiterlimit='10' cx='303'
							cy='301' r='17' />
						<circle id='pupil' fill='#FFFFFF' cx='303' cy='301' r='9.1' />
					</g>
				</g>
				<line id='flatLid' fill='none' stroke='none' strokeWidth='10' strokeLinecap='round'
					strokeLinejoin='round' strokeMiterlimit='10' x1='240' y1='300' x2='360' y2='300' />

				<path id='botLid' fill='none' stroke='#FFFFFF' strokeWidth='10' strokeLinecap='round'
					strokeLinejoin='round' strokeMiterlimit='10' d={topLid.end} />
				<path id='topLid' fill='none' stroke='#FFFFFF' strokeWidth='10' strokeLinecap='round'
					strokeLinejoin='round' strokeMiterlimit='10' d={topLid.start} />

				<g
					id='lashGroup'
					opacity='1'
					stroke='#FFFFFF'
					strokeWidth='10'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeMiterlimit='10'
				>

					<line id='lashOne' x1='238.8' y1='277.5' x2='230' y2='268' />

					<line id='lashTwo' x1='266.8' y1='259.5' x2='260' y2='246.5' />

					<line id='lashThree' x1='299.8' y1='253.5' x2='300' y2='239.5' />

					<line id='lashFour' x1='332.8' y1='261.5' x2='338' y2='248.8' />

					<line id='lashFive' x1='359.8' y1='276.5' x2='369.3' y2='267' />
				</g>
			</g>
		</svg>
	)
}

export default EyeSvg
