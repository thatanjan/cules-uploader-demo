import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'

import PublishIcon from '@material-ui/icons/Publish'

const Uploader = () => {
	const [base64File, setBase64File] = useState('')
	const [previewLink, setPreviewLink] = useState('')
	const [upload, setUpload] = useState({
		uploading: false,
		success: false,
		failed: false,
	})

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			const realFile = acceptedFiles[0]

			const reader = new FileReader()

			const previewLink = URL.createObjectURL(realFile)

			setPreviewLink(previewLink)

			reader.readAsDataURL(realFile)

			reader.onload = () => {
				setBase64File(reader.result)
			}
		},
	})

	return (
		<Card>
			{!previewLink && (
				<CardContent
					sx={{
						height: '20rem',
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

			<CardActions> </CardActions>
		</Card>
	)
}

export default Uploader
