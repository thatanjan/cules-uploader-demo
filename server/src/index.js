import express from 'express'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

import uploadToCloudinary from './uploadToCloudinary'

dotenv.config()

const cloudinaryV2 = cloudinary.v2

cloudinaryV2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

const uploadDir = 'cules-uploader/'

app.post('/upload', async ({ body }, res) => {
	const { src, height, width } = body

	const imageConfig = {
		width: width || 1280,
		height: height || 720,
		crop: 'fit',
		quality: 80,
		folder: uploadDir,
	}

	const upload = await uploadToCloudinary(src, imageConfig)

	res.json({ success: true, public_id: upload })
})

app.get('/getAllImages', async (_, res) => {
	const images = await cloudinaryV2.api.resources({
		type: 'upload',
		prefix: uploadDir,
	})

	return res.json({ images })
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
