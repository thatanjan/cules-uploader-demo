import Head from 'next/head'
import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab'
import { useRouter } from 'next/router'

import PublishIcon from '@mui/icons-material/Publish'

import ImageGallery from '../components/ImageGallery'

const Gallery = () => {
	const { push } = useRouter()
	return (
		<>
			<Head>
				<title>Cules Gallery</title>
			</Head>

			<Grid
				container
				justifyContent='center'
				sx={{ maxHeight: '100vh', maxWidth: '100vw', overflowX: 'hidden' }}
				id='scrollableDiv'
			>
				<Grid
					item
					xs={7}
					sx={{ display: 'grid', placeItems: 'center', height: '10rem' }}
				>
					<Typography variant='h2' color='primary'>
						Cules Gallery
					</Typography>
				</Grid>

				<ImageGallery />

				<Fab
					variant='extended'
					size='medium'
					color='primary'
					sx={{ position: 'fixed', bottom: '5%', right: '5%' }}
					onClick={() => push('/')}
				>
					<PublishIcon sx={{ mr: 1 }} />
					Upload Image
				</Fab>
			</Grid>
		</>
	)
}

export default Gallery
