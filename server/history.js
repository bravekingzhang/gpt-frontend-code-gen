const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const  previewPageContent =`

import { Box} from '@chakra-ui/react';

const PreviewPage = () => {
  return (
    <Box>
      <h1>New Page</h1>
      <p>Let's build something great!</p>
    </Box>
  );
}

export default PreviewPage;
`;

// 从环境变量中获取是否是 Docker 环境
const isDockerEnv =  process.env.IS_DOCKER_ENV;

console.log('isDockerEnv:', isDockerEnv)

const codeFilePath = isDockerEnv
  ? path.join(__dirname, '/src/components', 'PreviewPage.jsx')
  : path.join(__dirname, '../frontend/src/components', 'PreviewPage.jsx');

console.log('codeFilePath:', codeFilePath)

const readCode = () => {
    if (!fs.existsSync(codeFilePath)) return previewPageContent;
    return fs.readFileSync(codeFilePath, 'utf8') || previewPageContent;
};

const writeCode = (code) => {
    fs.writeFileSync(codeFilePath, code,
        { encoding: 'utf8', flag: 'w' }
    );
};

// init code
const initCode = () => {
  writeCode(previewPageContent);
}

// 获取文件变更历史,
// 返回一个数组，数组中的每个元素是一个object，包含 commitHash, commitDate, commitMessage
const getHistory=() =>{
  const logCommand = `git log --pretty=format:'%h %ad %s' --date=short -- ${codeFilePath}`;
  const history = execSync(logCommand).toString().trim().split('\n');
  return history.map((item) => {
    const [commitHash, commitDate, ...commitMessage] = item.split(' ');
    return {
      commitHash,
      commitDate,
      commitMessage: commitMessage.join(' '),
    };
  });
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
    readCode,
    writeCode,
    getHistory,
    getHistoryFile,
    autoCommit,
    initCode,
};
