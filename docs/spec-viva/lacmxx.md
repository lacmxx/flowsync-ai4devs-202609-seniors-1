# Autenticación y gestión de sesión

## Purpose
Permite que una persona cree una cuenta, inicie sesión y mantenga su sesión activa mientras usa la aplicación, de forma que solo quien se ha identificado correctamente pueda consultar los datos de su propio perfil.

## Requirements

### Requirement: Registro de cuenta
El sistema SHALL permitir que una persona sin cuenta cree una cuenta nueva indicando email, contraseña y su confirmación, con el nombre completo como dato opcional, e iniciarle sesión automáticamente al completarse.

#### Scenario: Registro con datos válidos
- **WHEN** una persona sin cuenta envía un email no registrado previamente, una contraseña de entre 8 y 32 caracteres y la repite igual en el campo de confirmación.
- **THEN** el sistema crea la cuenta, la deja con sesión iniciada y la lleva a la pantalla de su perfil.

#### Scenario: Registro sin nombre completo
- **WHEN** una persona se registra dejando vacío el campo de nombre.
- **THEN** el sistema crea la cuenta igualmente, y su perfil muestra "Sin nombre" en lugar de un nombre.

#### Scenario: Email ya registrado
- **WHEN** una persona intenta registrarse con un email que ya pertenece a otra cuenta.
- **THEN** el sistema rechaza la solicitud, no crea ninguna cuenta y muestra junto al campo de email el mensaje "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Las contraseñas no coinciden
- **WHEN** el contenido del campo de confirmación de contraseña no es idéntico al de la contraseña.
- **THEN** el sistema no envía el registro y muestra "Las contraseñas no coinciden." junto al campo de confirmación.

#### Scenario: Contraseña fuera del rango permitido
- **WHEN** la contraseña introducida tiene menos de 8 o más de 32 caracteres.
- **THEN** el sistema rechaza la solicitud y muestra un mensaje sobre la longitud permitida junto al campo de contraseña.

#### Scenario: Email con formato inválido
- **WHEN** el texto introducido en el campo de email no tiene forma de dirección de correo.
- **THEN** el sistema rechaza la solicitud y muestra "Introduce una dirección de email válida." junto al campo de email.

### Requirement: Inicio de sesión
El sistema SHALL permitir que una persona con cuenta existente inicie sesión con su email y contraseña, y SHALL rechazar el intento sin revelar si el email introducido pertenece o no a una cuenta.

#### Scenario: Inicio de sesión con credenciales correctas
- **WHEN** una persona con cuenta introduce su email y su contraseña correctos.
- **THEN** el sistema inicia sesión y la lleva a la pantalla de su perfil.

#### Scenario: Credenciales incorrectas
- **WHEN** el email no corresponde a ninguna cuenta, o corresponde a una cuenta pero la contraseña no es la suya.
- **THEN** el sistema no inicia sesión y muestra el mismo mensaje en ambos casos, "El email o la contraseña no son correctos.", sin indicar cuál de los dos campos falló.

### Requirement: Sesión persistente
El sistema SHALL mantener a una persona con sesión iniciada identificada al recargar o reabrir la aplicación, y SHALL cerrarle la sesión únicamente cuando confirme que su credencial ya no es válida.

#### Scenario: Recarga de página con sesión válida
- **WHEN** una persona con sesión iniciada recarga la página o vuelve a abrir la aplicación.
- **THEN** el sistema la mantiene identificada y le muestra directamente su perfil, sin pedirle iniciar sesión de nuevo.

#### Scenario: Recarga con sesión inválida
- **WHEN** se confirma que la credencial guardada en el navegador ya no es válida.
- **THEN** el sistema cierra la sesión localmente y, si la persona intenta acceder a una pantalla que requiere sesión, la lleva a la pantalla de inicio de sesión mostrando "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Recarga sin poder confirmar la sesión
- **WHEN** el sistema no logra comunicarse para confirmar la credencial guardada.
- **THEN** conserva la credencial guardada sin darla por inválida de forma permanente, pero mientras tanto trata a la persona como no identificada y, si esta intenta iniciar sesión, le muestra "No hemos podido restaurar tu sesión."

