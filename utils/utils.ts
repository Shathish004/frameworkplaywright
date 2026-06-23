import fs from 'fs'

export function readJsonFile<T>(filepath: string): T {
  return JSON.parse(fs.readFileSync(filepath, 'utf-8')) as T
}
