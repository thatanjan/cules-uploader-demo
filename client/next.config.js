module.exports = {
	reactStrictMode: true,
	images: {
		loader: 'cloudinary',
		path: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/`,
	},
}
