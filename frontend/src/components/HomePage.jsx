import { Suspense, useEffect, useState } from "react";
import { MdBuild, MdCreateNewFolder } from "react-icons/md";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";

import useLocalStorage from "../hooks/useLocalStorage";
import HoldingPage from "./HoldingPage.jsx";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "your-api-key");
  const [model, setModel] = useLocalStorage("model", "gpt-4");
  const [baseUrl, setBaseUrl] = useLocalStorage(
    "baseUrl",
    "https://api.openai.com"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fileChangeHistory, setFileChangeHistory] = useState([]);
  const [useShadcnUI, setUseShadcnUI] = useLocalStorage("useShadcnUI", false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-history");
        setFileChangeHistory(response.data.history);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const newPage = async () => {
    try {
      const response = await axios.post("http://localhost:3001/new-page", {
        useShadcnUI,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: "New page created successfully",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create new page",
      });
    }
  };

  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post("http://localhost:3001/generate-code", {
        useShadcnUI,
        prompt,
        apiKey,
        baseUrl,
        model,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Code generated successfully",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate code",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex w-full h-screen p-4 gap-4">
      {/* Left Panel */}
      <div className="flex-1 space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="settings">
            <AccordionTrigger>LLM Settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="GPT API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Base URL</Label>
                <Input
                  placeholder="GPT Base URL"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                    <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <HistoryList history={fileChangeHistory} />

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-4">
              <Textarea
                placeholder="Enter your prompt here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1"
              />
              <div className="flex flex-col items-center justify-center space-y-2 p-2 border rounded-md">
                <Label>Shadcn UI</Label>
                <Switch
                  checked={useShadcnUI}
                  onCheckedChange={setUseShadcnUI}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={newPage}
                className="flex gap-2"
              >
                <MdCreateNewFolder />
                New Page
              </Button>
              <Button
                onClick={handleGenerateCode}
                disabled={!prompt || !apiKey || isGenerating}
                className="flex gap-2"
              >
                <MdBuild />
                {isGenerating ? "Generating..." : "Generate Code"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="flex-[2] border rounded-lg p-4">
        <HoldingPage />
      </div>
    </div>
  );
};

const HistoryItem = ({ item }) => {
  return (
    <div className="space-y-1">
      <div className="text-sm">
        <span className="font-medium">Commit Time:</span> {item.commitDate}
      </div>
      <div className="text-sm">
        <span className="font-medium">Commit Message:</span> {item.commitMessage}
      </div>
    </div>
  );
};

const HistoryList = ({ history }) => {
  const loadHistoryFile = async (commitHash) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/get-history-file/${commitHash}`
      );
      if (response.data) {
        await axios.post("http://localhost:3001/update-code", {
          code: response.data.fileContent,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Change History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                onClick={() => loadHistoryFile(item.commitHash)}
                className="p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
              >
                <HistoryItem item={item} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HomePage;
