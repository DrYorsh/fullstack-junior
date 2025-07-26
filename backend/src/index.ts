import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { registerValidation, loginValidation } from './validations/validations.users'
import { UserController, PostController, CommentController } from './controllers/index';
import { expressValid, zodValid, checkAuth, zodCommentsValid } from './utils/index';


const PORT = 8000;
const app = express();
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use('/api/uploads', express.static('uploads'));

// Для работы с картинками, создаем хранилище, где они будут храниться
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

app.get('/api/', (req, res) => {
    res.send("Hello World!")
});

//делаю с помощью функций контроллер
//валидацию провожу в мидллваре
app.post('/api/auth/login', loginValidation, UserController.login);
app.post('/api/auth/register', registerValidation, expressValid, UserController.register);
app.get('/api/auth/me', checkAuth, UserController.getMe);

app.post('/api/upload', checkAuth, upload.single('image'), (req, res) => {

    let filedata = req.file;
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.json({
            url: `/uploads/${req.file?.originalname}`
        })
});


//делаю с помощью класса контроллер (не забыть создать объект класса)
//валидацию провожу в контроллере
const postController = new PostController();
app.get('/api/tags', postController.getLastTags);
app.get('/api/tags/:tag', postController.getAllPostsOfTags);

app.get('/api/posts/sort/:orderBy', postController.getAll);
// app.get('/posts/tags', postController.getLastTags);
app.get('/api/posts/:id', postController.getOne);
app.post('/api/posts', checkAuth, zodValid, postController.create);
app.delete('/api/posts/:id', checkAuth, postController.remove);
app.patch('/api/posts/:id', checkAuth, zodValid, postController.update);



const commentsController = new CommentController();
app.get('/api/comments', commentsController.getAll);
app.get('/api/comments/:id', commentsController.getOne);
app.post('/api/comments', checkAuth, zodCommentsValid, commentsController.create);

// app.delete('/posts/:id', checkAuth, postController.remove);
// app.patch('/posts/:id', checkAuth, zodValid, postController.update);

app.listen(PORT, () => {
    console.log("express starting on port 8000");
});