"use client"

import { useState } from "react"
import RegistrationForm from "./Register";
import LoginForm from "./Login";

export default function AuthForm() {
  const [formType, setFormType] = useState<"Login" | "Register">("Login");
  console.log(formType)

  if (formType === "Login") {
    return <LoginForm changeForm={() => setFormType("Register")}/>
  } else {
    return <RegistrationForm changeForm={() => setFormType("Login")} />
  }
}