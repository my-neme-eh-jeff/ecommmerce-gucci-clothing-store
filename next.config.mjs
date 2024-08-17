/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "aapkadhikar.s3.ap-south-1.amazonaws.com",
				port: "",
				pathname: "/uploads/**",
			},
		],
	},
};

export default nextConfig;
