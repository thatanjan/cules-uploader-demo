import cloudinary from 'cloudinary'

export const uploadDir = 'cules-uploader/'

const handler = async ({ body, method }, res) => {
	try {
		if (method !== 'POST')
			return res.status(400).json({ message: 'Invalid method' })

		const cloudinaryV2 = cloudinary.v2

		cloudinaryV2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		})

		const { src } = body

		const imageConfig = {
			width: 1920,
			height: 1080,
			crop: 'fit',
			quality: 80,
			folder: uploadDir,
		}

		const { public_id } = await cloudinaryV2.uploader.upload(src, imageConfig)

		return res.json({ success: true, public_id })
	} catch (e) {
		console.log(e)
		return res.status(400).send({ message: 'Error processing request' })
	}
}

export default handler

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
}
