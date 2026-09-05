import { useState, useEffect } from 'react';
import { Heart, Camera, CreditCard, Landmark, Activity, Info } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const metaTotal = 1785000;
  // 1. Convertimos el recaudado en un valor dinámico
  const [recaudado, setRecaudado] = useState(1255000);
  
  // Aseguramos que la barra no pase del 100% visualmente
  const porcentaje = Math.min((recaudado / metaTotal) * 100, 100);

  // 2. Conexión en tiempo real con FastAPI
  useEffect(() => {
    const ws = new WebSocket("wss://backend-lina.onrender.com/ws");

    ws.onopen = () => {
      console.log("¡Conectados al motor de donaciones de Lina! 🚀");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.nuevo_total) {
        // ¡Aquí ocurre la magia! React actualiza el número y la barra avanza sola
        setRecaudado(data.nuevo_total);
      }
    };

    return () => ws.close(); // Limpiamos la conexión si se cierra la página
  }, []);

  // Configuraciones de animación (Esto ya lo tenías)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-orange-50 to-rose-50 font-sans text-slate-800 pb-20 selection:bg-rose-200">
      
      <main className="max-w-2xl mx-auto pt-8 px-4 md:px-0">
        
        {/* Hero Section */}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="text-center mb-10"
        >
          {/* Imagen Principal Inmersiva */}
          <div className="relative max-w-sm mx-auto mb-8">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white/50 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/lina-sombrero.jpg" 
                alt="Lina" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              
              {/* Badge Flotante */}
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full font-bold text-rose-600 shadow-xl flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-rose-500" /> ¡Por Lina!
              </motion.div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500">
            Ayudemos a Lina a volver a correr
          </h1>
          <div className="text-lg md:text-xl text-slate-600 font-medium px-4 md:px-8 leading-relaxed space-y-4 mb-8">
                <p>
                  A sus 6 años, nuestra Lina enfrenta el desafío más grande de su vida. Fue diagnosticada con una displasia bilateral y artrosis, lo que significa que sus dos caderas están afectadas. Hoy nos enfrentamos a una cirugía de urgencia que no puede esperar.
                </p>
                <p>
                  Con mucho esfuerzo ya logramos reunir gran parte del monto inicial. Lo que nos falta recaudar irá directamente a costear los insumos hospitalarios y de pabellón, los medicamentos para aliviar su dolor y las estrictas terapias de rehabilitación física que son vitales para que vuelva a apoyar su patita. <strong>¡Acompáñanos en la recta final!</strong> 
                </p>
              </div>
        </motion.header>

        {/* Tarjeta de Progreso Glassmorphism */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white mx-4 md:mx-0 mb-12 relative overflow-hidden"
        >
          {/* Efecto de brillo de fondo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400"></div>
          
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Recaudado</p>
              <p className="text-4xl font-black text-slate-800 tracking-tight">
                ${recaudado.toLocaleString('es-CL')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Meta</p>
              <p className="text-xl font-bold text-slate-400">
                ${metaTotal.toLocaleString('es-CL')}
              </p>
            </div>
          </div>
          
          {/* Barra Animada */}
          <div className="w-full bg-slate-200/80 rounded-full h-6 mb-4 overflow-hidden shadow-inner p-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${porcentaje}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full relative shadow-md"
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
            </motion.div>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-rose-600 font-bold bg-rose-50 py-2 px-4 rounded-xl w-fit mx-auto">
            <Activity size={18} />
            <span>¡Solo faltan ${(metaTotal - recaudado).toLocaleString('es-CL')}!</span>
          </div>
        </motion.section>

        {/* Historia Expandida - Fotos Más Grandes */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 mx-4 md:mx-0 mb-12"
            >
              <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
                <div className="bg-orange-100 p-3 rounded-2xl">
                  <Camera className="text-orange-600 w-6 h-6" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800">Su Historia</h2>
              </div>

              <div className="space-y-12 mb-12">
                {/* Bloque 1: Su Personalidad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">El corazón de la casa</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Lina no es solo nuestra mascota, es la dueña indiscutida de la casa y quien nos roba sonrisas todos los días. Con sus disfraces, sus siestas en posiciones imposibles y esa forma única de mirarte cuando quiere algo, ha llenado nuestros días de una energía irremplazable.
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    {/* Cambiado a aspect-square para que sea una foto grande y cuadrada */}
                    <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-slate-50">
                      <img src="/lina-sonrisa.jpg" alt="Lina sonriendo" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                </div>

                {/* Bloque 2: El Diagnóstico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-[2rem]">
                  <div>
                    {/* Cambiado a aspect-square. La radiografía se verá completa sin recortarse por el object-contain */}
                    <div className="aspect-square rounded-3xl overflow-hidden shadow-md bg-black">
                      <img src="/rx-lina.jpg" alt="Radiografía de Lina" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Un diagnóstico inesperado</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Hace poco empezó a cojear y a sentir dolor al apoyar su patita. Los exámenes revelaron una urgencia ortopédica: necesita una <strong className="text-rose-500">Escisión de la Cabeza del Fémur (FHO)</strong>. El roce de sus huesos le causa un daño que no se aliviará solo con analgésicos.
                    </p>
                  </div>
                </div>

                {/* Bloque 3: La Solución */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">El camino a la recuperación</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Entrar a pabellón es el primer paso. Para que su cuerpo forme una "falsa articulación" y vuelva a correr feliz, Lina requerirá un proceso estricto de <strong className="text-slate-800">10 a 15 sesiones de fisioterapia</strong>. Si no logramos costear esta rehabilitación, podría perder la movilidad de forma permanente.
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    {/* Cambiado a aspect-[4/3] para darle un toque ligeramente vertical y majestuoso */}
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-slate-50 bg-slate-200">
                      <img src="/lina-durmiendo.jpg" alt="Lina descansando" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ... El código del Carrusel que ya tenías queda exactamente igual abajo de esto ... */}
              <div className="mt-16 pt-10 border-t border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Las mil y un caras de Lina 🐾
                </h3>
                
                <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scroll-smooth hide-scroll-bar -mx-4 px-4 md:mx-0 md:px-0">
                  <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative group">
      <img src="/lina-tierna.jpg" alt="Lina con ojitos tiernos" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>

    {/* Foto 2: Sonrisa gigante */}
    <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative group">
      <img src="/lina-feliz.jpg" alt="Lina feliz" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>

    {/* Foto 3: Calabaza */}
    <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative group">
      <img src="/lina-calabaza.jpg" alt="Lina calabaza" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">¡Lista para Halloween!</div>
    </div>

    {/* Foto 4: Vaquita */}
    <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative group">
      <img src="/lina-vaquita.jpg" alt="Lina vaquita" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>

    {/* Foto 5: Polerón Amarillo */}
    <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative group">
      <img src="/lina-amarillo.jpg" alt="Lina amarilla" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
                </div>
                <p className="text-center text-slate-400 text-sm mt-2">
                  <span className="md:hidden">👉 Desliza para ver más</span>
                  <span className="hidden md:inline">Mantén presionado y arrastra para deslizar</span>
                </p>
              </div>
            </motion.section>

        {/* Botones de Donación */}
<motion.section 
  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
  className="bg-gradient-to-br from-rose-500 to-orange-500 p-8 md:p-10 rounded-[2.5rem] shadow-2xl mx-4 md:mx-0 text-center relative overflow-hidden"
>
  <h2 className="text-3xl font-black text-white mb-3 relative z-10">¡Crucemos la meta juntos!</h2>
  <p className="text-rose-100 text-lg mb-8 relative z-10">Tu apoyo hace la diferencia, sin importar en qué parte del mundo estés.</p>
  
  <div className="flex flex-col md:flex-row gap-4 relative z-10 mb-8">
                {/* Botón Nacional - Mercado Pago */}
                <a 
                  href="https://link.mercadopago.cl/ayudalina" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-white text-rose-600 hover:bg-slate-50 font-black py-4 px-6 rounded-2xl text-lg transition-transform hover:scale-[1.02] shadow-xl"
                >
                  <CreditCard size={24} />
                  Aportar desde Chile
                </a>

    {/* Botón Internacional */}
                <a 
                  href="https://www.paypal.me/AyudaLina" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-3 bg-blue-600 text-white hover:bg-blue-700 font-black py-4 px-6 rounded-2xl text-lg transition-transform hover:scale-[1.02] shadow-xl"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
                  Aportar desde el Extranjero
                </a>
              </div>

          
        </motion.section>

      </main>
    </div>
  );
}

export default App;