### Requirement: Cierre de sesión
El sistema SHALL permitir que una persona con sesión iniciada la cierre de forma explícita.

#### Scenario: Cerrar sesión
- **WHEN** una persona con sesión iniciada pulsa "Cerrar sesión" desde su perfil.
- **THEN** el sistema invalida su credencial, borra la sesión de su navegador y la lleva a la pantalla de inicio de sesión.

### Requirement: Acceso restringido a la información propia
El sistema SHALL exigir una sesión iniciada para acceder al perfil, y SHALL impedir a quien ya tiene sesión iniciada volver a ver las pantallas de registro o de inicio de sesión.

#### Scenario: Acceso al perfil sin sesión iniciada
- **WHEN** una persona sin sesión iniciada intenta acceder directamente a la pantalla de perfil.
- **THEN** el sistema la redirige a la pantalla de inicio de sesión.

#### Scenario: Acceso a registro o inicio de sesión con sesión ya iniciada
- **WHEN** una persona con sesión iniciada intenta acceder a las pantallas de registro o de inicio de sesión.
- **THEN** el sistema la redirige a su perfil.

#### Scenario: Petición de datos protegidos sin credencial válida
- **WHEN** se solicitan los datos del perfil o se pide cerrar sesión sin una credencial de acceso válida.
- **THEN** el sistema rechaza la petición sin devolver ningún dato.

### Requirement: Consulta del perfil propio
El sistema SHALL mostrar a la persona con sesión iniciada su nombre, sus iniciales, su email y la fecha en la que se dio de alta, sin exponer su contraseña en ningún momento.

#### Scenario: Ver el perfil propio
- **WHEN** una persona con sesión iniciada abre la pantalla de perfil.
- **THEN** ve su nombre completo (o "Sin nombre" si no lo indicó al registrarse), sus iniciales, su email y la fecha en la que se registró.

| Requisitos / Scenarios creados agente | Requisitos / Scenarios probados manualmente |
|-------------------------------|---------------------|
| 6 / 16 | 4 / 10 |

| Incoherencias encontradas | Explicacion |
|---------------------------|-------------|
| Sesión persistente → Recarga sin poder confirmar la sesión| La spec dice que en ese caso se muestra "No hemos podido restaurar tu sesión." Apagué el backend con una sesión válida en el navegador y recargué /profile: el mensaje real es "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." — el mismo texto genérico de cualquier fallo de red. Revisando frontend/src/lib/api.ts:125-130, cualquier fallo de fetch se envuelve siempre en un ApiError; y en auth-provider.tsx:72-76, el mensaje "No hemos podido restaurar tu sesión." solo se usa cuando el error no es instancia de ApiError — algo que nunca ocurre en este flujo. Es código muerto: ese mensaje nunca llega a verse por esta vía |
| Escenario "Inicio de sesión → Credenciales incorrectas" incompleto/impreciso| La spec afirma que el sistema "muestra el mismo mensaje en ambos casos... sin indicar cuál de los dos campos falló" para cualquier intento fallido. Eso solo es cierto cuando ambos campos llevan contenido. Probé login con password vacío (tanto por API directa como rellenando el formulario y dejando el campo en blanco): la respuesta no es la genérica de credenciales inválidas, sino un 422 con "Falta rellenar la contraseña.", señalando explícitamente el campo — justo lo que la spec dice que el sistema evita hacer. |


| Bug o contrato |Explicación|
| ---------------|---|
|"Nombre completo como dato opcional" es impreciso a nivel de API|Probé el signup omitiendo por completo la clave fullName del payload (no solo dejándola vacía): el backend la rechaza con 422, "The fullName field must be defined". El campo no es opcional en el sentido de "puede omitirse" — es nullable() pero no optional(), así que la clave debe viajar siempre (aunque sea null). Desde la interfaz esto nunca se nota porque el frontend siempre manda la clave, pero la frase "dato opcional" tal como está en el Requirement generaliza más de lo que el sistema realmente permite.|