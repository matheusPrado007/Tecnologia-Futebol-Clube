import Users from "../../database/models/Users";

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc";

export const user = {
    id: 1,
    username: "User",
    email: "test@test.com",
    password: "batatinha",
    role: "user"
  } as Users;

  export const validateLogin = {
    email: "test@test.com",
    password: "batatinha"
  }

  export const role = {
    role: "admin",
  }as Users;