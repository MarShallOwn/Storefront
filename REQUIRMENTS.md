# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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