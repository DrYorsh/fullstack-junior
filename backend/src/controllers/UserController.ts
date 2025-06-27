import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db';
import { RequestCustom } from '@/utils/checkAuth';


export const register = async (req: Request, res: Response) => {
    try {
        const password: string = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // let urlAvatar = null;
        // if (req.body.avatarUrl != '') {
        //     urlAvatar = req.body.avatarUrl;
        // }

        const newUser = await db.query('INSERT INTO users (fullName, email, passwordHash, avatarUrl) values ($1, $2, $3, $4) RETURNING *', [req.body.fullName, req.body.email, hash, req.body.avatarUrl]);
        const { passwordhash, ...user } = newUser.rows[0];


        const token = jwt.sign({
            id: newUser.rows[0].id,
        },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        res.json({ ...user, token })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            massage: "Не удалось зарегистрировать пользователя",
        })

    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const user = await db.query('SELECT * FROM users WHERE email=$1', [email]);

        if (!user) {
            res.status(400).json({
                massage: "Пользователь не найден"
            })
            return
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.rows[0].passwordhash);

        if (!isValidPassword) {
            res.status(400).json({
                massage: "Логин и пароль не подходят"
            })
            return
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        const { passwordhash, ...newUser } = user.rows[0];

        res.json({ ...newUser, token })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            massage: "Пользователь не найден",
        })

    }
}

export const getMe = async (req: RequestCustom, res: Response) => {
    try {
        const user = await db.query('SELECT * FROM users WHERE id=$1', [req.userId]);

        const { passwordhash, ...newUser } = user.rows[0];

        res.send(newUser)
    } catch (error) {
        res.status(404).send({ massge: "Пользователь не найден" })

    }
}