/**
 * script.js
 * ----------
 * Este archivo tiene DOS partes:
 * 1. La lista de proyectos (PROYECTOS) — esto es lo único que vas a
 *    editar cada vez que termines algo nuevo.
 * 2. El código que "renderiza" (dibuja) esa lista como tarjetas HTML,
 *    y el efecto de tipeo de la terminal del hero.
 *
 * No necesitas entender el renderizado a fondo para usar esto — con
 * saber agregar un bloque nuevo a PROYECTOS te alcanza. Pero te
 * explico igual cómo funciona, para que no sea "magia".
 */

// ==========================================================
// 1. TUS PROYECTOS — edita esta lista para agregar uno nuevo
// ==========================================================
// Cada proyecto es un objeto { } con estos campos. Copia un bloque
// completo (desde { hasta },) para agregar uno nuevo, y cambia los
// valores.
const PROYECTOS = [
    {
        nombre: "Billetera Personal",
        estado: "En producción",
        descripcion:
            "App de finanzas personales: registra ingresos y gastos, " +
            "calcula el balance y muestra gráficas por categoría. " +
            "Migrando de Google Sheets a PostgreSQL para mayor robustez.",
        tecnologias: ["Python", "Flask", "PostgreSQL", "Render"],
        acento: "var(--color-billetera)",
        github: "https://github.com/DiegoJCA125/Billetera-Personal",
        demo: "https://portafolio-dataengineering.onrender.com/",
    },
    {
        nombre: "Alertas de Empleo",
        estado: "Automatizado",
        descripcion:
            "Bot de Telegram que busca ofertas remotas cada mañana, " +
            "filtra las que aceptan candidatos desde Colombia, y " +
            "notifica solo las que no has visto antes.",
        tecnologias: ["Python", "API REST", "Telegram Bot API"],
        acento: "var(--color-empleo)",
        github: "https://github.com/DiegoJCA125/Scraper-Trabajo",
        demo: null, // este proyecto no tiene demo web — es un bot
    },
    {
        nombre: "Ejercicios de Data Engineering",
        estado: "En práctica",
        descripcion:
            "Pipelines ETL con Python y pandas, fundamentos y consultas " +
            "avanzadas de SQL, y normalización de bases de datos.",
        tecnologias: ["Python", "SQL", "Pandas", "SQLite"],
        acento: "var(--color-neutro)",
        github: "https://github.com/DiegoJCA125/Portafolio-DataEngineering",
        demo: null,
    },
    {
        // Nuevo proyecto agregado el 21/10/2026
        nombre: "ETL de Ventas con Power BI",
        estado: "Completado",
        descripcion:
            "Pipeline ETL desarrollado con Python y Pandas para generar, " +
            "limpiar y transformar datos de ventas. Incluye pruebas y " +
            "un dashboard en Power BI para visualizar indicadores.",
        tecnologias: ["Python", "Pandas", "ETL", "Power BI", "Git"],
        acento: "var(--color-neutro)",
        github: "https://github.com/DiegoJCA125/ETL_Ventas_PowerBI",
        demo: null,
    },

    // 👇 Para agregar un proyecto nuevo, copia esto y complétalo:
    //
    // {
    //     nombre: "Nombre del proyecto",
    //     estado: "En producción",
    //     descripcion: "Una o dos frases sobre qué hace y qué resuelve.",
    //     tecnologias: ["Python", "..."],
    //     acento: "var(--color-acento)", // o un color hex propio
    //     github: "https://github.com/tu-usuario/tu-repo",
    //     demo: "https://tu-demo-en-vivo.com", // o null si no tiene
    // },
];

// ==========================================================
// 2. RENDERIZADO — dibuja las tarjetas a partir de PROYECTOS
// ==========================================================

