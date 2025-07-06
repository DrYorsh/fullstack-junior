import { Request, Response } from 'express';
import db from '../db';
import { RequestCustom } from '@/utils/checkAuth';
import { QueryResult } from 'pg';

type IPosts = {
    id: number,
    title: string,
    content: string,
    tags: string[],
    viewsCount: number,
    imageUrl: string,
    user_id: number,
    time_stamps: string,
    update_time: string
}

class PostController {
    create = async (req: RequestCustom, res: Response) => {
        try {
            // const newPost = await db.query('INSERT INTO posts (title, content, tags, imageUrl, user_id) values ($1, $2, $3, $4, $5) RETURNING *',
            //     [req.body.title, req.body.content, req.body.tags, req.body.imageUrl, req.userId]);

            // res.json(newPost);
            res.send('hi')
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось создать статью",
            })
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const allPosts = req.params.orderBy === "0" ? await db.query('SELECT posts.*, fullname, email, avatarurl FROM posts JOIN users ON posts.user_id = users.id ORDER BY id DESC')
                : await db.query('SELECT posts.*, fullname, email, avatarurl FROM posts JOIN users ON posts.user_id = users.id ORDER BY viewscount DESC');


            // если так делаешь, то убери passwordHash из ответа. Тут не делал. Это учебный материал.
            res.json(allPosts);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось получить все статьи",
            })
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            await db.query('UPDATE posts set viewscount = viewscount+1  where id=$1', [req.params.id])
            const onePost = await db.query('SELECT posts.*, fullname, email, avatarurl FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id=$1 ', [req.params.id]);

            res.json(onePost);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось получить статью",
            })
        }
    }

    remove = async (req: RequestCustom, res: Response) => {
        try {

            const removePost = await db.query('DELETE FROM posts where id = $1 RETURNING *', [req.params.id]);

            res.json(removePost);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось удалить статью",
            })
        }
    }

    update = async (req: RequestCustom, res: Response) => {
        try {
            const updatePost = await db.query('UPDATE posts set title=$1, content=$2, tags=$3, imageUrl=$4 where id = $5 RETURNING *',
                [req.body.title, req.body.content, req.body.tags, req.body.imageUrl, req.params.id]);

            res.json(updatePost);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось обновить статью",
            })
        }
    }

    getLastTags = async (req: Request, res: Response) => {
        try {
            const allPosts = await db.query('SELECT * FROM posts LIMIT 5');
            const uniqueArray = allPosts.rows.map((obj: IPosts) => obj.tags).flat()
            const tags = [...new Set(uniqueArray)].slice(0, 5)
            res.json(tags);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось получить все tags",
            })
        }
    }

    getAllPostsOfTags = async (req: Request, res: Response) => {
        try {
            const tag = req.params.tag;
            const allPosts = await db.query("SELECT posts.*, fullname, email, avatarurl FROM posts JOIN users ON posts.user_id = users.id WHERE  $1 = ANY(tags)", [tag]);
            res.json(allPosts.rows);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось получить все посты по заданному Тэгу",
            })
        }
    }

}

export default PostController;