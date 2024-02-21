import express from "express";
const productRouter = express.Router();

productRouter.route("/getAllproduct");
productRouter.route("/getProduct/:productId");

export default productRouter;
