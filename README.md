
<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">The Lazy Coder</h3>

  <p align="center">
    a social network meant for programmers
    <br />
    <a href="https://the-lazy-coder.netlify.app"><strong>Explore the web »</strong></a>
    <br />
    <br />
    <a href="https://github.com/andhalaya">View Demo</a>
    ·
    <a href="https://github.com/andhalaya">Report Bug</a>
    ·
    <a href="https://github.com/andhalaya">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#about-the-project">About Lazy Coder</a>
      <ul>
        <li><a href="#caracteristicas">Caracteristicas principales</a></li>
      </ul>
    </li>
    <li>
      <a href="#imagenes">Imagenes</a>
    </li>
    <li><a href="#dependencias">Dependencias frontend</a></li>
    <li>
        <a href="#instalacionyejecucion">Instalación y ejecución</a>
        <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
        </ul>
    </li>
    <li><a href="#api">Api</a></li>
    <li><a href="#contribucion">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About Lazy Coder

The Lazy Coder es una plataforma web social para programadores, diseñada para compartir opiniones, hacks, código y proyectos, así como para conectar con otros programadores y formar una comunidad para aprender y desarrollarse en el mundo de la programación.
Ha sido construida con un diseño sencillo a la vez que intuitivo.

### Características principales
* Publicación de contenido: Comparte tus opiniones, ideas, proyectos y código con otros programadores de todo el mundo.
* Interacción social: Comenta y da like a publicaciones de otros programadores para fomentar la interacción y el intercambio de conocimientos.
* Conexión con otros programadores: Encuentra y sigue a otros programadores con intereses similares.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Imágenes 

Aquí hay algunas capturas de pantalla de la página web Lazy Coder:

![Captura de pantalla 1](/public/login-page.png)
_Captura de pantalla de la página login._

![Captura de pantalla 2](/public/home-page.png)
_Captura de pantalla de la página home._

![Captura de pantalla 3](/public/profile-page.png)
_Captura de pantalla de la página profile._

![Captura de pantalla 3](/public/chat.png)
_Captura de pantalla de la página chat._

## Dependencias frontend

Para este proyecto se han utilizado las siguientes dependencias:



| Dependencia               | Descripción                                                                                   |
|---------------------------|-----------------------------------------------------------------------------------------------|
| [Axios](https://github.com/axios/axios)                    | Para realizar peticiones HTTP desde el frontend.                                                |
| [React](https://reactjs.org/)                              | Biblioteca JavaScript para construir interfaces de usuario.                                      |
| [Vite](https://vitejs.dev/)                                | Herramienta de compilación ultrarrápida para proyectos web con React.                            |
| [react-dom](https://reactjs.org/docs/react-dom.html)       | Ofrece métodos específicos del DOM que son independientes del navegador.                         |
| [react-dropzone](https://github.com/react-dropzone/react-dropzone) | Componente de carga de archivos para React.                                                   |
| [Moment.js](https://momentjs.com/)                        | Librería para manipular, mostrar y analizar fechas y horas en JavaScript.                         |
| [React Quill](https://github.com/zenoamaro/react-quill)    | Editor de texto enriquecido para React.                                                        |
| [React Router DOM](https://reactrouter.com/web/guides/quick-start) | Navegación declarativa y basada en componentes para React.                                      |
| [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) | Componente para resaltar la sintaxis de código en React.                                   |
| [Socket.IO](https://socket.io/)                            | Librería para comunicación en tiempo real entre clientes y servidores.                            |
| [dotenv](https://github.com/motdotla/dotenv)              | Módulo para cargar variables de entorno desde un archivo `.env`.                                   |
| [Framer Motion](https://www.framer.com/motion/)            | Librería para crear animaciones en React.                                                        |


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Instalación y ejecución

### Prerequisitos
Para este proyecto es necesario tener la url de la api en el archivo .env bajo el nombre de VITE_APP_API_URL, asi como una cuenta en alguna base de datos como MongoDb. Puedes visitar el repositorio para el backend [aqui](https://github.com/Andhalaya/app-server). 

### Instalación

Estos son los pasos a seguir para instalar y ejecutar el proyecto localmente. 

1. Clonar el repositorio:
    ```bash
   git clone https://github.com/andhalaya/the-lazy-coder
2. Instalar dependencias:
   ```sh
   cd the-lazy-coder
   npm install
   ```
3. Configurar variables de entorno: Si es necesario, configura las variables de entorno en un archivo .env en la raíz del proyecto.
    ```js
    const VITE_APP_API_URL = 'ENTER YOUR API';
    ```
   
4. Iniciar la aplicación:
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- api -->
## API

Puedes visitar el repositorio de la API usada en este proyecto en el siguiente enlace:

[http://github.com/Andhalaya/app-server](http://github.com/Andhalaya/app-server)

Tambien puedes consumir la API directamente [aqui](https://app-server-production-1cf6.up.railway.app), pero recuerda que es necesario un bearer token para poder acceder a algunos de sus recursos ya que la mayoria de las rutas estan protegidas. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## En construcción 🚧

Estos son algunos de los features pendientes por añadir:
* Sección de notificaciones en el icono del header
* Enlaces a los ultimos proyectos del usuario en el userBox de la página home
* Project box en la página Profile con los projectos del usuario. Actualmente aparecen los de todos los usuarios a falta de contenido suficiente.
* Notificación de mensaje recibido en la zona de chat.
* Añadir sección About me editable.

<!-- CONTRIBUTING -->
## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/feature-name`).
3. Realiza tus cambios y haz commits con mensajes descriptivos.
4. Sube tus cambios a tu fork (`git push origin feature/feature-name`).
5. Realiza un pull request a la rama `main` del repositorio original.

Asegúrate de seguir las pautas de contribución y de respetar el código de conducta del proyecto. ¡Gracias por contribuir!

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT). Puedes leer el archivo [LICENSE](LICENSE) para más detalles.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
