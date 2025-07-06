import { z } from 'zod';

export const commentCreateValidation = z.object({
    coment_text: z.string().min(2, 'Введите текст комментария не менее 2х символов'),
}); 