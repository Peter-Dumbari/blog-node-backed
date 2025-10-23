# 📰 Blog API

A full-featured RESTful Blog API built with **Express.js** and **MongoDB (Mongoose)**.  
It allows users to **register, login, create posts, comment, like posts**, and more.

---

## 🌍 Live API

🚀 **Base URL:** [https://blog-api-w417.onrender.com](https://blog-api-w417.onrender.com)

> You can start testing the API directly using the above link.  
> Example:
>
> - **Get all posts:** `GET https://blog-api-w417.onrender.com/api/posts`
> - **Register user:** `POST https://blog-api-w417.onrender.com/api/auth/register`

---

## 🚀 Features

- User authentication (register & login with JWT)
- CRUD operations for blog posts
- Image uploads to **Cloudinary**
- Like & unlike blog posts
- Add & delete comments
- Fetch user’s own posts
- MongoDB Atlas integration

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (for image uploads)
- JWT (for authentication)
- Multer (for handling file uploads)

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/Peter-Dumbari/blog-node-backend.git

# 2. Go into the project directory
cd blog-backend

# 3. Install dependencies
npm install

# 4. Create a .env file
touch .env
```

## 🧩 API Endpoints

Below is the list of all API routes available in this project.  
Each route includes the method, endpoint, description, and whether authentication is required.

| Method | Endpoint                             | Description              | Auth Required |
| ------ | ------------------------------------ | ------------------------ | ------------- |
| POST   | `/api/auth/register`                 | Register a new user      | ❌ No         |
| POST   | `/api/auth/login`                    | Login user and get token | ❌ No         |
| GET    | `/api/user/:id`                      | Get My Posts             | ✅ Yes        |
| POST   | `/api/posts`                         | Create a new post        | ✅ Yes        |
| GET    | `/api/posts`                         | Get all posts            | ❌ No         |
| GET    | `/api/posts/:id`                     | Get a single post        | ❌ No         |
| PUT    | `/api/posts/:id`                     | Update a post            | ✅ Yes        |
| DELETE | `/api/posts/:id`                     | Delete a post            | ✅ Yes        |
| POST   | `/api/posts/:id/like`                | Like or unlike a post    | ✅ Yes        |
| POST   | `/api/posts/:id/comments`            | Add a comment            | ✅ Yes        |
| DELETE | `/api/posts/:id/comments/:commentId` | Delete a comment         | ✅ Yes        |

### Register User

**POST** `https://blog-api-w417.onrender.com/api/auth/register`

#### Request Body

```json
{
  "username": "peter",
  "name": "peter dumbari",
  "email": "peter@example.com",
  "password": "123456"
}
```

{
"message": "User registered successfully",
"user": {
"\_id": "6789abcd1234ef567890",
"username": "peter",
"email": "peter@example.com"
}
}

---

### ❤️ Example 4 — Like or Unlike Post

````markdown
### Like or Unlike Post

**POST** `https://blog-api-w417.onrender.com/api/posts/:id/like`

#### Request Body

```json
{
  "userId": "68f3c9a8849fa819006b0408"
}
```
````

{
"liked": true,
"likesCount": 1
}

---

### 💬 Example 5 — Add Comment

````markdown
### Add Comment

**POST** `https://blog-api-w417.onrender.com//api/comment`

#### Request Body

```json
{
  "postId": "68f3c9a8849fa819006b0408",
  "body": "Great article!"
}
```

{
"message": "Comment added successfully",
"comment": {
"\_id": "78b23d4f98e0a9c123456",
"text": "Great article!",
"author": "68f3c9a8849fa819006b0408",
"createdAt": "2025-10-13T12:00:00.000Z"
}
}
````

## 🗣️ Feedback & Support

I’d love to hear your feedback, suggestions, or ideas to improve this project.
If you find a bug or have a feature request, please open an issue on the [Issues page](https://github.com/Peter-Dumbari/blog-node-backed/issues).

You can also:

- ⭐ Star this repository if you find it helpful
- 🐛 Report bugs by creating a new [issue](https://github.com/Peter-Dumbari/blog-node-backed/issues/new)
- 💡 Suggest new features via [feature requests](https://github.com/Peter-Dumbari/blog-node-backed/issues/new?template=feature_request.md)

If you’d like to reach out personally or collaborate, feel free to contact me:

📧 **Email:** peterdumbari08@gmail.com
💬 **Twitter:** [@peterdumbari](https://twitter.com/peter-dumbari)
💻 **LinkedIn:** [Peter Dumbari](https://linkedin.com/in/peter-dumbari)

```

```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
