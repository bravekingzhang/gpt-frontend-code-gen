import { Suspense, useEffect, useState } from "react";
import { MdBuild, MdCreateNewFolder } from "react-icons/md";
import { EyeIcon, EyeOffIcon, Upload } from "lucide-react";
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
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Switch } from "./ui/switch";

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
  const [referenceFiles, setReferenceFiles] = useState([]);
  const [isCreateNew, setIsCreateNew] = useState(false);

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
        useShadcnUI: true,
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

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const fileContents = [];

    for (const file of files) {
      const text = await file.text();
      fileContents.push({
        name: file.name,
        content: text,
      });
    }

    setReferenceFiles([...referenceFiles, ...fileContents]);
    toast({
      title: "Files uploaded",
      description: `${files.length} files added as reference`,
    });
  };

  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post("http://localhost:3001/generate-code", {
        useShadcnUI: true,
        prompt,
        apiKey,
        baseUrl,
        model,
        referenceFiles,
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
    <div className="flex flex-col h-screen">
      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Left Panel - Preview & Code */}
        <div className="flex-[2] flex flex-col">
          <HoldingPage />
        </div>

        {/* Right Panel - Settings & History */}
        <div className="w-[400px] space-y-4 overflow-y-auto">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Reference Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Upload your existing business components or similar pages as reference to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Generate code that matches your project style</li>
                    <li>Maintain consistent component patterns</li>
                    <li>Reuse existing business logic</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    multiple
                    accept=".js,.jsx,.ts,.tsx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label
                          htmlFor="file-upload"
                          className="flex items-center gap-2 cursor-pointer hover:text-primary border rounded-md p-2 text-sm"
                        >
                          <Upload className="h-4 w-4" />
                          Upload code files
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Support .js, .jsx, .ts, .tsx files</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {referenceFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {referenceFiles.length} file(s) uploaded as reference
                    </div>
                    <ScrollArea className="h-[100px] border rounded-md p-2">
                      <div className="space-y-2">
                        {referenceFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded-md"
                          >
                            <span className="truncate flex-1">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setReferenceFiles(referenceFiles.filter((_, i) => i !== index));
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <HistoryList history={fileChangeHistory} />


        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="create-mode"
                checked={isCreateNew}
                onCheckedChange={setIsCreateNew}
              />
              <Label htmlFor="create-mode" className="text-sm font-medium">
                Create new page from scratch
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">
              {isCreateNew
                ? "Start with a fresh page using Shadcn UI"
                : "Modify and improve the current page"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Textarea
                placeholder={
                  isCreateNew
                    ? "Describe the new page you want to create..."
                    : "Describe the changes you want to make to the current page..."
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[40px] max-h-[200px] resize-none overflow-auto"
                onInput={(e) => {
                  // 自动调整高度
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={isCreateNew ? newPage : handleGenerateCode}
                    disabled={!prompt || !apiKey || isGenerating}
                    className="flex gap-2 h-[40px] px-6"
                    size="lg"
                  >
                    {isCreateNew ? (
                      <MdCreateNewFolder className="h-5 w-5" />
                    ) : (
                      <MdBuild className="h-5 w-5" />
                    )}
                    {isGenerating
                      ? "Generating..."
                      : isCreateNew
                        ? "Create New Page"
                        : "Update Current Page"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isCreateNew
                    ? "Create a new page from scratch using Shadcn UI"
                    : "Modify and improve the current page based on your prompt"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ item }) => {
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium">{item.commitMessage}</div>
        <div className="text-xs text-muted-foreground">
          {new Date(item.commitDate).toLocaleString()}
        </div>
      </div>
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary/50 w-full" />
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
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Generation History</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your page evolution through AI-assisted iterations
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                onClick={() => loadHistoryFile(item.commitHash)}
                className="group relative p-4 border rounded-lg cursor-pointer
                  hover:bg-accent hover:shadow-md transition-all duration-200
                  before:absolute before:left-0 before:top-0 before:h-full before:w-1
                  before:bg-primary before:rounded-l-lg before:opacity-0
                  hover:before:opacity-100 before:transition-opacity"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Version {history.length - index}
                  </span>
                </div>
                <HistoryItem item={item} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Load this version
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Switch to this version of the page</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HomePage;
