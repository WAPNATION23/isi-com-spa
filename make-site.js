const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>ISI-COM SPA | Arriendo de Generadores Norte de Chile</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Oswald:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    :root {
      --or: #F7941D;
      --bl: #29ABE2;
      --bg: #040608;
      --bg2: #0C1116;
      --txt: #B0C4D4;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Montserrat', sans-serif; background: var(--bg); color: var(--txt); overflow-x: hidden; }
    h1, h2, h3 { font-family: 'Oswald', sans-serif; text-transform: uppercase; }
    
    /* Typography overrides for extreme industrial look */
    .hl-bg-text { position:absolute; top: -5%; left: 0%; font-size: 16vw; opacity: 0.03; font-family: Oswald; font-weight: 700; white-space: nowrap; pointer-events: none; z-index: 1;}
    
    .stripes { height: 8px; width: 100%; background: repeating-linear-gradient(45deg, var(--or), var(--or) 15px, #000 15px, #000 30px); }
    .stripes.blue { background: repeating-linear-gradient(45deg, var(--bl), var(--bl) 15px, #000 15px, #000 30px); }

    .btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 1rem 2rem; font-weight: 700; font-size: 1rem; text-decoration: none;
      clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
      transition: 0.3s; cursor: pointer; border: none; text-transform: uppercase;
    }
    .btn-or { background: var(--or); color: #000; box-shadow: 0 10px 20px rgba(247,148,29,0.2); }
    .btn-or:hover { transform: translateY(-3px); background: #fff; box-shadow: 0 15px 30px rgba(255,255,255,0.2); }
    
    .btn-bl-out { background: transparent; border: 2px solid var(--bl); color: var(--bl); padding: calc(1rem - 2px) calc(2rem - 2px); }
    .btn-bl-out:hover { background: var(--bl); color: #000; border-color: var(--bl); }

    /* HEADER */
    header { position: fixed; top: 0; width: 100%; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 4vw; background: rgba(4,6,8,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .logo { display:flex; align-items:center; gap: 15px; text-decoration:none; color:#fff; font-size: 1.5rem; font-family: Oswald; font-weight:700; letter-spacing: 2px;}
    .logo img { height: 40px; background: white; padding: 2px; }
    .logo span { color: var(--or); }
    .nav { display: flex; gap: 2rem; }
    .nav a { color: #fff; text-decoration: none; font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; transition: color 0.3s; }
    .nav a:hover { color: var(--or); }

    /* HERO - CUSTOM ASYMMETRICAL LAYOUT */
    .hero { padding: 180px 4vw 80px; position: relative; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center; }
    .hero-info { position: relative; z-index: 2; }
    .h-badge { display: inline-block; background: var(--bl); color: #000; padding: 5px 15px; font-weight: 700; font-size: 0.8rem; margin-bottom: 20px; clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%); }
    .hero h1 { font-size: clamp(3rem, 6vw, 6rem); line-height: 1; color: #fff; margin-bottom: 25px; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
    .hero h1 span { color: var(--or); }
    .hero p { font-size: 1.1rem; max-width: 500px; margin-bottom: 40px; line-height: 1.8; }
    .actions { display: flex; gap: 20px; flex-wrap: wrap; }
    
    .hero-img { position: relative; z-index: 2; }
    /* Aggressive diagonal cutouts for industrial feel */
    .hero-img img { width: 100%; height: auto; object-fit: cover; clip-path: polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%); filter: contrast(1.1) brightness(0.9); }
    .hero-img::before { content:''; position:absolute; top:-20px; left:-20px; right: 20px; bottom: 20px; border: 4px solid var(--or); z-index:-1; clip-path: polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%); }
    
    /* DATA BAR */
    .data-bar { background: var(--bg2); padding: 40px 4vw; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; z-index: 5;}
    .stat { display:flex; flex-direction: column; gap: 5px; text-align: center; }
    .stat-num { color: var(--or); font-family: Oswald; font-weight: 700; font-size: 3rem; line-height:1; }
    .stat-lbl { color: #fff; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }

    /* ALTERNATING SOLUTIONS LAYOUT */
    .solutions { padding: 100px 4vw; position: relative; z-index: 2; overflow: hidden; }
    .sec-title { font-size: 3.5rem; color: #fff; margin-bottom: 80px; text-align: center; }
    .sec-title span { color: var(--bl); }

    .sol-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 120px; align-items: center; position: relative; }
    .sol-row:nth-child(even) { direction: rtl; } 
    .sol-row:nth-child(even) > * { direction: ltr; } 
    
    .sol-img { position: relative; width: 100%; height: 500px; }
    .sol-img img { width: 100%; height: 100%; object-fit: cover; clip-path: polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%); filter: contrast(1.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    
    .sol-row:nth-child(even) .sol-img img { clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%); }

    .sol-info { background: var(--bg2); padding: 60px; margin-left: -80px; position: relative; z-index: 5; border-left: 5px solid var(--or); box-shadow: -10px 10px 40px rgba(0,0,0,0.9); }
    .sol-row:nth-child(even) .sol-info { margin-left: 0; margin-right: -80px; border-left: none; border-right: 5px solid var(--bl); box-shadow: 10px 10px 40px rgba(0,0,0,0.9); }

    .sol-info h3 { font-size: 2.2rem; margin-bottom: 20px; color: #fff;}
    .sol-info p { margin-bottom: 30px; font-size: 1.05rem; }
    .sol-list { list-style: none; margin-bottom: 35px; }
    .sol-list li { margin-bottom: 12px; display: flex; align-items: flex-start; gap: 12px; color: #fff;}
    .sol-list li i { color: var(--or); margin-top: 4px; font-size: 0.9rem;}

    /* GRID / FLOTA */
    .equipos { padding: 100px 4vw; background: var(--bg2); position: relative; }
    .equipos::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.04; background-image: radial-gradient(var(--bl) 1.5px, transparent 1.5px); background-size: 25px 25px; pointer-events: none; }
    
    .grid-flota { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; position: relative; z-index: 2; }
    .flota-card { background: var(--bg); border: 1px solid rgba(255,255,255,0.03); padding: 25px; transition: 0.4s; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%); }
    .flota-card:hover { border-color: var(--bl); transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.5); }
    .fc-img { width: 100%; height: 240px; object-fit: cover; margin-bottom: 20px; filter: grayscale(80%); transition: 0.5s; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%); }
    .flota-card:hover .fc-img { filter: grayscale(0%); }
    .fc-title { color: #fff; font-size: 1.4rem; margin-bottom: 10px; font-family: Oswald; }
    .fc-desc { font-size: 0.95rem; color: var(--txt); }

    /* CONTACT FORM */
    .contacto { padding: 100px 4vw; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; background: url('eg37-motor.jpg') center/cover; position: relative;}
    .contacto::before { content:''; position: absolute; inset:0; background: linear-gradient(90deg, rgba(4,6,8,0.95) 0%, rgba(4,6,8,0.85) 100%); }
    .ct-info, .ct-form { position: relative; z-index: 2; }
    .ct-info h2 { font-size: 3.5rem; color: #fff; margin-bottom: 20px; }
    .ct-info p { font-size: 1.1rem; margin-bottom: 40px; max-width: 450px; }
    .ct-item { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; font-size: 1.2rem; font-weight: 700; color: #fff; }
    .ct-item i { background: var(--bg2); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--or); clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%); border: 1px solid rgba(255,255,255,0.05); }
    
    .ct-form { background: rgba(12, 17, 22, 0.9); backdrop-filter: blur(10px); padding: 50px; position: relative; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%); border: 1px solid rgba(255,255,255,0.1); }
    .ct-form::before { content:''; position: absolute; top:0; left:0; width:100%; height: 5px; background: var(--bl); }
    .fg { margin-bottom: 20px; }
    .fg input, .fg select, .fg textarea { width: 100%; background: var(--bg); border: 1px solid rgba(255,255,255,0.1); padding: 15px; color: #fff; font-family: 'Montserrat', sans-serif; transition: 0.3s; resize: vertical; border-radius: 0; }
    .fg input:focus, .fg select:focus, .fg textarea:focus { outline: none; border-color: var(--or); background: rgba(255,255,255,0.02); }
    
    /* FOOTER */
    footer { padding: 50px 4vw; background: #020304; text-align: center; border-top: 1px solid #111; }
    .fsoc { display: flex; justify-content: center; gap: 15px; margin: 30px 0; }
    .fsoc a { color: #fff; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); text-decoration: none; transition: 0.3s; background: var(--bg2); }
    .fsoc a:hover { background: var(--or); border-color: var(--or); color: #000; transform: rotate(10deg); }

    @media(max-width: 992px) {
      .hero { grid-template-columns: 1fr; gap: 60px; padding: 140px 5vw 60px; }
      nav { display: none; }
      .hl-bg-text { display: none; }
      
      .sol-row { grid-template-columns: 1fr; gap: 20px; margin-bottom: 80px; }
      .sol-info, .sol-row:nth-child(even) .sol-info { margin: -60px 20px 0; padding: 40px 30px; }
      .sol-img { height: 350px; }
      
      .contacto { grid-template-columns: 1fr; }
      .ct-form { padding: 30px 20px; }
    }
  </style>
</head>
<body>

<header>
  <a href="#" class="logo">
    <img src="logo-isicom.jpg" alt="ISI-COM SPA">
    ISI<span>-COM</span>
  </a>
  <div class="nav">
    <a href="#soluciones">Equipos Generación</a>
    <a href="#flota">Soporte Técnico</a>
    <a href="#contacto">Contacto 24/7</a>
  </div>
</header>

<div class="stripes" style="margin-top: 88px;"></div>

<section class="hero">
  <div class="hl-bg-text">MINING POWER</div>
  <div class="hero-info">
    <div class="h-badge"><i class="fa-solid fa-helmet-safety"></i> SOPORTE INDUSTRIAL Y MINERO</div>
    <h1>ENERGÍA QUE <span>NO</span><br>SE DETIENE</h1>
    <p>Sistemas de generación diésel, torres LED y equipamiento pesado para las faenas y plantas más rigurosas del Norte de Chile.</p>
    <div class="actions">
      <a href="#contacto" class="btn btn-or"><i class="fa-solid fa-bolt"></i> COTIZAR PROYECTO</a>
      <a href="#soluciones" class="btn btn-bl-out">VER CATÁLOGO</a>
    </div>
  </div>
  <div class="hero-img">
    <img src="eg37-faena.jpg" alt="Generador Minero en Faena">
  </div>
</section>

<div class="data-bar">
  <div class="stat">
    <span class="stat-num">24/7</span>
    <span class="stat-lbl">Soporte en Terreno</span>
  </div>
  <div class="stat">
    <span class="stat-num">550</span>
    <span class="stat-lbl">kVA Máxima Potencia</span>
  </div>
  <div class="stat">
    <span class="stat-num">15+</span>
    <span class="stat-lbl">Años de Liderazgo</span>
  </div>
  <div class="stat">
    <span class="stat-num">100%</span>
    <span class="stat-lbl">Norma Sernageomin</span>
  </div>
</div>

<section id="soluciones" class="solutions">
  <h2 class="sec-title">SOLUCIONES <span>ESTRATÉGICAS</span></h2>
  
  <div class="sol-row">
    <div class="sol-img">
      <img src="eg37-interior.jpg" alt="Grupos Electrógenos">
    </div>
    <div class="sol-info">
      <h3>SISTEMAS DE RESPALDO CONTINUO</h3>
      <p>Grupos electrógenos desde 20 kVA hasta 550 kVA con motores Heavy-Duty. Aseguramos disponibilidad inmediata para suplir mermas de red o trabajo continuo en zonas aisladas.</p>
      <ul class="sol-list">
        <li><i class="fa-solid fa-check"></i> Cabinas ultra-insonorizadas para campamentos.</li>
        <li><i class="fa-solid fa-check"></i> Kit minero (Jaula antivuelco y bandeja antiderrame).</li>
        <li><i class="fa-solid fa-check"></i> Instalación electromecánica garantizada.</li>
      </ul>
      <a href="#contacto" class="btn btn-or" style="margin-top: 15px;">Cotizar Unidad</a>
    </div>
  </div>

  <div class="sol-row">
    <div class="sol-img">
      <img src="eg37-duo.jpg" alt="Torres de Iluminación LED">
    </div>
    <div class="sol-info">
      <h3>ILUMINACIÓN DE FAENA LED</h3>
      <p>Torres de luz autónomas de alto rendimiento. Construidas para soportar fuertes rachas de viento y polvo abrasivo, entregando luminosidad pareja en 360 grados.</p>
      <ul class="sol-list">
        <li><i class="fa-solid fa-check"></i> Focos LED de consumo optimizado.</li>
        <li><i class="fa-solid fa-check"></i> Mástiles telescópicos mecánicos/hidráulicos.</li>
        <li><i class="fa-solid fa-check"></i> Autonomía de estanque superior a 50 horas.</li>
      </ul>
      <a href="#contacto" class="btn btn-or" style="margin-top: 15px;">Cotizar Unidad</a>
    </div>
  </div>

  <div class="sol-row">
    <div class="sol-img">
      <img src="tableros.jpg" alt="Tableros TDF y Bancos de Carga">
    </div>
    <div class="sol-info">
      <h3>TABLEROS TDF Y BANCOS DE CARGA</h3>
      <p>Gestión térmica y eléctrica profesional. Impide que tus motores operen en vacío y centraliza la distribución de tensión para todas tus herramientas y equipos.</p>
      <ul class="sol-list">
        <li><i class="fa-solid fa-check"></i> Pruebas de capacidad con bancos portátiles hasta 550 kW.</li>
        <li><i class="fa-solid fa-check"></i> Tableros TDF-2 / TDF-4 para faena (220V/380V).</li>
        <li><i class="fa-solid fa-check"></i> Componentes eléctricos de grado industrial hermético.</li>
      </ul>
      <a href="#contacto" class="btn btn-or" style="margin-top: 15px;">Cotizar Unidad</a>
    </div>
  </div>
</section>

<div class="stripes blue"></div>

<section id="flota" class="equipos">
  <h2 class="sec-title">NUESTRA FLOTA <span>EN TERRENO</span></h2>
  <div class="grid-flota">
    <div class="flota-card">
      <img src="hyster-grua.jpg" alt="Logistica Grua" class="fc-img">
      <h4 class="fc-title">LOGÍSTICA IN-HOUSE</h4>
      <p class="fc-desc">Grúa Hyster Fortis 7 Toneladas para carga, descarga y posicionamiento exacto sin sub-contratistas, acelerando el despliegue.</p>
    </div>
    <div class="flota-card">
      <img src="eg24-jaula.jpg" alt="Estructuras" class="fc-img">
      <h4 class="fc-title">ESTRUCTURAS MINERAS</h4>
      <p class="fc-desc">Taller propio de soldadura estructural para fabricar jaulas y bandejas a medida, cumpliendo siempre normativas de seguridad.</p>
    </div>
    <div class="flota-card">
      <img src="eg06-taller.jpg" alt="Taller" class="fc-img">
      <h4 class="fc-title">TALLER CENTRAL</h4>
      <p class="fc-desc">Centro de overhauling preventivo. Los equipos rotan por revisiones exhaustivas y pruebas con banco de carga externo antes de salir.</p>
    </div>
    <div class="flota-card">
      <img src="eg37-motor.jpg" alt="Motorizacion" class="fc-img">
      <h4 class="fc-title">MÁQUINAS HEAVY-DUTY</h4>
      <p class="fc-desc">Motores que no flaquean bajo estrés. Filtros reemplazados periódicamente y control de densidades para evitar caídas de RPM.</p>
    </div>
  </div>
</section>

<section id="contacto" class="contacto">
  <div class="ct-info">
    <h2>HABLA CON LOS<br><span>EXPERTOS</span></h2>
    <p>La falla eléctrica cuesta millones. Solicita sin compromiso el levantamiento de potencia que tu mina o planta requiere para trabajar protegida.</p>
    
    <div class="ct-item">
      <i class="fa-brands fa-whatsapp"></i>
      <div><a href="https://wa.me/56947623264" style="color:#fff;text-decoration:none;">+56 9 4762 3264</a><br><span style="font-size:0.8rem;color:var(--or);text-transform:uppercase;font-weight:400;">Línea Directa de Urgencias</span></div>
    </div>
    <div class="ct-item">
      <i class="fa-solid fa-envelope"></i>
      <div><a href="mailto:Ventas@isi-com.cl" style="color:#fff;text-decoration:none;">Ventas@isi-com.cl</a><br><span style="font-size:0.8rem;color:var(--or);text-transform:uppercase;font-weight:400;">Licitaciones y Cotizaciones</span></div>
    </div>
    <div class="ct-item">
      <i class="fa-solid fa-location-crosshairs"></i>
      <div>NORTE DE CHILE<br><span style="font-size:0.8rem;color:var(--or);text-transform:uppercase;font-weight:400;">Cobertura desde Arica a Atacama</span></div>
    </div>
  </div>
  
  <form class="ct-form" action="#" method="POST">
    <div class="fg">
      <input type="text" placeholder="Nombre de la Empresa" required>
    </div>
    <div class="fg">
      <input type="text" placeholder="Persona de Contacto" required>
    </div>
    <div class="fg">
      <input type="tel" placeholder="Teléfono de Contacto" required>
    </div>
    <div class="fg">
      <select required>
        <option value="" disabled selected>Tipo de Necesidad...</option>
        <option>Generador (Respaldo)</option>
        <option>Generador (Uso Continuo)</option>
        <option>Torres de Iluminación</option>
        <option>Bancos de Carga / Pruebas</option>
        <option>Mantención Electromecánica</option>
      </select>
    </div>
    <div class="fg">
      <textarea rows="4" placeholder="Indique potencia estimada o detalles del sitio de operación..."></textarea>
    </div>
    <button type="submit" class="btn btn-or" style="width:100%;justify-content:center;clip-path:none;border-radius:2px;">
      <i class="fa-solid fa-paper-plane"></i> SOLICITAR ASESORÍA
    </button>
  </form>
</section>

<footer>
  <img src="logo-isicom.jpg" alt="Logo" style="width: 70px; filter: grayscale(100%) opacity(40%); margin-bottom: 20px; border-radius: 5px;">
  <div class="fsoc">
    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
    <a href="https://wa.me/56947623264"><i class="fa-brands fa-whatsapp"></i></a>
  </div>
  <p style="color: #444; font-size: 0.9rem; text-transform: uppercase;">&copy; 2026 ISI-COM SPA | Energía ininterrumpida y soporte real en terreno.</p>
</footer>

</body>
</html>`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log("Index.html reescrito satisfactoriamente con el nuevo diseño brutalista!");
