# Port Release

This feature helps you quickly release occupied ports without manually searching for and terminating processes.

## Usage

1. Run `create-yc-cmd`
2. Select the "Free Port" option
3. Enter the port number you want to release
4. The tool will automatically find and terminate the processes occupying the port

## How It Works

This feature uses PowerShell commands to find processes occupying the specified port and then uses the `taskkill` command to terminate these processes.

```typescript
// Use Test-NetConnection to check if the port is in use
function isPortInUse(port) {
  const command = `powershell -Command "Test-NetConnection -ComputerName localhost -Port ${port}"`
  const result = execSync(command, { encoding: 'utf-8' })
  return result.includes('TcpTestSucceeded : True')
}

// Get the process IDs that occupy the port
function getPIDs(port) {
  const command = `powershell -Command "(Get-NetTCPConnection -LocalPort ${port}).OwningProcess | Select-Object -Unique"`
  const result = execSync(command, { encoding: 'utf-8' })
  return result
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
    .map((pid) => parseInt(pid, 10))
    .filter((pid) => !isNaN(pid))
}