import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import PublishIcon from '@material-ui/icons/Publish'

import axios from '../utils/axios'
import CustomAlert from './CustomAlert'

const Uploader = () => {
	const [base64File, setBase64File] = useState('')
	const [previewLink, setPreviewLink] = useState('')

	const [uploading, setUploading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [failed, setFailed] = useState(false)
	const [showButtons, setShowButtons] = useState(false)

	const handleReset = () => {
		setBase64File('')
		setPreviewLink('')
		setShowButtons(false)
	}

	const handleUpload = async () => {
		setUploading(true)
		try {
			const { data } = await axios.post('/upload', {
				src: base64File,
			})

			if (data) {
				setUploading(false)
				setShowButtons(false)
				setSuccess(true)

				setTimeout(() => {
					setBase64File('')
					setPreviewLink('')
					setSuccess(false)
				}, 2000)

				return true
			}
		} catch (e) {
			setUploading(false)
			setFailed(true)
			setTimeout(() => {
				setFailed(false)
			}, 2000)
			return true
		}
	}

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			const realFile = acceptedFiles[0]

			const reader = new FileReader()

			const previewLink = URL.createObjectURL(realFile)

			setPreviewLink(previewLink)
			setShowButtons(true)

			reader.readAsDataURL(realFile)

			reader.onload = () => {
				setBase64File(reader.result)
			}
		},
	})

	return (
		<>
			<Card elevation={6}>
				{!base64File && (
					<CardContent
						sx={{
							height: '30rem',
							display: 'grid',
							justifyItems: 'center',
							gridGap: '1rem',
						}}
						{...getRootProps()}
					>
						<input {...getInputProps()} />
						<PublishIcon fontSize='large' sx={{ alignSelf: 'end' }} />
						<Typography>Drag and Drop to upload</Typography>
					</CardContent>
				)}

				{previewLink && (
					<CardMedia image={previewLink} sx={{ height: 0, paddingTop: '56.25%' }} />
				)}
			</Card>

			{showButtons && (
				<Grid
					container
					sx={{ margin: '1rem 0' }}
					justifyContent='space-around'
					rowSpacing={1}
				>
					<Grid item xs={12} md={5}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={handleUpload}
							disabled={uploading}
						>
							Upload Image
						</Button>
					</Grid>
					<Grid item xs={12} md={5}>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							disabled={uploading}
							onClick={handleReset}
						>
							Reset
						</Button>
					</Grid>
				</Grid>
			)}

			{success && (
				<CustomAlert severity='success' title='Image uploaded successfully' />
			)}
			{failed && <CustomAlert severity='error' title='Something went wrong' />}
			{uploading && <CustomAlert severity='info' title='Uploading Image' />}
		</>
	)
}

export default Uploader
