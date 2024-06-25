const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const axios = require("axios");

//config cors ,allow all
const cors = require("@koa/cors");

const { readCode, writeCode,getHistory,getHistoryFile, autoCommit,initCode } = require("./history");

const app = new Koa();
const router = new Router();

// 中间件
app.use(bodyParser());
app.use(cors());

// 处理 GPT 请求的路由
router.post("/generate-code", async (ctx) => {
  const { prompt, apiKey, baseUrl, model } = ctx.request.body;

  try {
    const currentCode = readCode();

    const detailedPrompt = `
Blow is the existing code，I wrapped it in a code block for better readability:
\`\`\`jsx
${currentCode}
\`\`\`

Please make the following changes:
${prompt}

Return the complete and functional implementation code without any additional explanations and any markdown code block markers.
`;

    // 构建请求数据
    const messages = [
      {
        role: "system",
        content: `You are a professional front-end developer. Only provide the complete and functional implementation code without any additional explanations and any markdown code block markers, whether modifying existing code or writing from scratch.
                always use React + Chakra UI for the implementation.`,
      },
      { role: 'user', content: detailedPrompt }
    ];

    const requestData = {
      messages,
      model,
      max_tokens: 4096,
    };

    // 发送请求给 GPT
    const response = await axios.post(
      `${baseUrl}/v1/chat/completions`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const updatedCode = response.data.choices[0].message.content.replace(/```jsx|```/g, '').trim();
    // 更新代码
    writeCode(updatedCode);
    // 自动提交变更
    autoCommit(`feat:${prompt}`);

    ctx.body = {
      success: true,
      code:updatedCode,
    };
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取当前代码，返回给前端
router.get("/get-code", async (ctx) => {
  const code = readCode();
  ctx.body = {
    code,
  };
});

// 前端更新代码后，保存到本地
router.post("/update-code", async (ctx) => {
  const { code } = ctx.request.body;
  writeCode(code);
  ctx.body = {
    success: true,
  };
});

// 获取文件变更历史
router.get("/get-history", async (ctx) => {
  const history = getHistory();
  ctx.body = {
    history,
  };
});

// 获取特定版本的文件内容
router.get("/get-history-file/:commitHash", async (ctx) => {
  const { commitHash } = ctx.params;
  const fileContent = getHistoryFile(commitHash);
  ctx.body = {
    fileContent,
  };
});

// 新开始需求
router.post("/new-page", async (ctx) => {
  initCode();
  ctx.body = {
    success: true,
  };
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
