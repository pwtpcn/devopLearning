import Elysia, { t } from "elysia";

const UserController = new Elysia({
  prefix: "/api/user",
  tags: ["User"],
});

UserController.model({
    User: t.Object({
        
    })
})

export default UserController;