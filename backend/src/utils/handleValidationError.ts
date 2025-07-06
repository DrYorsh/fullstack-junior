import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestCustom } from "./checkAuth";
import { postCreateValidation } from '../validations/validations.posts';
import { commentCreateValidation } from '../validations/validations.comets';


export const expressValid = (req: RequestCustom, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
        return
    }
    next();
}

export const zodValid = (req: RequestCustom, res: Response, next: NextFunction) => {
    const validZodPost = postCreateValidation.safeParse(req.body)

    if (!validZodPost.success) {
        res.status(500).json({ massage: validZodPost.error.errors[0].message })
        return
    }
    next();
}

export const zodCommentsValid = (req: RequestCustom, res: Response, next: NextFunction) => {
    const validZodCommet = commentCreateValidation.safeParse(req.body)

    if (!validZodCommet.success) {
        res.status(500).json({ massage: validZodCommet.error.errors[0].message })
        return
    }
    next();
}