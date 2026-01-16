# 🐺 LOBO STORE - Tienda Online

Tienda de vestimenta y calzado con diseño urbano y moderno.

## 📁 Estructura del Proyecto

```
lobo-store/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── app.js          # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## 🚀 Instalación

1. **Crea las carpetas del proyecto:**
   ```bash
   mkdir lobo-store
   cd lobo-store
   mkdir css js
   ```

2. **Crea los archivos:**
   - Copia el contenido de `index.html` en un archivo llamado `index.html` en la raíz
   - Copia el contenido de `styles.css` en `css/styles.css`
   - Copia el contenido de `app.js` en `js/app.js`

3. **Abre el proyecto:**
   - Simplemente abre `index.html` en tu navegador
   - O usa Live Server en VS Code para desarrollo

## ⚙️ Configuración

### Cambiar Número de WhatsApp

En el archivo `js/app.js`, busca la línea 339:

```javascript
const whatsappNumber = '5491112345678'; // Cambiar aquí
```

Reemplázala con tu número en formato internacional (sin espacios, guiones ni +):
- Argentina: `54911` + tu número
- México: `52` + tu número
- España: `34` + tu número

**Ejemplo:** Para el número argentino +54 9 11 1234-5678, usar: `5491112345678`

### Personalizar Textos

En `index.html`, puedes cambiar:

**Nombre de la tienda** (línea ~52):
```html
<h1 class="font-display text-2xl...">LOBO STORE</h1>
```

**Eslogan** (línea ~53):
```html
<p class="text-xs text-gray-400">Estilo Urbano & Audaz</p>
```

**Descripción del Hero** (línea ~86):
```html
<p class="text-gray-300...">Desata tu estilo. Vestimenta y calzado de actitud.</p>
```

### Cambiar Colores

En `css/styles.css`, modifica las variables CSS (líneas 7-15):

```css
:root {
    --color-primary: #dc2626;       /* Color principal (rojo) */
    --color-secondary: #ef4444;      /* Color secundario */
    --color-dark: #1a1a2e;          /* Fondo oscuro */
    /* ... más colores ... */
}
```

## 🎨 Características

✅ **Diseño responsive** - Se adapta a móviles, tablets y desktop
✅ **Carrito de compras** - Funcional con cantidades
✅ **Categorías** - Ropa, Calzado, Accesorios
✅ **Búsqueda** - En tiempo real
✅ **Persistencia** - Los productos se guardan en el navegador
✅ **WhatsApp** - Envío automático de pedidos
✅ **Gestión completa** - Agregar, editar y eliminar productos

## 📱 Funcionalidades

### Para Clientes:
- Ver catálogo de productos
- Filtrar por categorías
- Buscar productos
- Agregar al carrito
- Modificar cantidades
- Enviar pedido por WhatsApp

### Para Administradores:
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos
- Los cambios se guardan automáticamente

## 🛠️ Personalización Avanzada

### Agregar Más Categorías

En `index.html`, agrega un nuevo botón de categoría (línea ~116):

```html
<button onclick="filterCategory('nuevacategoria')" class="chip" data-category="nuevacategoria">
    🎯 NUEVA CATEGORÍA
</button>
```

En `js/app.js`, actualiza la función `getCategoryLabel` (línea ~95):

```javascript
const labels = {
    ropa: 'ROPA',
    calzado: 'CALZADO',
    accesorios: 'ACCESORIOS',
    nuevacategoria: 'NUEVA CATEGORÍA'  // Agregar aquí
};
```

### Agregar Más Emojis

En `index.html`, dentro del modal (línea ~266), agrega más botones:

```html
<button type="button" onclick="selectEmoji('🎒')" class="emoji-btn">🎒</button>
<button type="button" onclick="selectEmoji('⌚')" class="emoji-btn">⌚</button>
```

## 💾 Productos de Ejemplo

El proyecto incluye 4 productos de ejemplo. Puedes eliminarlos o modificarlos desde la interfaz, o cambiarlos en `js/app.js` (líneas 8-48).

## 🌐 Despliegue

### Opción 1: GitHub Pages (Gratis)
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main
4. Tu sitio estará en `https://tuusuario.github.io/lobo-store`

### Opción 2: Netlify (Gratis)
1. Crea una cuenta en netlify.com
2. Arrastra la carpeta del proyecto
3. Tu sitio estará en `https://tu-sitio.netlify.app`

### Opción 3: Vercel (Gratis)
1. Crea una cuenta en vercel.com
2. Importa el proyecto desde GitHub
3. Despliegue automático

## 🐛 Solución de Problemas

**Los productos no se guardan:**
- Verifica que el navegador permita localStorage
- Abre la consola (F12) y busca errores

**WhatsApp no abre:**
- Verifica que el número esté en formato correcto
- Prueba el formato: código país + número (sin espacios)

**Los estilos no se cargan:**
- Verifica que la carpeta `css` esté en la raíz del proyecto
- Revisa las rutas en el `index.html`

**JavaScript no funciona:**
- Abre la consola del navegador (F12)
- Verifica que `app.js` esté en la carpeta `js/`

## 📞 Soporte

Para dudas o problemas:
- Revisa la consola del navegador (F12) en busca de errores
- Verifica que todos los archivos estén en las carpetas correctas
- Asegúrate de que las rutas en `index.html` sean correctas

## 📄 Licencia

Este proyecto es de código abierto. Puedes modificarlo y usarlo libremente para tu emprendimiento.

---

**¡Listo para vender! 🐺🔥**

Recuerda personalizar:
1. ✅ Número de WhatsApp
2. ✅ Nombre de la tienda
3. ✅ Productos
4. ✅ Colores (opcional)