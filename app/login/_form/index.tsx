"use client"

import { useState } from "react"
import RegistrationForm from "./register";
import LoginForm from "./login";

export default function AuthForm() {
  const [formType, setFormType] = useState<"Login" | "Register">("Login");

  if (formType === "Login") {
    return <LoginForm changeForm={() => setFormType("Register")}/>
  } else {
    return <RegistrationForm changeForm={() => setFormType("Login")} />
  }
}