import { parseTypeScriptFile } from '@elfsquad/tsdoc-parser';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Recursively traverses a directory and executes a callback for every file.
 * @param dir - The root directory path to start from.
 * @param callback - Function to run on each found file path.
 */
async function walk(dir: string, callback: (filePath: string) => Promise<void> | void): Promise<void> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // If it's a directory, go deeper
        await walk(fullPath, callback);
      } else if (entry.isFile()) {
        // If it's a file, run the function
        await callback(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
}

// Usage:
const targetDir = '../../src';
walk(targetDir, (filePath) => {
  console.log(`Processing: ${filePath}`);
  const tsDocComments = parseTypeScriptFile(filePath, undefined);
  console.log(JSON.stringify(tsDocComments));
});
