import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  id: z.number(),
  created_at: z.string()
});