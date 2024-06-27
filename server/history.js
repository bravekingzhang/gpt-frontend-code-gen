const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const  previewPageContent =`
import { Box,Heading,Button,VStack} from '@chakra-ui/react';

const PreviewPage = () => {
  return (
    <Box>
    <VStack>
     <Heading>Chakra UI</Heading>
      <p>Let's build something with Chakra UI</p>
      <Button>OK Let's go</Button>
      </VStack>
    </Box>
  );
}

export default PreviewPage;
`;

const previewPageContentShadcnUI = `
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PreviewShadcnPage = ()=> {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold">Shadcn UI</h1>
      <div className="flex space-x-4">
        <Input placeholder="Input" />
      </div>
      <div className="flex space-x-4">
        <Button>Button</Button>
      </div>
    </div>
  )
}

export default PreviewShadcnPage;
`;

// 从环境变量中获取是否是 Docker 环境
const isDockerEnv =  process.env.IS_DOCKER_ENV;

console.log('isDockerEnv:', isDockerEnv)

const codeFilePath = isDockerEnv
  ? path.join(__dirname, '/src/components', 'PreviewPage.jsx')
  : path.join(__dirname, '../frontend/src/components', 'PreviewPage.jsx');

console.log('codeFilePath:', codeFilePath)

const readCode = (isShadcnUI=false) => {
  const defaultUIContent = isShadcnUI? previewPageContentShadcnUI: previewPageContent;
    if (!fs.existsSync(codeFilePath)) return defaultUIContent;
    return fs.readFileSync(codeFilePath, 'utf8') || defaultUIContent;
};

const writeCode = (code) => {
    fs.writeFileSync(codeFilePath, code,
        { encoding: 'utf8', flag: 'w' }
    );
};

// init code
const initCode = (isShadcnUI=false) => {
  const defaultUIContent = isShadcnUI? previewPageContentShadcnUI: previewPageContent;
  writeCode(defaultUIContent);
}

// 获取文件变更历史,
// 返回一个数组，数组中的每个元素是一个object，包含 commitHash, commitDate, commitMessage
const getHistory = () => {
  const logCommand = `git log --pretty=format:'%h %ad %s' --date=format:'%Y-%m-%d %H:%M' -- ${codeFilePath}`;
  const history = execSync(logCommand).toString().trim().split('\n');
  return history.map((item) => {
    const match = item.match(/^(\w+)\s([\d-]+\s[\d:]+)\s(.*)$/);
    if (!match) return null; // 或者处理无法匹配的情况
    const [, commitHash, commitDate, commitMessage] = match;
    return {
      commitHash,
      commitDate,
      commitMessage,
    };
  }).filter(Boolean); // 过滤掉任何null值
}

// 获取特定版本的文件内容
const getHistoryFile=(commitHash)=> {
  const innerCodeFilePath = isDockerEnv?
    path.join('/src/components', 'PreviewPage.jsx'):
    path.join('../frontend/src/components', 'PreviewPage.jsx');
  const showCommand = `git show ${commitHash}:${innerCodeFilePath}`;
  const fileContent = execSync(showCommand).toString();
  return fileContent;
}

// 自动提交变更
const autoCommit = (commitMessage) => {
  const innerCodeFilePath = isDockerEnv?
    path.join('/src/components', 'PreviewPage.jsx'):
    path.join('../frontend/src/components', 'PreviewPage.jsx');
  try {
    execSync(`git add ${innerCodeFilePath}`);
    execSync(`git commit -m "${commitMessage}"`);
  } catch (error) {
    throw new Error(`Failed to commit changes: ${error.message}`);
  }
};

module.exports = {
  previewPageContent,
  previewPageContentShadcnUI,
    readCode,
    writeCode,
    getHistory,
    getHistoryFile,
    autoCommit,
    initCode,
};
