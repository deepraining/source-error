# source-error

[English Documentation](./README.en.md)

通过 map 文件查看 JavaScript 报错的原始信息.

## 快速开始

安装:

```
npm install source-error -g
```

使用:

```
source-error [options]
```

## 参数

- `-l, --line <line>`: 错误行号
- `-c, --column <column>`: 错误列号
- `-m, --map <map>`: map 文件路径 (如果是以 `http://` 或 `https://` 开头, 则会被当作 url 处理, 其他的则会被当作本地文件处理)
