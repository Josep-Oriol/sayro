import sys
import smtplib
import re
from email.message import EmailMessage
from dotenv import load_dotenv
import os

# Cargar variables del archivo .env
load_dotenv()

# Validar argumentos
if len(sys.argv) < 3:
    print("Error: se necesitan email y username como argumentos")
    sys.exit(1)

destinatario = sys.argv[1]
usuario = sys.argv[2]

# Validar formato de email
def es_email_valido(correo):
    return re.match(r"[^@]+@[^@]+\.[^@]+", correo)

if not es_email_valido(destinatario):
    print("Error: dirección de correo no válida")
    sys.exit(1)

# Configuración del correo
emailEmisor = os.getenv('EMAIL_SENDER')
emailContrasenya = os.getenv('EMAIL_PASSWORD')
smtpServidor = 'smtp.gmail.com'
smtpPuerto = 587

asunto = 'Sayro - Registro completado'

html = f"""
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
      <h2 style="color: #2c3e50;">¡Bienvenido, {usuario}!</h2>
      <p>Gracias por registrarte en Sayro. Tu cuenta ha sido creada con éxito.</p>
      <p>Puedes comenzar a explorar la plataforma y conectarte con otros usuarios.</p>
      <a href="http://localhost:5173/" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px;">Ir a Sayro</a>
      <p style="margin-top: 30px; color: #888;">El equipo de Sayro</p>
    </div>
  </body>
</html>
"""

msg = EmailMessage()
msg['Subject'] = asunto
msg['From'] = emailEmisor
msg['To'] = destinatario
msg.set_content(f"¡Bienvenido {usuario}!\nGracias por registrarte en Sayro.")
msg.add_alternative(html, subtype='html')

try:
    print("Conectando...")
    servidor = smtplib.SMTP(smtpServidor, smtpPuerto)
    servidor.starttls()
    print("Autenticando...")
    servidor.login(emailEmisor, emailContrasenya)
    print("Enviando correo...")
    servidor.send_message(msg)
    print(f"Correo enviado a {destinatario}")
    servidor.quit()
except smtplib.SMTPAuthenticationError:
    print("Error: Falló la autenticación. Verifica el correo y contraseña.")
    sys.exit(1)
except Exception as e:
    print(f"Error al enviar el correo: {e}")
    sys.exit(1)
