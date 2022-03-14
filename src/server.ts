import bodyParser from "body-parser";
import express, { Express } from "express";
import "dotenv/config";
import user_routers from "./handlers/users";
import category_routes from "./handlers/categories";
import order_routes from "./handlers/orders";
import product_routes from "./handlers/products";

const PORT = process.env.PORT;

const app: Express = express();

app.use(bodyParser.json());

user_routers(app)
category_routes(app)
order_routes(app)
product_routes(app)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

export default app