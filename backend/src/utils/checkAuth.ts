import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtExpPayload {
    id: number;
    exp: number;
}

export interface RequestCustom extends Request
{
    userId?: number ;
}

export default (req: RequestCustom, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, "secret123") as JwtExpPayload;
            req.userId = decoded.id;

            next();
        } catch (error) {
            res.status(403).json({
                massage: "Не прошла аунтификация"
            });
            return;
        }

    } else {
        res.status(403).json({
            massage: "Не прошла аунтификация"
        });
        return;
    }
}