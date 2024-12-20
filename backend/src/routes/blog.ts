import { Context, Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@aaravrawat/medium-common";
import { PrismaClient } from "@prisma/client/edge";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

blogRouter.use('/*', async (c: Context, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET)
    if (user) {
      c.set("userId", user.id);
      await next();
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
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "invalid inputs"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());



    const userId = c.get('userId');

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
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
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "invalid inputs"
      })
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL
  }).$extends(withAccelerate());


    const blog = await prisma.blog.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
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

blogRouter.get('/bulk', async (c) => {
  try {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate());
 
    const blogs = await prisma.blog.findMany(
      { select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        },
       }  }
    )

    if(!blogs){
      return c.text("No blogs")
    }

    return c.json({
      blogs
    })
  } catch (e) {
    console.log(e);
    return c.text('blogs get req Failed')
  }
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL
  }).$extends(withAccelerate());
  try {

    const id = c.req.param("id");
    const blog = await prisma.blog.findFirst({
      where: {
        id
      }
      ,
      select:{
        title: true,
        content: true,
        author: {
          select:{
            name: true
          }
            
        }
      }
    })

    return c.json({
      blog
    })
  } catch (e) {
    console.log(e);
    return c.text('blog get req Failed')
  }
})



 
