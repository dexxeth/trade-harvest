import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

// Define the path to the JSON file
const filePath = path.join(process.cwd(), "data", "products.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Read the existing products from the JSON file
      const fileData = await fs.readFile(filePath, "utf-8");
      const products = JSON.parse(fileData);

      // Get the new product from the request body
      const newProduct = req.body;

      // Add the new product to the array
      products.push(newProduct);

      // Write the updated products array back to the file
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));

      res.status(200).json({ message: "Product added successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
