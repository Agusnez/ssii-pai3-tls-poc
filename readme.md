# PAI 3

## Certificados

Crear clave y firmar el certificado.
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

A continuación te preguntará por un "passphrase" para la clave privada. Si no queremos ningún "passphrase" hay que añadir `-nodes` al comando anterior.

Luego habrá que rellenar un formulario, podemos saltarnos alguna pregunta pulsando intro.
