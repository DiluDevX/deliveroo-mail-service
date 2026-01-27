import z from 'zod';

export const resetPasswordBodySchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
});
