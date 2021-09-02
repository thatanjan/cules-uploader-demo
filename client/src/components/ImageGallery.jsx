import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Image from 'next/image'

import axios2 from '../utils/axios'

const Gallery = () => {
	const [images, setImages] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [next, setNext] = useState('')

	const fetchImages = async () => {
		try {
			const { data } = await axios2.get('/getAllImages', { params: { next } })

			if (data) {
				setIsLoading(false)
				setImages((prev) => prev.concat(data.images))
				setNext(data.next)
			}
		} catch (e) {
			console.log(e)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchImages()
	}, [])

	if (isLoading)
		return (
			<Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<CircularProgress color='secondary' />
			</Backdrop>
		)

	return (
		<Grid item xs={11}>
			<Grid
				container
				columnSpacing={2}
				rowSpacing={2}
				next={fetchImages}
				hasMore={next ? true : false}
				dataLength={images.length}
				scrollableTarget='scrollableDiv'
				component={InfiniteScroll}
				loader={
					<Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
						<CircularProgress color='secondary' />
					</Backdrop>
				}
			>
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
		</Grid>
	)
}

export default Gallery
