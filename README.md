# BSALE Shop Elis

Tienda virtual demo para desafío de admisión laboral.

Visitar: [https://elisperez.github.io/frontend-bsale-elis/](https://elisperez.github.io/frontend-bsale-elis/)

## Elis Antonio Perez

Follow me [Instagram](https://instagram.com/elisperezmusic).

## `Web developer`

**Note: God is good!**

# Documentación:

- Se creó archivo `index.html`.
- Se usó Bootstrap 5.2.2 para mostrar navbar y cards.
- La imagen `no-image.jpg` es mostrada en los productos que no tienen imagen.
- Se creó el archivo `app.js` con los scripts para llamar al back-end LOCAL y mostrarlos los datos en el index.html.

## Despliegue en GitHub Pages:

- Se creó la carpeta `docs/` con copia de los archivos index.html y app.js modificando los links que apuntan al backend en el servidor REMOTO (Heroku).

# Gracias por pasarme a esta segunda etapa. 🤩

# Feedback

- Se creó nueva rama `FEEDBACK` para agregar/probar los nuevos cambios.
- Se mejoró el diseño responsive de las cards.
- Se agregó documentación en cada pieza de código.

# Actualización por modulos. Nueva orgacización de archivos y carpetas.

- Se creó nueva rama `MODULES` para agregar/probar los nuevos cambios.
- Nueva estructura de archivos y carpetas:
  - index.html: Contiene la estructura de la pagina web y el llamado a los scripts.
  - img/no-image.jpg: Imagen mostrada en los productos que no tienen imagenes.
  - js/footer.js: Contiene función para generar HTML footer.
  - js/getItems.js: Genera contenido HTML con la info de la database.
  - js/getProductsByCategory.js: Genera contenido HTML al darle click a las categorias.
  - js/helpers: Funciona adicional que capitaliza un string.
  - js/search.js: Genera contenido HTML con los resultados de la búsqueda.
  - Carpeta `docs/`: Es para el despliegue en GitHub Pages. Se creó esta carpeta con la copia de todos los archivos cambiando los endpoints por los del server remoto. El nombre "docs" es por GitHub Pages para elegir esta carpeta para ser mostrada como root.
