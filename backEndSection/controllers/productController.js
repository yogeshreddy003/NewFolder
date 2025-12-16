import Product from "../models/Product.js";
export const getAllProducts = async (req, res) => {
     try {
         const products = await Product.find();
         if (!products || products.length === 0) {
         return res.status(404).json({ msg: "No products found"

          });
         } res.json(products);
         } catch (err) {
             console.error("Error fetching products:", err.message);
              res.status(500).send("Server Error"); 
            }
         };
          export const getProductById = async (req, res) => { try {
             const product = await Product.findById(req.params.id); 
             if (!product) { 
                return res.status(404).json({ msg: "Product not found" });
             } res.json(product); 
            } catch (err) {
                 console.error("Error fetching single product:", err.message);
                  res.status(500).send("Server Error");
                 }
                 };
                  export const addProduct = async (req, res) => { 
                    try { const { name, description, imageUrl, price } = req.body; const newProduct = { name, description, imageUrl, price: Number(price), };
                     const createdProduct = await Product.create(newProduct);
                      res.status(201).json(createdProduct);
                     } catch (err) {
                         res.status(500).json({ message: err.message });
                         } }; 