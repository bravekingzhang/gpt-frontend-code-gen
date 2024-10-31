import React, { useState, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const HoldingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [code, setCode] = useState(`hahah`);
  const [containerHeight, setContainerHeight] = useState(667);

  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      // 考虑底部输入区域（~160px）和其他UI元素的高度
      const reservedHeight = 280; // 160px 输入区 + 标签页等UI元素高度
      const availableHeight = viewportHeight - reservedHeight;
      setContainerHeight(Math.max(400, availableHeight));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-code");
        const data = await response.json();
        setCode(data.code);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const writeCode = async (code) => {
    try {
      await fetch("http://localhost:3001/update-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      setCode(code);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full mx-auto pb-4">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="mobile-mode">Show Mobile Design</Label>
              <Switch
                id="mobile-mode"
                checked={isMobile}
                onCheckedChange={setIsMobile}
              />
            </div>

            <div className="relative w-full flex justify-center">
              <div
                className={cn(
                  "overflow-auto rounded-lg border",
                  "transition-all duration-300",
                  {
                    "w-full": !isMobile,
                    "origin-top scale-[0.8]": isMobile,
                  }
                )}
                style={{
                  height: `${containerHeight}px`,
                  width: isMobile ? '375px' : '100%',
                }}
              >
                <div
                  className={cn(
                    "h-full w-full",
                    isMobile && "min-w-[375px]"
                  )}
                >
                  <Suspense fallback={<Loading />}>
                    <Outlet />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <Card
            className="bg-zinc-950"
            style={{ height: `${containerHeight}px` }}
          >
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={code}
              onChange={(value) => writeCode(value)}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
              }}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
};

export default HoldingPage;
