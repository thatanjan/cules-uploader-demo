import React from 'react'
import { useDropzone } from 'react-dropzone'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import PublishIcon from '@material-ui/icons/Publish'

const Uploader = () => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*, video/*',
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			const realFile = acceptedFiles[0]
			const file = realFile

			const reader = new FileReader()

			reader.onload = () => {
				const img = new Image()
				img.onload = function () {
					console.log('The width of the image is ' + img.width + 'px.')
				}
				img.src = reader.result
				console.log(img)
			}

			reader.readAsDataURL(realFile)

			const fileWithPreviewLink = Object.assign(realFile, {
				previewLink: URL.createObjectURL(realFile),
				valid: true,
			})
		},
	})

	return (
		<Card>
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
		</Card>
	)
}

export default Uploader
