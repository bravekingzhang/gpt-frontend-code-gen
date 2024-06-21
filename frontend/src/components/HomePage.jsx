import { Suspense, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  VStack,
  GridItem,
  Center,
  Flex,
  InputGroup,
  InputRightElement,
  useBoolean,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import PreviewPage from "./PreviewPage";

import  useLocalStorage  from "../hooks/useLocalStorage";

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useLocalStorage('apiKey',
    "your-api-key"
  );

  const [model,setModel] = useLocalStorage("model","gpt-4");
  const [baseUrl, setBaseUrl] = useLocalStorage("baseUrl","https://api.openai.com");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPassword, setShowPassword] = useBoolean();


  const toast = useToast()

  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post("http://localhost:3001/generate-code", {
        prompt,
        apiKey,
        baseUrl,
        model,
      });
      setIsGenerating(false);
      if (response.data.generatedCode) {
        toast({
          title: "Code generated successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
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
    <Flex h='100%'  w='100%' p={4} >
      {/* 左侧对话区域 */}
      <GridItem flex="1" w="100%" p={4} borderRight="1px solid #e2e8f0" border={
        { base: "none", md: "1px solid #e2e8f0" }
      }>
        <VStack spacing={4}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="GPT API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={setShowPassword.toggle}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Input
            placeholder="GPT Base URL"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
          />
          <Select  value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="gpt-4">GPT-4</option>
            <option value={"gpt-4o"}>GPT-4o</option>
            <option value="gemini-pro">Gemini Pro</option>
          </Select>
          <Textarea
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            loadingText="Generating..."
            isLoading={isGenerating}
            onClick={handleGenerateCode}
          >
            Generate Code
          </Button>
        </VStack>
      </GridItem>

      {/* 右侧预览区域 */}
      <GridItem w="100%" p={4} flex={2}
       border={
      { base: "none", md: "1px solid #e2e8f0" }
    }
      >
        <Center>
          <Suspense fallback={<Loading/>}>
            <PreviewPage />
          </Suspense>
        </Center>
      </GridItem>
    </Flex>
  );
};


const Loading = () => {
  return <div>Loading...</div>;
}

export default HomePage;
