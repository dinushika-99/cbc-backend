import express from 'express';
import { createProduct, getProduct, deleteProduct, getProductByName } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",getProduct);
productRouter.get("/:name", getProductByName);  //when product search by any text ----  using :name = request eke anthima kotasa mokk unth name ekk widiyt gnnawa
productRouter.post("/", createProduct);
productRouter.delete("/:name", deleteProduct);

export default productRouter;