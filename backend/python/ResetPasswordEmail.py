import sys
import smtplib
import os
import random
import string
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

def generar_codigo(longitud=6):
    return ''.join(random.choices(string.digits, k=longitud))

if len(sys.argv) < 2:
    print("Error: se necesita un email")
    sys.exit(1)

destinatario = sys.argv[1]
codigo = generar_codigo()

# Guardar código temporalmente (aquí lo simulamos)
with open("reset_codes.txt", "a") as f:
    f.write(f"{destinatario}:{codigo}\n")

emailEmisor = os.getenv('EMAIL_SENDER')
emailContrasenya = os.getenv('EMAIL_PASSWORD')

asunto = 'Sayro - Código de recuperación'
cuerpo = f"""
Hola,

Hemos recibido una solicitud para restablecer tu contraseña.

Tu código de verificación es: {codigo}

Si no solicitaste esto, puedes ignorar este correo.

El equipo de Sayro
"""

msg = EmailMessage()
msg['Subject'] = asunto
msg['From'] = emailEmisor
msg['To'] = destinatario
msg.set_content(cuerpo)

try:
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()
    servidor.login(emailEmisor, emailContrasenya)
    servidor.send_message(msg)
    servidor.quit()
    print("Correo enviado")
except Exception as e:
    print(f"Error al enviar correo: {e}")
    sys.exit(1)
