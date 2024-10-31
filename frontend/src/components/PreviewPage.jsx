import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold">Shadcn UI</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-4">
          <div className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button>Login</Button>
          </div>
        </TabsContent>
        <TabsContent value="register" className="mt-4">
          <div className="space-y-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button>Register</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoginPage;