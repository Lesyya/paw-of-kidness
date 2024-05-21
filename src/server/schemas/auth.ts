import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Надто коротке ім’я'),
  number: z.string().min(10, 'Номер телефону повинен містити 10 цифр'),
  email: z.string().email('Некоректна пошта'),
  password: z.string().min(6, 'Надто короткий пароль'),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Пошта обовʼязкова'),
  password: z.string().min(1, 'Пароль обовʼязковий'),
});
