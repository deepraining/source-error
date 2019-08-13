# s-stack

[中文文档](./README.md)

To see the original information of JavaScript error through map file.

## quick start

Install:

```
npm install s-stack -g
```

Usage:

```
s-stack [options] <dir> [extraDirs...]
```

## options

- `-l, --line <line>`: error line
- `-c, --column <column>`: error column
- `-m, --map <map>`: map file path (if starts with `http://` or `https://`, it will be treated as url, any others will be treated as local file path)
