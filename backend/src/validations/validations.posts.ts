import { z } from 'zod';

export const postCreateValidation = z.object({
    title: z.string().min(3, 'Введите заголовок статьи').max(225),
    content: z.string().min(5, 'Введите текст статьи'),
    tags: z.string({ message: "Неверны формат тегов" }).array().optional(),
    imageUrl: z.string().optional().refine(value => !value || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value), {
        message: "Please provide a valid URL",
    })
    // imageUrl: z.string().optional().url({ message: "Неверная ссылка на изображение" })
})
