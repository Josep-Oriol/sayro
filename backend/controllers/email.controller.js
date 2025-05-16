import { spawn } from "child_process";
import { userInfo } from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerPython = path.resolve(__dirname, "../python/RegisterEmail.py");
const loginPython = "../python/LoginEmail.py";
const restartPasswordPython = "../python/RestartPasswordEmail.py";

export const registerEmail = async (email, username) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [registerPython, email, username]);

    let output = "";

    try {
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
    } catch (error) {
      console.log(error);
    }
  });
};
