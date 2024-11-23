import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string;
  }
}>();

blogRouter.use('/api/v1/blog/*', async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET)
    if (user) {
     c.set('userId',user);
      next()
    }
    else {
      c.status(403);
      return c.json({ error: "Login first" });
    }
  }
  catch (e) {
    console.log(e);
    c.status(411);
    return c.text('invalid')
  }

})

blogRouter.post('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const userId = c.get('userId');

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userId
      }
    })

    return c.json({
      id: blog.id
    })

  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Upload failed")
  }
})

blogRouter.put('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const blog = await prisma.blog.update({
      where: {
        id: body.id
      },
      data:{
        title: body.title,
        content: body.content,
        published: body.published
      }
    })

    return c.json({
       id: blog.id
    })
  } catch (e) {
    console.log(e);
    return c.text('Update Failed')
  }
})

blogRouter.get('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id
      },
    })

    return c.json({
       blog
    })
  } catch (e) {
    console.log(e);
    return c.text('blog get req Failed')
  }
})

blogRouter.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const blogs = await prisma.blog.findMany()

    return c.json({
       blogs
    })
  } catch (e) {
    console.log(e);
    return c.text('blogs get req Failed')
  }
})




