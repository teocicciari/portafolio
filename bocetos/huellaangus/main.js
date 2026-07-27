/* ============================================================
   LA HUELLA ANGUS — catálogo dinámico de toros
   Datos de ejemplo (ilustrativos) para mostrar el funcionamiento
   del catálogo — reemplazar por la genealogía y los DEP reales
   de cada toro antes de publicar.
   ============================================================ */

const TOROS = [
  {
    id: "lha-01",
    lote: "Lote 01",
    nombre: "Pampero",
    img: "img/toro1.png",
    padre: "Sancho Panza",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-08-14",
    pesoNacer: "36 kg",
    registro: "LHA 231-01",
    epd: { CED: 11, BW: 1.2, WW: 62, YW: 108, MARB: 0.52, REA: 0.44, DOC: 21, W: 74, B: 131 },
    resena: "Cuerpo profundo y buen desarrollo de anca. Hijo de Sancho Panza, aporta facilidad de parto sin resignar crecimiento."
  },
  {
    id: "lha-02",
    lote: "Lote 02",
    nombre: "Cacique",
    img: "img/toro2.png",
    padre: "OCC Emblazón 854 E",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-07-02",
    pesoNacer: "38 kg",
    registro: "LHA 231-02",
    epd: { CED: 8, BW: 2.1, WW: 71, YW: 121, MARB: 0.61, REA: 0.51, DOC: 18, W: 82, B: 138 },
    resena: "Marca de raza y volumen muscular sobresaliente. La genética de OCC Emblazón se nota en el terminado y el marmoleo."
  },
  {
    id: "lha-03",
    lote: "Lote 03",
    nombre: "Baqueano",
    img: "img/toro1.png",
    padre: "OCC Double Wide",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-08-27",
    pesoNacer: "34 kg",
    registro: "LHA 231-03",
    epd: { CED: 13, BW: 0.6, WW: 58, YW: 99, MARB: 0.44, REA: 0.41, DOC: 24, W: 68, B: 122 },
    resena: "Toro de frame moderado y facilidad de parto conservadora, ideal para servicio sobre vaquillonas."
  },
  {
    id: "lha-04",
    lote: "Lote 04",
    nombre: "Zorro Gris",
    img: "img/toro2.png",
    padre: "Gentil",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-09-05",
    pesoNacer: "37 kg",
    registro: "LHA 231-04",
    epd: { CED: 10, BW: 1.5, WW: 66, YW: 113, MARB: 0.55, REA: 0.47, DOC: 20, W: 77, B: 134 },
    resena: "Estructura sólida y buen ángulo de patas. Hijo de Gentil, se destaca por su docilidad."
  },
  {
    id: "lha-05",
    lote: "Lote 05",
    nombre: "Aguará",
    img: "img/toro1.png",
    padre: "Horus",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-07-19",
    pesoNacer: "39 kg",
    registro: "LHA 231-05",
    epd: { CED: 7, BW: 2.4, WW: 73, YW: 124, MARB: 0.58, REA: 0.53, DOC: 17, W: 84, B: 141 },
    resena: "El de mayor potencial de crecimiento del lote. Horus le transmite volumen y capacidad de carne."
  },
  {
    id: "lha-06",
    lote: "Lote 06",
    nombre: "Tapera",
    img: "img/toro2.png",
    padre: "Sancho Panza",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-08-30",
    pesoNacer: "35 kg",
    registro: "LHA 231-06",
    epd: { CED: 12, BW: 0.9, WW: 60, YW: 104, MARB: 0.48, REA: 0.42, DOC: 22, W: 71, B: 126 },
    resena: "Buen equilibrio entre facilidad de parto y terminación. Ideal para rodeos de reposición."
  },
  {
    id: "lha-07",
    lote: "Lote 07",
    nombre: "Costero",
    img: "img/toro1.png",
    padre: "OCC Emblazón 854 E",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-07-11",
    pesoNacer: "38 kg",
    registro: "LHA 231-07",
    epd: { CED: 9, BW: 1.8, WW: 69, YW: 118, MARB: 0.59, REA: 0.49, DOC: 19, W: 80, B: 137 },
    resena: "Fenotipo parejo y buen desarrollo muscular, con la impronta de marmoleo de OCC Emblazón."
  },
  {
    id: "lha-08",
    lote: "Lote 08",
    nombre: "Fortín",
    img: "img/toro2.png",
    padre: "OCC Double Wide",
    madre: "Madre línea PP La Huella",
    nacimiento: "2023-09-12",
    pesoNacer: "33 kg",
    registro: "LHA 231-08",
    epd: { CED: 14, BW: 0.4, WW: 56, YW: 96, MARB: 0.41, REA: 0.39, DOC: 25, W: 65, B: 119 },
    resena: "El más dócil y de menor peso al nacer del lote. Muy recomendable para vientres de primera parición."
  }
];

const EPD_LABELS = {
  CED: "Facilidad de parto (%)",
  BW: "Peso al nacer (dif. kg)",
  WW: "Peso al destete (dif. kg)",
  YW: "Peso al año (dif. kg)",
  MARB: "Marmoleo",
  REA: "Área de ojo de bife (pulg²)",
  DOC: "Docilidad",
  W: "$W · Valor ternero destetado",
  B: "$B · Valor de carne"
};

const grid = document.getElementById("gridToros");
const searchInput = document.getElementById("buscarToro");
const sireSelect = document.getElementById("filtroPadre");
const sortSelect = document.getElementById("ordenarPor");
const countEl = document.getElementById("conteoToros");

