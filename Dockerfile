# node 镜像
# apline 版本的 node 镜像会小很多
FROM node:18 as build-stage

# 在容器中创建目录
RUN mkdir -p /app

# 指定工作空间，后面的指令都会在当前目录下执行
WORKDIR /app

# 解释说明：
# 1、Docker 镜像是分层的。Dockerfile 中的每个指令都会创建一个新的镜像层，每个 RUN 都是一个指令
# 2、当 Dockerfile 的指令修改了，或者复制的文件变化了，或者构建镜像时指定的变量变化了，对应的镜像层缓存就会失效
# 3、而某一层的镜像缓存失效之后，它之后的镜像层缓存都会失效
# 4、镜像层是不可变的，如果我们在某一层中添加一个文件，然后在下一层中删除它，则镜像中依然会包含该文件(只是这个文件在 Docker 容器中不可见了)。
# 5、所以我们先拷贝 package.json，然后 RUN npm i 安装依赖，形成一个镜像层，再拷贝其他所有文件，形成一个镜像层；
    # 之后如果代码有所变动，但是 package.json 没有变动，再次执行时，就不会再安装依赖了，可以节省很多时间。
    # package.json 有变动，才会重新执行 RUN npm i 安装依赖。

# 拷贝 package.json、package-lock.json 或者 yarn.lock
COPY package.json *.lock ./

# 设置 npm 源
RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN npm install

# 拷贝其他所有文件到容器（除了 .dockerignore 中的目录和文件）
COPY . .

# build 项目
RUN npm run build

# nginx 镜像
FROM nginx:alpine

# 复制 build 后的文件到 nginx 的指定目录（/usr/share/nginx/html）
COPY --from=build-stage app/dist/ /usr/share/nginx/html

# 用本地的 default.conf 配置来替换 nginx 镜像里的默认配置
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 运行容器时执行命令
# 容器启动时执行的那条入口命令一旦结束了，容器也会结束。所以需要将守护关闭，让 nginx 后台运行。
CMD ["nginx", "-g", "daemon off;"]


