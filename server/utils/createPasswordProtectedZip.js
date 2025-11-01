import { Zip } from "zip-lib";

/**
 * Creates a password-protected ZIP file from an input file.
 *
 * @param {string} inputFilePath - Path to the file to zip.
 * @param {string} outputZipPath - Path where the password-protected zip will be saved.
 * @param {string} password - Password for the zip file.
 */
export async function createPasswordProtectedZip(inputFilePath, outputZipPath) {
  try {
    const msTimestamp = inputFilePath.split('_')[0];
    const remainingFilename = inputFilePath.split('_').slice(1).join('_');

    const date = new Date(parseInt(msTimestamp, 10));
    const password = date + remainingFilename;
    await Zip.archiveFile(inputFilePath, outputZipPath, { password });
    console.log(`Password-protected zip created at: ${outputZipPath}`);
  } catch (error) {
    console.error("Error creating password-protected zip:", error);
    throw error;
  }
}

function formatTimestamp(ms) {
  const date = new Date(ms);
  return date.toISOString(); // Example output: '2025-06-05T12:30:08.592Z'
}

// Usage:
const timestamp = 1759564208592;
console.log(formatTimestamp(timestamp));

