# git 提交代码token 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（30天有效，用于linux端提交代码） 

# 使用 Node.js 官方镜像作为基础镜像
FROM node:16.15.1 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY package*.json ./

# 安装项目依赖（虚拟机端无法连接到官方源，需设置镜像）
RUN npm install --registry https://registry.npmmirror.com

# 复制项目源代码到工作目录
COPY . .

# 打包项目
RUN npm run build

# 使用 nginx 作为生产环境的服务器
FROM nginx:alpine

# 复制构建结果到 nginx 服务器的指定目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 nginx 的默认端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
