# WeddSell REST API
## Description

This is a the backend repository for the React application `app's WeddSell`. 

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
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    location: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

```
Product in the database have the following properties:

```js
const dressSchema = new Schema(
  {
    neckline: {
      type: String,
      enum: [
        "ship", 
         "v-shaped", 
         "square",
         "strapless", 
         "halter", 
         "round", 
         "heart", 
         "delusion", 
         "fallen shoulders", 
         "queen anne", 
         "asymmetric", 
         "others", 
      ]
    },
    court: {
      type: String,
      enum: [
        "princess",
        "straight",
        "evaded",
        "in A",
        "siren",
        "empire",
        "others",
      ]
    },
    long: {
      type: String,
      enum: ["long", "half", "short"]
    },
    color: {
      type: String,
      enum: [
        "black",
        "light blue",
        "brown",
        "golden",
        "grey",
        "green",
        "ivory",
        "multicolored",
        "pink",
        "red",
        "silver",
        "white",
        "dark blue",
        "others",
      ]
    },
    size: {
      type: Number,
      enum: [
        32,
        34,
        36,
        38,
        40,
        42,
        44,
        46,
        48,
        50,
        52,
        54,
        56,
        58,
        60,
        62,
      ]
    },
    
    designer: {
      type: String,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      min: 500,
      required: true
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
      default: 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg'
    },
    sold: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no'
    }
  },
  {
    timestamps: true
  }
);
```

Review in the database have the following properties:

```js
const reviewSchema = new Schema(
  {
    buyerId: { 
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    dressId: {
      type: Schema.Types.ObjectId,
      ref: "Dress",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);
```

Post in the database have the following properties:

```js
const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    default:
      "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg"
  },
});
---
Message in the database have the following properties:

---js
const messageSchema = new Schema(
  {
    subject: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    phone: {
        type: Number,
        trim: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);
---
## API endpoints and usage 

| Action                               | Method | Endpoint         | Req.body                                                                       | Private/Public |
|--------------------------------------|--------|------------------|--------------------------------------------------------------------------------|----------------|
| SIGN UP user                         | POST   | /auth/signup     | { username, email, password, location }                                        | Public         | 
| LOG IN user                          | POST   | /auth/login      | { email, password }                                                            | Public         | 
| GET logged in user                   | GET    | /auth/me         |                                                                                | Private        |
| GET all dresses                      | GET    | /dress           |                                                                                | Public         |
| GET a single dress                   | GET    | /dress/:dressId  |                                                                                | Public         |
| POST create a new dress              | POST   | dress            |  { category, designer, seller, name, description, price, location, image }     | Private        |
| DELETE a dress                       | DELETE | /dress/:dressId  |  { category, designer, seller, name, description, price, location, image }     | Private        |
| EDIT a dress                         | PUT    | /dress/:dressId  |  { category, designer, seller, name, description, price, location, image }     | Private        |
| POST create a new review for a dress | POST   | /dress/:dressId/ |  { rating, comment, buyerId }                                                  | Private        |
| GET all post                         | GET    | /post            |                                                                                | Public         |
 
---

## Useful links

- [Presentation slides]()
- [Frontend repository](https://github.com/giovedoya/frontend-template-m3)
- [Frontend deploy](https://weddsell.netlify.app/)
- [Deployed REST API](https://weddsell.fly.dev/)

