# MANUAL OPERATIVO DEL SISTEMA: BLUE OCEAN & LCM
**Autor:** Luis César Monroy  
**Propósito:** Guía de consulta paso a paso para operar, conectar y resolver problemas entre GitHub, Vercel, Supabase y este entorno, sin tecnicismos ni dependencias ciegas.

---

## ÍNDICE RÁPIDO
1. [El Mapa General: ¿Qué hace cada herramienta?](#1-el-mapa-general)
2. [El Flujo de Trabajo: ¿Cómo viaja un cambio a Internet?](#2-el-flujo-de-trabajo)
3. [Vercel: Cómo verificar si tu página está viva o falló](#3-vercel-verificación-y-solución-de-errores)
4. [GitHub: Tu bóveda de seguridad donde nada se pierde](#4-github-tu-bóveda-de-seguridad)
5. [Supabase: Dónde vive la libreta de datos](#5-supabase-base-de-datos)
6. [Tus Renders y Logotipos: Dónde están guardados](#6-tus-renders-y-logotipos)
7. [Qué hacer cuando algo falla (Protocolo Anti-Pánico)](#7-protocolo-anti-pánico-sin-borrar-nada)
8. [Glosario de Botones y Palabras Raras](#8-glosario-de-términos)

---

## 1. EL MAPA GENERAL

Tu sistema está compuesto por 4 piezas que trabajan en equipo:

| Herramienta | ¿Qué es en el mundo real? | Función exacta en tu negocio |
| :--- | :--- | :--- |
| **AI Studio (Aquí)** | Tu mesa de diseño y taller de programación. | Aquí se redacta el código, se acomodan los textos, las láminas y se prueba la vista previa. |
| **GitHub** | Tu caja fuerte y almacén de archivos. | Guarda cada versión de tu proyecto. Si tu computadora explota, todo tu proyecto sigue vivo en GitHub. |
| **Vercel** | La antena transmisora y el edificio público. | Toma los archivos de GitHub y los publica en una dirección de internet (`.vercel.app`) para que cualquier hotelero la vea en su celular. |
| **Supabase** | La libreta de recepción y base de datos. | Guarda los datos de los hoteles afiliados, formularios de contacto y registros de usuarios. |

---

## 2. EL FLUJO DE TRABAJO
### ¿Cómo viaja un cambio desde tu pantalla hasta el celular de un cliente?

```
[ AI STUDIO ]  ──(Exportar/Commit)──>  [ GITHUB ]  ──(Automático)──>  [ VERCEL ]  ──(En vivo)──>  [ EL CLIENTE ]
(Tu mesa de trabajo)                 (Tu caja fuerte)                (Tu antena web)               (En internet)
```

1. **Haces o pides un cambio aquí en AI Studio** (por ejemplo: cambiar un texto o agregar una foto).
2. **Ese cambio se sube a GitHub.**
3. **Vercel detecta que GitHub tiene algo nuevo** (tarda unos 20 a 40 segundos) y automáticamente "construye" la nueva versión.
4. **El cliente entra a tu enlace web** y ya ve el cambio publicado.

---

## 3. VERCEL: VERIFICACIÓN Y SOLUCIÓN DE ERRORES

### ¿Cómo saber si tu página está bien en Vercel?
1. Entra a tu cuenta en **[vercel.com](https://vercel.com)**.
2. En tu pantalla principal (*Dashboard*), haz clic en el nombre de tu proyecto (ej: `blue-ocean` o `lcm-hotel-model`).
3. Fíjate en el estado que aparece junto al nombre:
   - **Círculo Verde / "Ready"**: Todo está perfecto. La página está viva y funcionando al 100%.
   - **Círculo Azul / "Building"**: Vercel está procesando tus archivos. Dale 30 segundos.
   - **Círculo Rojo / "Error" o "Failed"**: Algo falló durante la construcción.

### ¿Qué hacer si Vercel marca Círculo Rojo? (SIN BORRAR EL PROYECTO)
**¡NUNCA borres el proyecto!** Un error en Vercel casi siempre es una sola línea o una variable de entorno que falta.

**Pasos para ver el error:**
1. Haz clic sobre la palabra roja **"Failed"** o sobre la tarjeta con el error.
2. Se abrirá una pantalla negra con letras blancas que dice **"Building Logs"**.
3. Baja hasta las últimas 5 líneas. Busca donde dice **"Error:"**.
4. Copia esas últimas 5 líneas y pégalas en el chat de ayuda. Con solo esas líneas se sabe exactamente qué tornillo apretar en 1 minuto.

---

## 4. GITHUB: TU BÓVEDA DE SEGURIDAD

### ¿Por qué GitHub te protege de cometer errores irreversibles?
En GitHub existe algo llamado **"Historial de Commits"**.
* Cada vez que se guarda un avance, queda como una foto en el tiempo con fecha y hora.
* Si el día de mañana alguien descompone la página, **no tienes que rehacer nada**: simplemente le dices a GitHub: *"Regrésame a la versión del martes a las 3:00 PM"*, y todo vuelve a la vida tal como estaba.

---

## 5. SUPABASE: BASE DE DATOS

### ¿Qué datos necesita Vercel para conectarse a Supabase?
Para que tu página pública pueda guardar prospectos o consultar hoteles en Supabase, Vercel solo necesita dos llaves (como usuario y contraseña):

1. **`VITE_SUPABASE_URL`**: La dirección web de tu base de datos en Supabase (empieza con `https://...supabase.co`).
2. **`VITE_SUPABASE_ANON_KEY`**: La llave pública que permite a la página web escribir en la libreta sin exponer tu contraseña maestra.

### ¿Dónde se ponen esas dos llaves en Vercel?
1. En tu proyecto de Vercel, haz clic en la pestaña de arriba que dice **"Settings"** (Configuración).
2. En el menú de la izquierda, haz clic en **"Environment Variables"** (Variables de Entorno).
3. En la casilla **"Key"** escribes: `VITE_SUPABASE_URL`.
4. En la casilla **"Value"** pegas tu enlace de Supabase.
5. Das clic al botón azul **"Save"**.
6. Repites lo mismo para `VITE_SUPABASE_ANON_KEY`.

---

## 6. TUS RENDERS Y LOGOTIPOS

Todos tus archivos visuales reales están organizados en tu proyecto en dos carpetas fijas:

### Logotipo Oficial LCM:
* **Ubicación:** `/public/lcm-logo-official.jpg`
* Es la imagen del reloj con la flecha dorada y las letras LCM.

### Fachadas y Renders de Hoteles:
* **Ubicación:** `/public/renders/`
* **Fachada Principal Blue Ocean Hotel & Suites:** `Polish_20260822_225309771.jpg` (la que ahora luce en la lámina 1 de la portada).
* **Fachada Insurgentes Norte:** `Polish_20260822_230305219.jpg`
* **Fachada Boutique & Spa:** `Polish_20260822_230710090.jpg`
* **Suites Interiores y Habitaciones:** `image~10.jpg`, `image~11.jpg`, `image~12.jpg`, etc.

---

## 7. PROTOCOLO ANTI-PÁNICO (SIN BORRAR NADA)

Cuando sientas frustración, bloqueo o que algo no carga, sigue esta regla de 3 pasos:

1. **NO BORRES REPOSITORIOS NI PROYECTOS:**
   Borrar un proyecto te obliga a reconectar dominios, claves de Supabase y credenciales desde cero. Un proyecto existente siempre se repara más rápido de lo que toma volver a crearlo.
2. **REVISA LA VISTA PREVIA LOCAL PRIMERO:**
   Si en la pantalla de AI Studio funciona y en Vercel no, el problema es **100% una variable de entorno en Vercel**, no tu código.
3. **PIDE AYUDA CON UNA SOLA COSA A LA VEZ:**
   No intentes resolver diseño, base de datos y despliegue en la misma orden. Un solo tema por mensaje.

---

## 8. GLOSARIO DE TÉRMINOS

* **Deploy (Despliegue):** El acto de tomar los archivos y encender la página web en internet para que el público la vea.
* **Build (Construcción):** El proceso donde la computadora empaqueta y comprueba que no haya errores de ortografía en el código antes de publicarlo.
* **Commit:** Un punto de guardado en el tiempo (como guardar partida en un juego).
* **Repository (Repositorio):** La carpeta en GitHub donde vive tu proyecto.
* **Environment Variables (Variables de Entorno):** Las llaves secretas que no se deben poner a la vista pública (como contraseñas de bases de datos).
* **Vite / React:** El motor moderno con el que está armada la interfaz visual de tu página.
