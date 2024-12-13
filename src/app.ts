import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export const app = fastify();

app.post('/users', async (req, rep) => {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerUserBodySchema.parse(req.body);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: password,
    },
  });

  return rep.status(201).send();
});
