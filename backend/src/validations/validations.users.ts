import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен бывть не менее 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен бывть не менее 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя не менее двух символов').isLength({ min: 2 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional({ checkFalsy: true }).isURL(),
]

// export const postCreateValidation = [
//     body('title', 'Введите заголовок статьи').isLength({ min: 3 }),
//     body('content', 'Введите текст статьи').isLength({ min: 10 }),
//     body('tags', 'Неверны формат тегов').optional().isString(),
//     body('imageUrl', 'Неверная ссылка на изображение').optional().isURL(),
// ]