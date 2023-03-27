# Project's name REST API
## Description

This is a the backend repository for the React application `app's name`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

### User

Users in the database have the following properties:

```js
{
  "username": String,
  "email": String,
  "hashedPassword": String,
  "location": String
}
```
Product in the database have the following properties:

```js
{
"category": String,
"designer": String,
"seller": {
"type": Schema.Types.ObjectId,
"ref": "User",
"required": true
},
"name": String,
"description": String,
"price": Number,
"location": String,
"image": String,
"sold": {
"type": Boolean,
"default": false
}
}
```

Review in the database have the following properties:

```js
{
  "buyerId": ObjectId,
  "productId": ObjectId,
  "rating": Number,
  "comment": String,
}

```



```


---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password, location }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |
| GET all products   | GET     | /api/v1/products   |   | Public |
| GET a single product   | GET     | /api/v1/products/:productId   |   | Public |
| CREATE a new product  | POST     | /api/v1/products   |  { category, designer, seller, name, description, price, location, image } | Private |
| DELETE a product  | DELETE     | /api/v1/products/:productId   |  { category, designer, seller, name, description, price, location, image } | Private |
| EDIT a product  | PUT     | /api/v1/products/:productId  |  { category, designer, seller, name, description, price, location, image } | Private |
| GET all reviews for a product  | GET     | /api/v1/products/:productId/reviews  |  | Public |
| POST a new review for a product  | POST     | /api/v1/products/:productId/reviews  |  { rating, comment, buyerId } | Private |
| DELETE a review for a product  | DELETE     | /api/v1/products/:productId/reviews/:reviewId  |   | Private |
| EDIT a review for a product | PUT     | /api/v1/products/:productId/reviews/:reviewId  |  { rating, comment } | Private |
---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

