import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useState,
} from 'react'
import { IViewport } from '../interfaces/IViewport'

const ViewportContext = createContext<IViewport>({
	width: window.innerWidth,
	height: window.innerHeight
})

export const ViewportProvider: FC = ({ children }) => {
	const [width, setWidth] = useState<number>(window.innerWidth)
	const [height, setHeight] = useState<number>(window.innerHeight)

	const handleResize: (() => void) = () => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<ViewportContext.Provider value={{ width, height }}>
			{children}
		</ViewportContext.Provider>
	)
}

export const useViewport: (() => IViewport) = () => useContext<IViewport>(ViewportContext)