<details open>
<summary>1. Шинээр app үүсгэх</summary>

Commandline эсвэл git bash  дээр дараах кодыг бичиж app-ийг үүсгэнэ.

**Жишээ нь:**
```
npx create-next-app mem-app
```
</details>

---

<details>
<summary>2. Нэмэлт сангуудаа суулгах</summary>
a) MongoDb холбох үүрэгтэй санг суулгах

```
npm i mongodb

```
б) Redux -тай холбоотой сан
```
npm i next-redux-wrapper redux redux-devtools-extension redux-logger redux-persist redux-thunk
```

в) Ant.design -тай холбоотой сан
```
npm i antd @ant-design/icons
```

</details>

---

<details>
<summary> 3. models фолдер дотор schema-ийг үүсгэх </summary>

Үндсэн фолдер дотор доорх зам дээр файлуудыг үүсгэх
```
models/words.js
```

**Жишээ нь:**
```
import mongoose from 'mongoose';

const WordsSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  eng: {
    type: String,
    required: true
  },
  mon: {
    type: String,
    required: true
  },
  comm: {
    type: String,
    required: true
  },


});

export default mongoose.models.Words || mongoose.model('Words', WordsSchema);

```

models/category.js

```
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  }
});

export default mongoose.models.Category || mongoose.model('Category', WCategorySchema);



```
</details>



---

<details>
<summary> 4. .env -файлыг үүсгэх </summary>

Үндсэн фолдер дотор .env.local файлыг үүсгэж MONGO_SRV хувьсагчид утга олгоно(MongoDB-ийн холболтын мөр connectionstting-ийг)

**Жишээ нь:**
```
MONGODB_URI=mongodb+srv://mem:Ab123456+@cluster0.l27e0.mongodb.net/MemDb?retryWrites=true&w=majority
DB_NAME=MemDb

```
</details>

---



<details>
<summary> 5. MongoDb -тэй холбогдох файл </summary>

Үндсэн фолдер дотор utils/connectDb.js файл үүсгэнэ.

```
utils/connectDb.js
```

**Файлын доторх агуулга:**
```

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}



```

</details>

---

<details>
<summary> 6. API-ийг үүсгэх </summary>
Жишээ нь:



pages/api фолдер дотор 
   * words.js

**words.js**

```
const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}

// Getting all posts.
async function getPosts(req, res) {
    try {
        let { db } = await connectToDatabase();
        let words = await db
            .collection('words')
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(words)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new post
async function addPost(req, res) {
    try {
        let { db } = await connectToDatabase();
        console.log("hi----->",req.body);
        await db.collection('words').insertOne(req.body);
        
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Updating a post
async function updatePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('words').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).meзүssage,
            success: false,
        });
    }
}

// deleting a post
async function deletePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('words').deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


```



</details>

---

<details>
<summary> ????? </summary>

????

**Жишээ нь:**
```
???
```
</details>

---




