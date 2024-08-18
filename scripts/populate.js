import { faker } from "@faker-js/faker";
import axios from "axios";

const productImages = [
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/CarouselImage1.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/CarouselImage2.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/CarouselImage3.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/CarouselImage4.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/GridClusterImage1.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/GridClusterImage2.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/GridClusterImage3.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/GridClusterImage4.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/GridClusterImage5.png",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/695955_XJEEI_1030_011_100_0000_Light-GG-jersey-cotton-jacket.avif",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/29-04-24CertifiedThrift0158.jpg",
	"https://aapkadhikar.s3.ap-south-1.amazonaws.com/uploads/695955_XJEEI_1030_001_100_0000_Light.avif",
];

const categories = ["Jacket", "Bag", "Shoes", "Coat", "Dress"];

function generateProduct(index) {
	return {
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: Number.parseFloat(faker.commerce.price()),
		imageUrl: productImages[index % productImages.length],
		category: faker.helpers.arrayElement(categories),
		stock: faker.number.int({ min: 0, max: 100 }),
	};
}

async function insertProduct(product) {
	try {
		const response = await axios.post(
			"http://localhost:7779/api/products",
			product,
		);
		console.log(`Product inserted: ${response.data.name}`);
	} catch (error) {
		console.error(`Error inserting product: ${error.message}`);
	}
}

async function insertProducts() {
	for (let i = 0; i < 50; i++) {
		const product = generateProduct(i);
		await insertProduct(product);
	}
}

insertProducts().then(() => console.log("WOW POPULATED"));
