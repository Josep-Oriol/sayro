import sys
import smtplib
from email.message import EmailMessage

if len(sys.argv) < 3:
    print("Error: se necesitan email y username como argumentos")
    sys.exit(1)

destinatario = sys.argv[1]
usuario = sys.argv[2]

emailEmisor = 'uridevhub@gmail.com'
emailContrasenya = 'yzdb adho aulq lcel'
smtpServidor = 'smtp.gmail.com'
smtpPuerto = 587

asunto = 'Sayro - Registro completado'
cuerpo = f'¡Bienvenido a la plataforma {usuario}!\n\nGracias por registrarte. Tu cuenta ha sido creada con éxito.'

msg = EmailMessage()
msg['Subject'] = asunto
msg['From'] = emailEmisor
msg['To'] = destinatario
msg.set_content(cuerpo)

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
except Exception as e:
    print(f"Error al enviar el correo: {e}")
    sys.exit(1)
