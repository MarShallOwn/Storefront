# STOREFRONT BACKEND

Storefront application is a online store that allows us to sell products from it and make orders.

---
**NOTE**

This application is not a full online store application and may contain bugs and missing features, this is just a practice project for my nanodegree and I am aware there might be bugs and hope to tackle them soon.

---

## What is included in this project
* **`Express:`** provide server-side logic for web and mobile applications.
* **`Jasmine:`** For Unit-Testing the Functions, End-Points and Models.
* **`Typescript:`** which primarily provides optional static.typing, classes and interfaces and richer environment for spotting common errors as you type.
* **`Postgres:`** is a open-source relational database management system (RDMS) emphasizing extensibility and SQL compliance.
* **`db-migrate:`** to make sql files that contains the database tables schema to be stored and shared between other collaborators easily.
* **`dotenv:`** for protecting secret data that shouldn't be shared on github or stay inside the project.
* **`Prettier:`** automatically makes your code more readable and consistent with your project's style guide. 
* **`jsonwebtoken:`** used for creating or verifying a token for the authentication of user to the application.
* **`nodemon:`** package that automatically restarting the node application when file changes in the directory are detected.
* **`supertest:`** test api end-point using this package.
* **`bcrypt:`** to hash password so when we store the password in the database it doesn't get stored as plain text and provide compare function.

---

## Env Attributes
* **`PORT`** = 3000
* **`DB_DRIVER`** = pg
* **`DB_HOST`** = 127.0.0.1
* **`DB_TEST_NAME`** = e_shop_udacity_test
* **`DB_NAME`** = e_shop_udacity
* **`DB_PASSWORD`**
* **`DB_USER`**
* **`ENV`** = dev
* **`BCRYPT_PASSWORD`**
* **`SALT_ROUNDS`**
* **`TOKEN_SECRET`**

---

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Postgres](https://www.postgresql.org/download/)

---

## Installation
* `git clone https://github.com/MarShallOwn/Storefront.git`
* `enter the folder`
* `open terminal`
* `write down "npm install" to download all the dependancies that the project needs`
* `add the neccessary .env variables that are listed down` [here](#env-attributes)
* `open the project on whatever IDE you prefer`

---

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the **production mode.**<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## `npm run dev`
Runs the app in the **development mode.** using nodemon<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Runs the Unit-Test using Jasmine.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It compiles TypeScript to JavaScript.

### `npm run test:db:setup`

To create database e_shop_udacity using db-migrate.

### `npm run test:db:migrate`

To run the database migrations in database e_shop_udacity using db-migrate.

### `npm run test:db:drop`

To drop database e_shop_udacity using db-migrate.

---

## API Endpoints

In is project there is currently only one endpoint which is :

### For User:
* ### **`/users`** METHOD POST (create user)
Request Body Structure
```
{
    "user": {
        "firstname": "john",
        "lastname": "wick",
        "username": "johhny",
        "email": "johnwick@gmail.com",
        "password": "12345",
        "confirmPassword": "12345"
    }
}
```
* ### **`/users`** METHOD GET (get list of all users - TOKEN REQUIRED)
* ### **`/users/:username`** METHOD GET (get data of specific user - TOKEN REQUIRED) 
* ### **`/users/authenticate`** METHOD POST (login user)
Request Body Structure
```
{
    "user": {
        "username": "johhny",
        "password": "12345"
    }
}
```

### For Category:
* ### **`/categories`** METHOD POST (create category)
Request Body Structure
```
{
    "category": {
        "name": "food"
    }
}
```
* ### **`/categories`** METHOD GET (get list of all categories)
* ### **`/categories/:id`** METHOD GET (get data of specific category) 
* ### **`/categories/:id`** METHOD DELETE (delete category)

### For Product:
* ### **`/products`** METHOD POST (create product - TOKEN REQUIRED)
Request Body Structure
```
{
    "product": {
        "name": "kiwi",
        "price": 64,
        "categoryId": 1
    }
}
```
* ### **`/products`** METHOD GET (get list of all products)
* ### **`/products/:id`** METHOD GET (get data of specific product) 
* ### **`products/top-5`** METHOD GET (get top 5 popular products)
* ### **`/products/category/:categoryName`** METHOD GET (get products by category name)
* ### **`/products/:id`** METHOD DELETE (delete product)


### For Order:
* ### **`/orders`** METHOD POST (create order - TOKEN REQUIRED)
Request Body Structure
```
{
    "order": {
        "isCompleted": true,
        "userId": 1
    }
}
```
* ### **`/orders`** METHOD GET (get list of all orders - TOKEN REQUIRED)
* ### **`/orders/:id`** METHOD GET (get data of specific order - TOKEN REQUIRED) 
* ### **`/orders/:id/products`** METHOD POST (add product to order - TOKEN REQUIRED)
Request Body Structure
```
{
    "product": {
        "productId": 6,
        "quantity": 40
    }
}
```
* ### **`/orders/user/:id`** METHOD GET (get all orders of specific user - TOKEN REQUIRED)
* ### **`/orders-by-status/:isCompleted/user/:id`** METHOD GET (get all orders of specific user depending on status - TOKEN REQUIRED)
* ### **`/orders/:id`** METHOD DELETE (delete order - TOKEN REQUIRED)

---

## Data Shapes

#### Users
- id (SERIAL - PRIMARY KEY)
- firstName (VARCHAR(150))
- lastName (VARCHAR(150))
- username (VARCHAR(150) - UNIQUE)
- email (VARCHAR(255))
- password (VARCHAR(100))

#### Categories
- id (SERIAL - PRIMARY KEY)
- name (VARCHAR(60))

#### Products
- id (SERIAL - PRIMARY KEY)
- name (VARCHAR(64) NOT NULL)
- price (integer NOT NULL)
- category_id (REFERENCE categories.id)

#### Orders
- id (SERIAL - PRIMARY KEY)
- status (VARCHAR(15)) ('active' OR 'completed') 
- user_id (REFERENCE users.id)

#### Order_Products
- id (SERIAL - PRIMARY KEY)
- quantity (integer)
- order_id (REFERENCE orders.id)
- product_id (REFERENCE products.id)