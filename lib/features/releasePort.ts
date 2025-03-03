import { execSync } from 'node:child_process'

function releasePort(portInput: any) {
  try {
    const port = Number(portInput)

    if (!(Number.isInteger(port) && port >= 1 && port <= 65535)) {
      console.error(
        `Invalid port value: ${portInput}. Port must be an integer between 1 and 65535.`
      )
      return false
    }

    if (!isPortInUse(port)) {
      return true
    }

    // 获取占用端口的进程 ID
    const pids = getPIDs(port)
    if (pids.length === 0) {
      // 无法获取进程 ID，返回 false
      return true
    }

    // 终止进程
    killProcesses(pids)

    // 检查进程是否被成功终止
    return pids.every((pid: number) => !isProcessActive(pid))
  } catch (error) {
    console.error(error)
    return false
  }
}

// 使用 Test-NetConnection 检查端口是否被占用
function isPortInUse(port) {
  const command = `powershell -Command "Test-NetConnection -ComputerName localhost -Port ${port}"`
  const result = execSync(command, { encoding: 'utf-8' })
  // 如果输出中包含 "TcpTestSucceeded : True"，说明端口被占用
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

// 终止进程
function killProcesses(pids) {
  if (pids.length === 0) return

  pids.forEach((pid) => {
    execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' })
  })
}

// 检查进程是否仍在运行
function isProcessActive(pid) {
  const result = execSync(`tasklist /FI "PID eq ${pid}"`, { encoding: 'utf-8' })
  return result.includes(`${pid}`)
}

export default releasePort
