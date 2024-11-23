import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

blogRouter.use('/api/v1/blog/*', async (c, next) => {
    try{
      const header = c.req.header("authorization") || "";
      const token = header.split(" ")[1];
    
      //@ts-ignore
      const response = await verify(token, c.env.JWT_SECRET)
      if (response.id) {
        next()
      }
      else {
        c.status(403);
        return c.json({ error: "unauthorized" });
      }
    }
    catch(e){
      console.log(e);
      c.status(411);
      return c.text('invalid')
    }
    
  })

  blogRouter.post('/',async(c,next)=>{
    try{
       const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL
       }).$extends(withAccelerate());

       
    }catch(e){
      console.log(e);
      c.status(411);
      return c.text("Upload failed")
    }
  })
  
  
