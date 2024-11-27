import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@aaravrawat/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("signup", async (c) => {

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
 
  if (!success) {
    c.status(411);
    return c.json({
      messsage: "Inputs are invalid",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt,
  });
});

userRouter.post("signin", async (c) => {
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "inputs are invalid"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());


  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt,
  });
});