function poblarPadres(){
  const padres = [...new Set(TOROS.map(t => t.padre))].sort();
  padres.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p; opt.textContent = "Hijos de " + p;
    sireSelect.appendChild(opt);
  });
}

function fmtNum(n){
  return (n > 0 ? "+" : "") + n;
}

function tarjeta(t){
  const card = document.createElement("button");
  card.className = "card-toro";
  card.type = "button";
  card.setAttribute("aria-label", `Ver ficha completa de ${t.nombre}`);
  card.innerHTML = `
    <div class="card-media">
      <img src="${t.img}" alt="${t.nombre}, toro Aberdeen Angus PP de La Huella Angus" loading="lazy">
      <span class="ear-tag">${t.registro}</span>
      <span class="card-sire">Hijo de ${t.padre}</span>
    </div>
    <div class="card-body">
      <div>
        <div class="card-name">${t.nombre}</div>
        <div class="card-meta">${t.lote} · Nacido ${fechaCorta(t.nacimiento)}</div>
      </div>
      <div class="epd-row">
        <div class="epd"><b>${fmtNum(t.epd.CED)}</b><span>CED</span></div>
        <div class="epd"><b>${fmtNum(t.epd.WW)}</b><span>Destete</span></div>
        <div class="epd"><b>${fmtNum(t.epd.YW)}</b><span>Año</span></div>
        <div class="epd"><b>${t.epd.MARB.toFixed(2)}</b><span>Marmoleo</span></div>
      </div>
      <div class="card-foot">
        <span class="card-meta">$B ${t.epd.B}</span>
        <span class="ver">Ver ficha completa
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </div>
  `;
  card.addEventListener("click", () => abrirModal(t));
  return card;
}

function fechaCorta(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const padre = sireSelect.value;
  const orden = sortSelect.value;

  let lista = TOROS.filter(t => {
    const matchTexto = !q || t.nombre.toLowerCase().includes(q) || t.lote.toLowerCase().includes(q) || t.padre.toLowerCase().includes(q);
    const matchPadre = !padre || t.padre === padre;
    return matchTexto && matchPadre;
  });

  const sorters = {
    lote: (a, b) => a.lote.localeCompare(b.lote),
    ced: (a, b) => b.epd.CED - a.epd.CED,
    ww: (a, b) => b.epd.WW - a.epd.WW,
    marb: (a, b) => b.epd.MARB - a.epd.MARB,
    b: (a, b) => b.epd.B - a.epd.B
  };
  lista.sort(sorters[orden] || sorters.lote);

  grid.innerHTML = "";
  if (lista.length === 0){
    grid.innerHTML = `<div class="empty-state">No encontramos toros que coincidan con la búsqueda. Probá con otro nombre o padre.</div>`;
  } else {
    lista.forEach(t => grid.appendChild(tarjeta(t)));
  }
  countEl.textContent = `${lista.length} de ${TOROS.length} toros`;
}

/* ---------------- Modal ---------------- */
const backdrop = document.getElementById("modalBackdrop");
const modalBody = document.getElementById("modalBody");

function abrirModal(t){
  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-media">
        <img src="${t.img}" alt="${t.nombre}, toro Aberdeen Angus PP">
      </div>
      <div class="modal-info">
        <p class="eyebrow">${t.lote} · ${t.registro}</p>
        <h3>${t.nombre}</h3>
        <p class="card-meta">Nacido el ${fechaCorta(t.nacimiento)} · Peso al nacer ${t.pesoNacer}</p>

        <div class="modal-pedigree">
          <div><span>Padre</span><b>${t.padre}</b></div>
          <div><span>Madre</span><b>${t.madre}</b></div>
        </div>

        <p>${t.resena}</p>

        <div class="epd-table-wrap" style="margin-top:1.2rem">
          <table class="epd-table">
            <caption>DEP — Diferencias Esperadas de Progenie (valores ilustrativos)</caption>
            <thead>
              <tr>${Object.keys(t.epd).map(k => `<th>${k}</th>`).join("")}</tr>
            </thead>
            <tbody>
              <tr>${Object.entries(t.epd).map(([k,v]) => `<td>${typeof v === "number" && k !== "DOC" && !Number.isInteger(v) ? v.toFixed(2) : fmtNum(v)}</td>`).join("")}</tr>
            </tbody>
          </table>
        </div>

        <p class="modal-note">
          ${Object.entries(EPD_LABELS).map(([k,l]) => `<strong>${k}</strong>: ${l}`).join(" · ")}
        </p>

        <div class="modal-cta">
          <a class="btn btn-primary" href="https://wa.me/5492345510720?text=${encodeURIComponent('Hola! Me interesa el toro ' + t.nombre + ' (' + t.registro + ') del catálogo de La Huella Angus.')}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
          <button class="btn btn-line" type="button" data-cerrar>Volver al catálogo</button>
        </div>
      </div>
    </div>
  `;
  modalBody.querySelector("[data-cerrar]").addEventListener("click", cerrarModal);
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarModal(){
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

backdrop.addEventListener("click", (e) => { if (e.target === backdrop) cerrarModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModal(); });
document.getElementById("modalClose").addEventListener("click", cerrarModal);

/* ---------------- listeners ---------------- */
searchInput.addEventListener("input", render);
sireSelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);

/* ---------------- nav móvil ---------------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ---------------- footer: fecha dinámica ---------------- */
document.getElementById("anioActual").textContent = new Date().getFullYear();

/* ---------------- init ---------------- */
poblarPadres();
render();
