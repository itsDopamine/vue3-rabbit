const http = require('http');

// 从环境变量中获取端口号，如果未设置则使用默认端口3000
const PORT = process.env.PORT || 3000;

// 创建一个服务器
const server = http.createServer((req, res) => {
    const port = server.address().port;
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`来自端口为【${port}】的服务的响应\n`);
});

// 监听指定的端口
server.listen(PORT, () => {
    console.log(`服务器正在监听端口【${PORT}】`);
});