function crearTarjetaProyecto(proyecto) {
    // document.createElement crea una etiqueta HTML "vacía" en
    // memoria, que todavía no está en la página. La vamos a ir
    // llenando y al final la insertamos.
    const tarjeta = document.createElement("article");
    tarjeta.className = "proyecto";

    // style.setProperty define una VARIABLE CSS directamente desde
    // JavaScript, específica para ESTA tarjeta. Es lo que le permite
    // a cada proyecto tener su propio color sin que el CSS tenga que
    // conocer de antemano cuáles existen.
    tarjeta.style.setProperty("--acento-proyecto", proyecto.acento);

    // .map() + .join("") arma un pedacito de HTML por cada elemento
    // de una lista. Aquí, una etiqueta <span> por cada tecnología.
    const tagsHTML = proyecto.tecnologias
        .map((tec) => `<span class="proyecto__tag">${tec}</span>`)
        .join("");

    // El link de demo solo se agrega SI existe (proyecto.demo no es
    // null). El operador ternario (condición ? sí : no) decide qué
    // texto usar en cada caso.
    const demoHTML = proyecto.demo
        ? `<a href="${proyecto.demo}" target="_blank" rel="noopener">Ver demo</a>`
        : "";

    // template literals (backticks `` ` ``) permiten escribir HTML
    // multilínea e insertar variables con ${...} directamente adentro
    // — mucho más legible que concatenar strings con +.
    tarjeta.innerHTML = `
        <div class="proyecto__encabezado">
            <h3 class="proyecto__nombre">${proyecto.nombre}</h3>
            <span class="proyecto__estado">${proyecto.estado}</span>
        </div>
        <p class="proyecto__descripcion">${proyecto.descripcion}</p>
        <div class="proyecto__tags">${tagsHTML}</div>
        <div class="proyecto__links">
            <a href="${proyecto.github}" target="_blank" rel="noopener">Código</a>
            ${demoHTML}
        </div>
    `;

    return tarjeta;
}

function renderizarProyectos() {
    const contenedor = document.getElementById("proyectos-grid");

    // Por cada objeto en PROYECTOS, creamos su tarjeta y la agregamos
    // al contenedor. Si mañana PROYECTOS tiene 10 elementos en vez de
    // 3, este mismo código dibuja los 10 sin que cambies nada aquí.
    PROYECTOS.forEach((proyecto) => {
        const tarjeta = crearTarjetaProyecto(proyecto);
        contenedor.appendChild(tarjeta);
    });
}

// ==========================================================
// 3. EFECTO DE TIPEO EN LA TERMINAL DEL HERO
// ==========================================================

const LINEAS_TERMINAL = [
    { prompt: "diego@portafolio:~$ ", texto: "whoami" },
    { prompt: "", texto: "Diego Carmona — Data Engineering junior" },
    { prompt: "diego@portafolio:~$ ", texto: "cat mision.txt" },
    { prompt: "", texto: "Construir automatizaciones reales, aprendiendo por proyecto." },
];

function escribirTerminal() {
    const contenedor = document.getElementById("terminal-cuerpo");

    // Respetamos la preferencia de "menos movimiento": si la persona
    // la activó en su sistema, mostramos el texto completo de una
    // vez, sin animación letra por letra.
    const prefiereMenosMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefiereMenosMovimiento) {
        contenedor.textContent = LINEAS_TERMINAL.map(
            (linea) => linea.prompt + linea.texto
        ).join("\n");
        return;
    }

    let indiceLinea = 0;
    let indiceCaracter = 0;
    let textoActual = "";

    function escribirSiguienteCaracter() {
        if (indiceLinea >= LINEAS_TERMINAL.length) {
            return; // ya terminamos todas las líneas
        }

        const linea = LINEAS_TERMINAL[indiceLinea];
        const lineaCompleta = linea.prompt + linea.texto;

        if (indiceCaracter < lineaCompleta.length) {
            textoActual += lineaCompleta[indiceCaracter];
            indiceCaracter++;
        } else {
            // terminamos esta línea, saltamos a la siguiente
            textoActual += "\n";
            indiceLinea++;
            indiceCaracter = 0;
        }

        contenedor.innerHTML =
            textoActual + '<span class="terminal__cursor"></span>';

        // setTimeout programa que esta misma función se vuelva a
        // llamar en 25 milisegundos — así se logra el efecto de
        // "una letra a la vez" en vez de mostrar todo de golpe.
        setTimeout(escribirSiguienteCaracter, 25);
    }

    escribirSiguienteCaracter();
}

// ==========================================================
// Arrancamos todo cuando la página termina de cargar
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    renderizarProyectos();
    escribirTerminal();
});
