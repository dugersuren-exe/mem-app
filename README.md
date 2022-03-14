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
<summary> Бусад тохиргоонууд </summary>

.........................


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
<summary> API -ийг тестлэх </summary>

Тухайн сайт нь өгөглийн баазтай зөв холбосон бол дараах холбоосууд ажиллах ёстой

**Жишээ нь:**

GET method -оор дараах холбоос:    
```
http://localhost:3000/api/words
```

POST method -оор дараах холбоос:    
```
http://localhost:3000/api/words
```

PUT method -оор дараах холбоос:    
```
http://localhost:3000/api/words
```

DELETE method -оор дараах холбоос:    
```
http://localhost:3000/api/words
```
</details>

---


<details>
<summary> Redux-ийг холбох </summary>

Үндсэн фолдер дотор redux фолдер бүхий агуулгуудыг үүсгэж холбох

**Жишээ нь:**
redux -фолдерийг хуулаад тэндээ тохиргоо хийж болно.

**_app.js файл дотор дараах агуулга орсон байх**
```
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
} 

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

 

export default wrapper.withRedux(MyApp);
```

</details>

---
<details>
<summary> redux фолдер дотор words-ийг холбож оруулж ирэх </summary>

redux фолдер дотор words фолдерийг үүсгэж дотор нь дараах 3 файлыг үүсгэнэ.
* actions.js
* actionCreator.js
* reducers.js


 
**Жишээ нь:**

actions.js файлын агуулга
```
const actions = {
  WORDS_LOADING: 'WORDS_LOADING',
  WORDS_SUCCESS: 'WORDS_SUCCESS',
  WORDS_ERROR: 'WORDS_ERROR',

  wordsLoading: () => {
    return {
      type: actions.WORDS_LOADING,
    };
  },

  wordsSuccess: data => {
    return {
      type: actions.WORDS_SUCCESS,
      data,
    };
  },

  wordsError: err => {
    return {
      type: actions.WORDS_ERROR,
      err,
    };
  },
  

};

export default actions;

```

actionCreator.js
```
import actions from './actions';
import axios from 'axios'

const { wordsLoading, wordsSuccess, wordsError } = actions;


const getAllWords = () => {
  
  return async dispatch => {
    try {
      dispatch(wordsLoading());
      await axios.get("http://localhost:3000/api/words").then(({data}) => {          
        dispatch(wordsSuccess(data.list))
      });
    } catch (err) {
      dispatch(wordsError(err));
    }

  };
};



export {getAllWords };


```


reducers.js
```
import actions from './actions';

const { WORDS_LOADING, WORDS_SUCCESS, WORDS_ERROR} = actions;

const initialState = {
  list: [],
  loading: false,
  error: null
};

const WordsReducer = (state = initialState, action) => {
    
  const { type, data, err } = action;
  //console.log('==========>',data)   
  switch (type) {
    case WORDS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        
      };
    case WORDS_SUCCESS:   
      return {
        ...state,
        list: data,
        loading: false,
      };     
    case WORDS_ERROR:
      return {
        ...state,
        error: err,
        loading: false

      };
    
    default:
      return state;
  }
};
export default WordsReducer;




```

</details>

---
<details>
<summary> pages/words.js файлыг үүсгэх </summary>

Энэ нь уг веб сайтын words хуудас дуудагдахад ажиллах үүрэгтэй

**Жишээ нь:**
```
import { Table, Tag, Space,Button } from 'antd';

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pupilJsonDatas } from "../redux/pupil/actionCreator";
import { getAllWords } from "../redux/words/actionCreator";
import actions from "../redux/pupil/actions";


//Layouts
import MainLayout from '../components/layouts/MainLayout'


const columns = [
    {
      title: 'English',
      dataIndex: 'eng',
      key: 'eng'
    },
    {
      title: 'Монгол',
      dataIndex: 'mon',
      key: 'mon',
    },
    {
      title: 'Comment',
      dataIndex: 'comm',
      key: 'comm',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];



function words() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.words.list);
  
   
  
    useEffect(() => {
      dispatch(getAllWords());
    }, []);




  return (
    <MainLayout>
    <Space>
    <Button>Үг нэмэх</Button>
    </Space>
    <Table columns={columns} dataSource={data} />
    
    </MainLayout>
  )
}

export default words


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
<details>
<summary> ????? </summary>

????

**Жишээ нь:**
```
???
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
<details>
<summary> ????? </summary>

????

**Жишээ нь:**
```
???
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
<details>
<summary> ????? </summary>

????

**Жишээ нь:**
```
???
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
<details>
<summary> ????? </summary>

????

**Жишээ нь:**
```
???
```
</details>

---


