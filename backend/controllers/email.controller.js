import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerPython = path.resolve(__dirname, "../python/RegisterEmail.py");
const resetPasswordPython = path.resolve(
  __dirname,
  "../python/ResetPasswordEmail.py"
);

export const registerEmail = async (email, username) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [registerPython, email, username], {
      env: { ...process.env },
    });

    let output = "";

    pythonProcess.stderr.on("data", (data) => {
      console.error(`STDERR desde Python: ${data.toString()}`);
    });

    pythonProcess.stdout.on("data", (data) => {
      console.log(`STDOUT desde Python: ${data.toString()}`);
      output += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        console.log(`Respuesta Script Python: ${output.trim()}`);
        resolve(output.trim());
      } else {
        console.error(`Error al enviar el correo a: ${email}`);
        reject(new Error("Error en el script de Python"));
      }
    });

    pythonProcess.on("error", (err) => {
      console.error(`Fallo al ejecutar el proceso Python: ${err.message}`);
      reject(err);
    });
  });
};

export const sendResetPasswordEmail = async (email) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [resetPasswordPython, email], {
      env: { ...process.env },
    });

    let output = "";

    pythonProcess.stderr.on("data", (data) => {
      console.error(`STDERR desde Python (reset): ${data.toString()}`);
    });

    pythonProcess.stdout.on("data", (data) => {
      console.log(`STDOUT desde Python (reset): ${data.toString()}`);
      output += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        console.log(`Código de recuperación enviado a: ${email}`);
        resolve(output.trim());
      } else {
        console.error(`Error al enviar código a: ${email}`);
        reject(new Error("Error en el script de Python de reseteo"));
      }
    });

    pythonProcess.on("error", (err) => {
      console.error(`Fallo al ejecutar el script de reseteo: ${err.message}`);
      reject(err);
    });
  });
};
