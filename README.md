# 项目名称

这是一个使用 React 和 Vite 构建的前端项目，配合 Koa 框架的后端服务，实现了一个前端页面生成并预览的功能，而且基于对话，可以不断调整页面效果。前端使用了 Chakra UI 作为 UI 框架，提供了良好的用户体验和界面设计。

## 功能特性

- **代码生成**：用户可以通过输入提示信息，调用后端服务生成代码。
- **实时预览**：支持实时预览生成的代码效果。
- **对话式调整**：支持对话式调整页面效果，爽得很。
- **代码分享**：支持将生成的代码分享给他人。

## TODO

- [ ] 支持更多的代码生成模板，如 Vue 的生成。
- [ ] 支持 Flutter 生成并预览效果。
- [ ] 支持代码显示，手动编辑代码，编辑器支持代码自动提示，补全。

## 技术栈

- 前端：React, Chakra UI, vite
- 后端：Koa

## 快速开始

### 前提条件

确保你的开发环境中已安装 Node.js 和 Docker（可选）。

### 安装依赖

在项目的根目录下，分别为前端和后端安装依赖：

```sh
# 安装前端依赖
cd frontend
npm install
npm run dev
```

```sh

# 安装后端依赖
cd ../server
npm install
npm run dev
```

打开浏览器，访问 `http://localhost:9000`，即可看到前端页面，配置自己的 APIKey，和 BaseUrl。就可以愉快的玩耍了。


## docker 一键启动

这应该是最简单的方式了，只需要安装 docker 和 docker-compose，然后执行以下命令即可。

```sh
docker-compose up -d --build
```

**注意** ，gemini-pro 模型请对接`one-api`，因为项目对标标准的 openai 的接口，所以需要对接`one-api`。

