import { useState, useEffect } from 'react';
import { Heart, Camera, CreditCard, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const metaTotal = 1785000;
  const [recaudado, setRecaudado] = useState(1255000);
  
  // ESTADO PARA EL IDIOMA (ES = Español, EN = Inglés)
  const [idioma, setIdioma] = useState('es');
  
  const porcentaje = Math.min((recaudado / metaTotal) * 100, 100);

  useEffect(() => {
    const ws = new WebSocket("wss://backend-lina.onrender.com/ws");
    ws.onopen = () => console.log("¡Conectados al motor de donaciones de Lina! 🚀");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.nuevo_total) {
        setRecaudado(data.nuevo_total);
      }
    };
    return () => ws.close();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-orange-50 to-rose-50 font-sans text-slate-800 pb-20 selection:bg-rose-200">
      
      {/* Botón Flotante de Idioma */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
          className="flex items-center gap-2 bg-white/90 backdrop-blur shadow-lg px-4 py-2 rounded-full font-bold text-slate-700 hover:scale-105 transition-transform border border-slate-200"
        >
          <Globe size={18} className="text-rose-500" />
          {idioma === 'es' ? 'English' : 'Español'}
        </button>
      </div>

      <main className="max-w-2xl mx-auto pt-12 px-4 md:px-0">
        
        {/* Hero Section */}
        <motion.header initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-10">
          <div className="relative max-w-sm mx-auto mb-8">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white/50 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img src="/lina-sombrero.jpg" alt="Lina" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full font-bold text-rose-600 shadow-xl flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-rose-500" /> 
                {idioma === 'es' ? '¡Por Lina!' : 'For Lina!'}
              </motion.div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500">
            {idioma === 'es' ? 'Ayudemos a la recuperación de Lina' : "Help Lina's Recovery"}
          </h1>
          
          <div className="text-lg md:text-xl text-slate-600 font-medium px-4 md:px-8 leading-relaxed space-y-4 mb-8">
            {idioma === 'es' ? (
              <>
                <p>¡Gracias a todos, la cirugía de urgencia de Lina (Escisión de la Cabeza del Fémur) fue todo un éxito! 🐶❤️ Ahora viene la etapa más importante y difícil.</p>
                <p>Con mucho esfuerzo cubrimos el pabellón. Lo que nos falta recaudar irá directamente a costear sus medicamentos y las <strong>10 a 15 sesiones de rehabilitación física</strong> que son vitales para que vuelva a apoyar su patita sin dolor. ¡Acompáñanos en la recta final!</p>
              </>
            ) : (
              <>
                <p>Thanks to everyone, Lina's emergency hip surgery (FHO) was a complete success! 🐶❤️ Now comes the most important and difficult stage.</p>
                <p>With a lot of effort, we covered the surgery. The remaining funds will go directly to cover her medications and the <strong>10 to 15 physical therapy sessions</strong> vital for her to walk and run pain-free again. Join us in the final stretch!</p>
              </>
            )}
          </div>
        </motion.header>

        {/* Tarjeta de Progreso */}
        <motion.section initial="hidden" animate="visible" variants={fadeInUp} className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white mx-4 md:mx-0 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400"></div>
          
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">
                {idioma === 'es' ? 'Recaudado' : 'Raised'}
              </p>
              <p className="text-4xl font-black text-slate-800 tracking-tight">${recaudado.toLocaleString('es-CL')}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">
                {idioma === 'es' ? 'Meta' : 'Goal'}
              </p>
              <p className="text-xl font-bold text-slate-400">${metaTotal.toLocaleString('es-CL')}</p>
            </div>
          </div>
          
          <div className="w-full bg-slate-200/80 rounded-full h-6 mb-4 overflow-hidden shadow-inner p-1">
            <motion.div initial={{ width: 0 }} animate={{ width: `${porcentaje}%` }} transition={{ duration: 1.5, delay: 0.2 }} className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full relative shadow-md">
              <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
            </motion.div>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-rose-600 font-bold bg-rose-50 py-2 px-4 rounded-xl w-fit mx-auto">
            <Activity size={18} />
            <span>
              {idioma === 'es' 
                ? `¡Solo faltan ${(metaTotal - recaudado).toLocaleString('es-CL')}!` 
                : `Only ${(metaTotal - recaudado).toLocaleString('es-CL')} CLP to go!`}
            </span>
          </div>
        </motion.section>

        {/* Historia */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 mx-4 md:mx-0 mb-12">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
            <div className="bg-orange-100 p-3 rounded-2xl">
              <Camera className="text-orange-600 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">
              {idioma === 'es' ? 'Su Historia' : 'Her Story'}
            </h2>
          </div>

          <div className="space-y-12 mb-12">
            {/* Bloque 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {idioma === 'es' ? 'El corazón de la casa' : 'The heart of our home'}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {idioma === 'es' 
                    ? 'Lina no es solo nuestra mascota, es la dueña indiscutida de la casa y quien nos roba sonrisas todos los días. Con sus disfraces, sus siestas y su forma única de mirar, ha llenado nuestros días de una energía irremplazable.'
                    : 'Lina isn’t just our pet, she’s the undisputed boss of the house and the one who makes us smile every day. With her funny outfits and impossible napping positions, she fills our lives with irreplaceable energy.'}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-slate-50">
                  <img src="/lina-sonrisa.jpg" alt="Lina" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>

            {/* Bloque 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-[2rem]">
              <div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-md bg-black">
                  <img src="/rx-lina.jpg" alt="Radiografía" className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {idioma === 'es' ? 'El Diagnóstico' : 'The Diagnosis'}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {idioma === 'es'
                    ? 'Fue diagnosticada con Displasia Bilateral y Artrosis severa. El roce de sus huesos le causaba un dolor inmenso, por lo que la cirugía FHO (Escisión de la Cabeza del Fémur) era urgente y no podía esperar.'
                    : 'She was diagnosed with severe Bilateral Dysplasia and Osteoarthritis. The bone friction caused her immense pain, making the FHO surgery an absolute emergency that couldn’t wait.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Carrusel Simplificado para no hacer el código gigante */}
          <div className="mt-16 pt-10 border-t border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {idioma === 'es' ? 'Las mil y un caras de Lina 🐾' : 'The many faces of Lina 🐾'}
            </h3>
            
            <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scroll-smooth hide-scroll-bar -mx-4 px-4 md:mx-0 md:px-0">
              <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative"><img src="/lina-tierna.jpg" className="w-full h-full object-cover" /></div>
              <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative"><img src="/lina-feliz.jpg" className="w-full h-full object-cover" /></div>
              <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative"><img src="/lina-calabaza.jpg" className="w-full h-full object-cover" /></div>
              <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative"><img src="/lina-vaquita.jpg" className="w-full h-full object-cover" /></div>
              <div className="snap-center shrink-0 w-64 md:w-72 h-80 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-50 relative"><img src="/lina-amarillo.jpg" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </motion.section>

        {/* Botones de Donación */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-gradient-to-br from-rose-500 to-orange-500 p-8 md:p-10 rounded-[2.5rem] shadow-2xl mx-4 md:mx-0 text-center relative overflow-hidden">
          <h2 className="text-3xl font-black text-white mb-3 relative z-10">
            {idioma === 'es' ? '¡Crucemos la meta juntos!' : 'Let’s cross the finish line together!'}
          </h2>
          <p className="text-rose-100 text-lg mb-8 relative z-10">
            {idioma === 'es' ? 'Tu apoyo hace la diferencia en su rehabilitación.' : 'Your support makes a huge difference in her rehab.'}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 relative z-10 mb-8">
            <a href="https://link.mercadopago.cl/ayudalina" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1 bg-white text-rose-600 hover:bg-slate-50 font-black py-4 px-6 rounded-2xl transition-transform hover:scale-[1.02] shadow-xl">
              <div className="flex items-center gap-2 text-lg"><CreditCard size={20} /> {idioma === 'es' ? 'Aportar desde Chile' : 'Donate from Chile'}</div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mercado Pago</span>
            </a>

            <a href="https://www.paypal.me/AyudaLina" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1 bg-blue-600 text-white hover:bg-blue-700 font-black py-4 px-6 rounded-2xl transition-transform hover:scale-[1.02] shadow-xl">
              <div className="flex items-center gap-2 text-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
                {idioma === 'es' ? 'Aporte Internacional' : 'International Donation'}
              </div>
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">PayPal</span>
            </a>
          </div>
        </motion.section>

      </main>
    </div>
  );
}

export default App;
