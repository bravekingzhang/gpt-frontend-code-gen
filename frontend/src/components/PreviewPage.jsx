import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa"

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl font-bold text-center text-white">Shadcn UI</h1>
      <Tabs defaultValue="login" className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <TabsList className="flex justify-center space-x-4 bg-gray-100 p-2 rounded-lg">
          <TabsTrigger value="login" className="text-gray-600 hover:text-gray-800">Login</TabsTrigger>
          <TabsTrigger value="register" className="text-gray-600 hover:text-gray-800">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-6">
          <div className="space-y-4">
            <Input placeholder="Email" type="email" className="w-full" />
            <Input placeholder="Password" type="password" className="w-full" />
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="outline" className="flex items-center space-x-2 border-gray-300 hover:border-gray-400">
                <FaGoogle />
                <span>Google</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 border-gray-300 hover:border-gray-400">
                <FaFacebook />
                <span>Facebook</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 border-gray-300 hover:border-gray-400">
                <FaGithub />
                <span>GitHub</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="register" className="mt-6">
          <div className="space-y-4">
            <Input placeholder="Name" className="w-full" />
            <Input placeholder="Email" type="email" className="w-full" />
            <Input placeholder="Password" type="password" className="w-full" />
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Register</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoginPage;