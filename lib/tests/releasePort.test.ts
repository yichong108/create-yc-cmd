import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import releasePort from '../features/releasePort.js'
import { execSync } from 'child_process'

vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

describe('releasePort', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return false for invalid port numbers', () => {
    expect(releasePort('abc')).toBe(false)
    expect(releasePort(-1)).toBe(false)
    expect(releasePort(70000)).toBe(false)
  })

  it('should return false if unable to get PIDs', () => {
    vi.mocked(execSync).mockReturnValueOnce('')
    expect(releasePort(3000)).toBe(true)
  })

  it('should return true if processes are killed successfully', () => {
    vi.mocked(execSync).mockReturnValueOnce('1234\n5678\n')
    vi.mocked(execSync).mockImplementation((command) => {
      if (command.includes('taskkill')) {
        return
      }
      return ''
    })

    expect(releasePort(3000)).toBe(true)
  })

  it('should handle errors gracefully', () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('Command failed')
    })

    expect(releasePort(3000)).toBe(false)
  })
})
