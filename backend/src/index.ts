import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()

app.post('/api/v1/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('signup')
}) 

app.post('/api/v1/signin', (c) => {
  return c.text('signin')
})

app.post('/api/v1/blog', (c) => {
  return c.text('posted')
})

app.put('/api/v1/blog', (c) => {
  return c.text('updated')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('sended')
})

export default app
