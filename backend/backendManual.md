los primeros pasos fue realizar la conexion a la base de datos , los paquetes requeridos fueron los siguientes :
npm install express mssql dotenv

Nodemon: Es una herramienta de desarrollo que reinicia automáticamente tu servidor Node.js cuando detecta cambios en los archivos del proyecto. No tiene nada que ver con la funcionalidad de la aplicación ni con la comunicación en tiempo real.

Socket.IO: Es una biblioteca para permitir la comunicación en tiempo real entre el cliente y el servidor. Se utiliza en la aplicación para enviar y recibir datos sin necesidad de recargar la página.

en este caso usaremos primero nodemon

que hace nodemon :
    Monitoreo de archivos: Nodemon supervisa todos los archivos en tu proyecto por defecto. Cuando detecta cambios en cualquiera de ellos (por ejemplo, si guardas un archivo .js después de editarlo), automáticamente reinicia el servidor Node.js.

    Compatibilidad con diferentes tipos de archivos: Aunque Nodemon supervisa principalmente archivos JavaScript, también puedes configurarlo para que supervise otros tipos de archivos o ignorar algunos archivos específicos.

elementos estaticos en nodejs , que son?
Node.js ofrece una forma muy sencilla de crear un pequeño servidor para servir archivos estáticos sin necesidad de recurrir a la instalación de dependencias como express.

Por ejemplo, para crear un servidor que sirva un fichero index.html podemos utilizar este código utilizando, simplemente, las dependencias nativas de Node.js fs y http.



modo de ejecucion del proyecto:
nodemon app.js
