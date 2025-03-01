# 端口释放

这个功能可以帮助你快速释放被占用的端口，无需手动查找和终止进程。

## 使用方法

1. 运行 `create-yc-cmd`
2. 选择 "Free Port" 选项
3. 输入需要释放的端口号
4. 工具会自动查找并终止占用该端口的进程

## 工作原理

该功能使用 PowerShell 命令查找占用指定端口的进程，然后使用 `taskkill` 命令终止这些进程。

```typescript
// 使用 Test-NetConnection 检查端口是否被占用
function isPortInUse(port) {
  const command = `powershell -Command "Test-NetConnection -ComputerName localhost -Port ${port}"`
  const result = execSync(command, { encoding: 'utf-8' })
  return result.includes('TcpTestSucceeded : True')
}

// 获取占用端口的进程 ID
function getPIDs(port) {
  const command = `powershell -Command "(Get-NetTCPConnection -LocalPort ${port}).OwningProcess | Select-Object -Unique"`
  const result = execSync(command, { encoding: 'utf-8' })
  return result
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
    .map((pid) => parseInt(pid, 10))
    .filter((pid) => !isNaN(pid))
}