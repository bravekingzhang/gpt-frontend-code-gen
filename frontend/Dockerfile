# 使用官方 Node 镜像作为基础镜像, 使用 alpine 版本
FROM node:20.10.0-alpine

# 设置工作目录
WORKDIR /app

# 拷贝 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝所有源代码到工作目录
COPY . .

# 构建生产环境下的应用
RUN npm run build

# 暴露端口
EXPOSE 9000

# 运行应用
CMD ["npm", "start"]
