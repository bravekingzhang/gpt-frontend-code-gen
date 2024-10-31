import * as React from "react"
import { Tabs, Tab } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold">Shadcn UI</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <div className="flex space-x-4">
          <Tab value="login">Login</Tab>
          <Tab value="register">Register</Tab>
        </div>
        <div className="mt-4">
          <Tab value="login">
            <div className="space-y-4">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Button>Login</Button>
            </div>
          </Tab>
          <Tab value="register">
            <div className="space-y-4">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Button>Register</Button>
            </div>
          </Tab>
        </div>
      </Tabs>
    </div>
  )
}

export default LoginPage;