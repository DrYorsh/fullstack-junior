import { Request, Response } from 'express';
import db from '../db';
import { RequestCustom } from '@/utils/checkAuth';


type TComments = {
    id: number,
    coment_text: string,
    fk_user_id: number,
    fk_posts_id: number;
    time_stamps: string,
    update_time: string
};


export default class CommentComntroller {
    create = async (req: RequestCustom, res: Response) => {
        try {            
            const newComment = await db.query(
                'INSERT INTO comments (coment_text, fk_posts_id, fk_user_id) values ($1, $2, $3) RETURNING *',
                [req.body.coment_text, req.body.fk_posts_id, req.userId]
            );
            const allComments = await db.query(
                'SELECT * FROM comments JOIN users ON comments.fk_user_id = users.id WHERE fk_posts_id=$1 ORDER BY comments.id DESC',
                [req.body.fk_posts_id]
            );
            
           res.json(allComments);
        } catch (error) {
            console.log(error);

            res.status(500).json({
                massage: "Не удалось создать комментарий",
            })
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const allComments = await db.query(
                'SELECT * FROM comments JOIN users ON comments.fk_user_id = users.id'
            )

            res.json(allComments)
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                massage: "Не удалосьполучить все комментарии",
            })
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const allComments = await db.query(
                'SELECT * FROM comments JOIN users ON comments.fk_user_id = users.id WHERE fk_posts_id=$1',
                [req.params.id]
            )

            res.json(allComments)
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                massage: "Не удалосьполучить все комментарии",
            })
        }
    }
}