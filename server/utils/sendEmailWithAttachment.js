import { Zip } from "zip-lib";
import nodemailer from "nodemailer";

/**
 * Creates a password-protected ZIP file from input file.
 * @param {string} inputFilePath - Path to the file to zip.
 * @param {string} outputZipPath - Path where the zip will be saved.
 * @param {string} password - Password for the zip file.
 */
export async function createPasswordProtectedZip(inputFilePath, outputZipPath, password) {
  await Zip.archiveFile(inputFilePath, outputZipPath, { password });
}

/**
 * Sends an email with attachments using Nodemailer.
 * @param {object} options - Email options
 * @param {string} options.from - Sender email
 * @param {string} options.to - Recipient email(s)
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Email text body
 * @param {Array} options.attachments - Array of attachment objects {filename, path}
 * @param {object} smtpConfig - Nodemailer SMTP config
 */
export async function sendEmailWithAttachment(options, smtpConfig) {
  const transporter = nodemailer.createTransport(smtpConfig);

  await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    attachments: options.attachments,
  });
}
