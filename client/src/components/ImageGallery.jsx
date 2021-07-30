import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Image from 'next/image'

const Gallery = () => {
	const [images, setImages] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source()
		;(async () => {
			try {
				const { data } = await axios.get('/api/getAllImages', {
					cancelToken: cancelTokenSource.token,
				})

				if (data) {
					setIsLoading(false)
					setImages(data.images)
				}
			} catch (e) {
				setIsLoading(false)
			}
		})()

		return () => {
			cancelTokenSource.cancel()
		}
	}, [])

	if (isLoading)
		return (
			<Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<CircularProgress color='secondary' />
			</Backdrop>
		)

	return (
		<Grid item container xs={11} columnSpacing={2} rowSpacing={2}>
			{images.map((imageID, index) => (
				<Grid item xs={4} key={index}>
					<Image
						src={imageID}
						height={9}
						width={16}
						layout='responsive'
						objectFit='cover'
					/>
				</Grid>
			))}
		</Grid>
	)
}

export default Gallery
