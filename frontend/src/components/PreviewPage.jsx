import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"

const PreviewShadcnPage = ()=> {
  
  const showToast = () => {
    Toast.info("This is a toast message")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold">Shadcn UI</h1>
      <div className="flex space-x-4">
        <Input placeholder="Input" />
      </div>
      <div className="flex space-x-4">
        <Button>Button</Button>
      </div>
      <div className="flex space-x-4">
        <Button onClick={showToast}>Show Toast</Button>
      </div>
    </div>
  )
}

export default PreviewShadcnPage;