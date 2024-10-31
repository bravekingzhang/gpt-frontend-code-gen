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

// 添加一个检查 git 仓库是否存在的函数
const isGitRepo = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// 添加一个初始化 git 仓库的函数
const initGitRepo = () => {
  if (!isGitRepo()) {
    try {
      execSync('git init');
      execSync('git config --global user.email "docker@example.com"');
      execSync('git config --global user.name "Docker User"');
      // 创建初始提交
      execSync('git add .');
      execSync('git commit -m "Initial commit"');
      return true;
    } catch (error) {
      console.warn('Git 仓库初始化失败:', error.message);
      return false;
    }
  }
  return true;
};

// 修改 getHistory 函数
const getHistory = () => {
  // 确保 git 仓库已初始化
  if (!initGitRepo()) {
    return [];
  }

  try {
    const logCommand = `git log --pretty=format:'%h %ad %s' --date=format:'%Y-%m-%d %H:%M' -- ${codeFilePath}`;
    const history = execSync(logCommand).toString().trim();
    
    // 如果没有历史记录，返回空数组
    if (!history) return [];
    
    return history.split('\n').map((item) => {
      const match = item.match(/^(\w+)\s([\d-]+\s[\d:]+)\s(.*)$/);
      if (!match) return null;
      const [, commitHash, commitDate, commitMessage] = match;
      return {
        commitHash,
        commitDate,
        commitMessage,
      };
    }).filter(Boolean);
  } catch (error) {
    console.warn('获取 git 历史记录失败:', error.message);
    return [];
  }
};

// 修改 getHistoryFile 函数，添加容错处理
const getHistoryFile = (commitHash) => {
  if (!isGitRepo()) {
    return readCode(); // 如果不是 git 仓库，返回当前文件内容
  }

  try {
    const innerCodeFilePath = isDockerEnv ?
      path.join('/src/components', 'PreviewPage.jsx') :
      path.join('../frontend/src/components', 'PreviewPage.jsx');
    const showCommand = `git show ${commitHash}:${innerCodeFilePath}`;
    const fileContent = execSync(showCommand).toString();
    return fileContent;
  } catch (error) {
    console.warn('获取历史版本文件失败:', error.message);
    return readCode(); // 发生错误时返回当前文件内容
  }
};

// 修改 autoCommit 函数，添加容错处理
const autoCommit = (commitMessage) => {
  if (!isGitRepo()) {
    console.warn('当前目录不是 git 仓库，跳过提交操作');
    return;
  }

  const innerCodeFilePath = isDockerEnv ?
    path.join('/src/components', 'PreviewPage.jsx') :
    path.join('../frontend/src/components', 'PreviewPage.jsx');
  
  try {
    execSync(`git add ${innerCodeFilePath}`);
    execSync(`git commit -m "${commitMessage}"`);
  } catch (error) {
    console.warn('提交变更失败:', error.message);
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
    initGitRepo,
};
