import express from 'express'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import cors from 'cors'

import uploadToCloudinary from './uploadToCloudinary'

dotenv.config()

export const cloudinaryV2 = cloudinary.v2

cloudinaryV2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

const uploadDir = 'cules-uploader/'

app.post('/upload', async ({ body }, res) => {
	try {
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
	} catch (err) {
		return res.status(400).send({ message: err.message })
	}
})

app.get('/getAllImages', async (req, res) => {
	try {
		const {
			query: { next },
		} = req

		const options = {
			type: 'upload',
			prefix: uploadDir,
			max_results: 10,
		}

		if (next) options.next_cursor = next

		const { resources, next_cursor } = await cloudinaryV2.api.resources(options)

		const images = resources.map((image) => image.public_id)

		return res.json({ images: images, next: next_cursor || '' })
	} catch (e) {
		console.log(e)
	}
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
