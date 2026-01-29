import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { 
  ArrowDown, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Instagram, 
  Youtube, 
  Globe,
  Play,
  TrendingUp,
  Award
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const GameButton = ({ text, onClick, className = "" }: { text: string, onClick?: () => void, className?: string }) => (
  <button onClick={onClick} className={`game-button ${className}`}>
    <p>{text}</p>
    <span className="square top-left"></span>
    <span className="square top-right"></span>
    <span className="square bottom-right"></span>
    <span className="square bottom-left"></span>
  </button>
);

const SectionTitle = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <h2 className={`text-4xl md:text-6xl font-anton text-center mb-8 reveal-trigger ${className}`}>
    {children}
  </h2>
);

const FeatureCard = ({ title, description }: { title: string, description: string }) => (
  <div className="feature-card p-8 rounded-2xl flex flex-col gap-5 border-l-4 border-cyan-500 group cursor-default">
    <div className="icon-box bg-cyan-700 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
      <Check className="text-white group-hover:text-black transition-colors" size={24} />
    </div>
    <div>
        <h3 className="text-xl text-cyan-400 font-sans font-bold mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">{description}</p>
    </div>
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-cyan-400 transition-colors"
      >
        <span className="text-lg font-bold">{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-400 animate-in slide-in-from-top-2 duration-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const WarrantySeal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Float Animation
      gsap.to(".seal-container", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Ring Rotation
      gsap.to(".seal-ring", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
      });

      // Sheen Effect
      gsap.fromTo(".seal-sheen",
        { x: "-200%", opacity: 0 },
        { x: "200%", opacity: 0.6, duration: 1.5, repeat: -1, repeatDelay: 3, ease: "power2.inOut" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex justify-center items-center p-10">
       {/* Background Glow */}
       <div className="absolute inset-0 bg-amber-500/30 blur-[60px] rounded-full animate-pulse"></div>

       <div className="seal-container relative z-10">
          {/* Rotating Outer Ring */}
          <div className="seal-ring absolute -inset-4 border-[3px] border-dashed border-amber-500/60 rounded-full"></div>
          
          {/* Main Circle Badge */}
          <div className="w-56 h-56 bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309] rounded-full flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(217,119,6,0.5)] border-4 border-white/20 relative overflow-hidden ring-4 ring-amber-500/20">
             
             {/* Sheen Overlay */}
             <div className="seal-sheen absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent skew-x-12 w-full h-full"></div>
             
             {/* Badge Content */}
             <div className="relative z-10 text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-center gap-1 mb-1">
                   {[...Array(5)].map((_, i) => <span key={i} className="text-[10px] text-amber-200">★</span>)}
                </div>
                <span className="block font-anton text-8xl leading-[0.8]">7</span>
                <span className="block font-anton text-2xl tracking-[0.2em] uppercase mt-1">Dias</span>
                <div className="w-12 h-0.5 bg-white/50 mx-auto my-2 rounded-full"></div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-amber-100">Garantia Total</span>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Decorative Components ---

const HeroBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Base dark color - Slate 950 */}
    <div className="absolute inset-0 bg-[#020617]"></div>
    
    {/* Animated Blobs - Cyan and Blue instead of Fuchsia */}
    <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-600/20 blur-[120px] rounded-full animate-pulse"></div>
    <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-blue-900/30 blur-[100px] rounded-full"></div>
    <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-teal-600/10 blur-[80px] rounded-full"></div>

    {/* Subtle Texture Overlay */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

    {/* Diagonal Cuts / Shapes - Deep Blue/Slate gradients */}
    <div 
      className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-950/20 to-transparent"
      style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
    ></div>
    <div 
      className="absolute bottom-0 left-0 w-full h-32 bg-white"
      style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
    ></div>

    {/* Grid Lines Effect */}
    <div className="absolute inset-0" style={{ 
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
      backgroundSize: '100px 100px',
      maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
    }}></div>
  </div>
);

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center px-4 pt-20 pb-40 overflow-hidden">
      <HeroBackground />
      
      <div className="max-w-4xl w-full text-center z-10">
        <div className="mx-auto mb-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full inline-block border border-white/20 reveal-trigger">
            <span className="font-anton tracking-widest text-cyan-400">LOGO DA SUA MARCA</span>
        </div>
        <h1 className="text-4xl md:text-7xl mb-6 leading-tight reveal-trigger">
          Domine um novo método e transforme sua vida em <br/>
          <span className="bg-gradient-to-r from-cyan-600 to-blue-800 px-4 py-1 inline-block mt-2 shadow-xl">apenas 21 dias</span>
        </h1>
        
        <div className="pulse-text flex items-center justify-center gap-2 text-cyan-400 font-bold mb-8 reveal-trigger">
          <ArrowDown size={20} />
          <span>Assista ao vídeo e descubra como começar sua jornada hoje</span>
          <ArrowDown size={20} />
        </div>

        <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border-4 border-cyan-900/50 shadow-[0_0_50px_rgba(6,182,212,0.2)] mb-12 bg-black/40 backdrop-blur-sm flex items-center justify-center group cursor-pointer reveal-trigger">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Globe size={40} className="text-white" />
                </div>
            </div>
            <p className="z-10 text-white/50 px-4 text-center">Inserir seu Vídeo de Vendas aqui (YouTube/Vimeo/Vsl)</p>
        </div>

        <div className="reveal-trigger">
          <GameButton 
            text="QUERO COMEÇAR MINHA TRANSFORMAÇÃO" 
            className="font-normal"
            onClick={() => {
              const el = document.getElementById('checkout');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} 
          />
        </div>
        
        <p className="mt-6 text-gray-400 italic reveal-trigger">
          Junte-se a centenas de pessoas que já alcançaram resultados extraordinários com este método.
        </p>
      </div>
    </section>
  );
};

const ResultsCarousel = () => {
  // Use the specific image requested
  const images = Array(5).fill("https://i.imgur.com/ClGEiTN.jpeg");
  
  // Duplicate images for seamless infinite scroll
  const scrollImages = [...images, ...images];

  return (
    <section className="py-20 bg-[#020617] overflow-hidden relative">
      <div className="container mx-auto px-4 mb-10">
        <SectionTitle>
          Histórias reais de <span className="text-cyan-500">quem já chegou lá:</span>
        </SectionTitle>
      </div>
      
      <div className="w-full relative">
         {/* Fade Gradients for smooth edges */}
         <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
         
         {/* Scroll Track */}
         <div className="animate-scroll flex gap-6 px-4">
            {scrollImages.map((src, i) => (
              <div key={i} className="w-[180px] md:w-[220px] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden border border-cyan-500/30 relative group shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <img 
                  src={src} 
                  alt={`História de sucesso ${i+1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <div className="flex text-amber-400 mb-1">
                      {[...Array(5)].map((_,star) => <span key={star} className="text-xs">★</span>)}
                    </div>
                    <p className="text-white font-bold text-sm">Resultado Comprovado</p>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
      
      {/* Button Added Below Carousel */}
      <div className="mt-12 text-center relative z-20 reveal-trigger">
         <GameButton 
            text="QUERO TER RESULTADOS COMO ESSES" 
            onClick={() => {
              const el = document.getElementById('checkout');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
         />
      </div>
    </section>
  );
};

const Ticker = () => (
  <div className="bg-cyan-700 py-4 overflow-hidden border-y-2 border-cyan-400 relative z-10">
    <div className="sliding-container">
      {[...Array(20)].map((_, i) => (
        <span key={i} className="text-2xl font-anton mx-8">NOME DO SEU DESAFIO ◉</span>
      ))}
    </div>
  </div>
);

const PracticalSteps = () => {
  return (
    <section className="py-20 bg-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <SectionTitle>Como funciona <span className="text-cyan-500">na prática</span></SectionTitle>
        
        <div className="mt-12 flex flex-col gap-8 relative">
           {/* Vertical Line */}
           <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

           {/* Step 1 */}
           <div className="flex gap-6 relative reveal-trigger">
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#0f172a] border-2 border-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                 <Play className="text-cyan-400 ml-1" size={24} fill="currentColor" />
              </div>
              <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors">
                 <h3 className="text-xl font-normal text-cyan-300 mb-2">Acesso Imediato</h3>
                 <p className="text-gray-400 leading-relaxed">Faça sua inscrição e receba instantaneamente o acesso à plataforma de aulas no seu e-mail.</p>
              </div>
           </div>

           {/* Step 2 */}
           <div className="flex gap-6 relative reveal-trigger">
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#0f172a] border-2 border-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                 <TrendingUp className="text-cyan-400" size={24} />
              </div>
              <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors">
                 <h3 className="text-xl font-normal text-cyan-300 mb-2">Estude e Aplique</h3>
                 <p className="text-gray-400 leading-relaxed">Assista às aulas em alta definição e coloque o método em prática com exercícios diários.</p>
              </div>
           </div>

           {/* Step 3 */}
           <div className="flex gap-6 relative reveal-trigger">
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#0f172a] border-2 border-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                 <Award className="text-cyan-400" size={24} />
              </div>
              <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors">
                 <h3 className="text-xl font-normal text-cyan-300 mb-2">Conquiste Resultados</h3>
                 <p className="text-gray-400 leading-relaxed">Domine a técnica em 21 dias, encante seus clientes e receba seu certificado de conclusão.</p>
              </div>
           </div>
        </div>

        <div className="mt-12 text-center reveal-trigger">
           <GameButton 
              text="QUERO GARANTIR MINHA VAGA" 
              onClick={() => {
                const el = document.getElementById('checkout');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
           />
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
        gsap.from(".feature-card-item", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-[#020617]" ref={containerRef}>
        <div className="container mx-auto px-4">
        <SectionTitle>O que você vai encontrar no <span className="text-cyan-500">Programa?</span></SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card-item">
                <FeatureCard 
                title="Metodologia Validada" 
                description="Acesso a um passo a passo testado e aprovado para gerar resultados rápidos."
                />
            </div>
            <div className="feature-card-item">
                <FeatureCard 
                title="Aulas em Alta Definição" 
                description="Conteúdo gravado com qualidade premium para você assistir quando e onde quiser."
                />
            </div>
            <div className="feature-card-item">
                <FeatureCard 
                title="Materiais de Apoio" 
                description="Planilhas, PDFs e checklists exclusivos para facilitar sua execução."
                />
            </div>
            <div className="feature-card-item">
                <FeatureCard 
                title="Comunidade Exclusiva" 
                description="Ambiente para networking e troca de experiências com outros alunos."
                />
            </div>
            <div className="feature-card-item">
                <FeatureCard 
                title="Suporte Especializado" 
                description="Canal direto para tirar suas dúvidas e garantir que você não pare no caminho."
                />
            </div>
            <div className="feature-card-item">
                <FeatureCard 
                title="Módulos de Bônus" 
                description="Conteúdos extras estrategicamente selecionados para acelerar seus ganhos."
                />
            </div>
        </div>
        </div>
    </section>
  );
};

const Pricing = () => (
  <section id="checkout" className="py-20 bg-gradient-to-b from-[#0f172a] to-black">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-anton text-cyan-400 mb-2">OPORTUNIDADE ÚNICA!</h2>
      <p className="text-xl mb-12">Garanta sua vaga com condições especiais de lançamento.</p>
      
      <div className="max-w-md mx-auto card-dark p-10 rounded-3xl border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
        <h3 className="text-2xl font-anton mb-4">ACESSO COMPLETO</h3>
        <p className="text-gray-400 line-through text-xl">De: R$ 497,00</p>
        <div className="my-6">
          <p className="text-lg font-bold">Por apenas</p>
          <p className="text-7xl font-anton text-cyan-500">R$ 197</p>
          <p className="text-cyan-300 font-bold italic">Ou parcelado em seu cartão</p>
        </div>
        <div className="space-y-4 text-sm text-gray-300 mb-8">
           <p>Pagamento Seguro via Hotmart/Eduzz/Kiwi</p>
           <p className="underline font-bold">Acesso vitalício ou por tempo determinado</p>
        </div>
        <div className="flex justify-center items-center gap-2 mb-6">
            <Check className="text-green-500" size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">Compra 100% Segura</span>
        </div>
        <a href="#" target="_blank" rel="noopener noreferrer">
           <GameButton text="GARANTIR MINHA VAGA AGORA" className="w-full text-lg" />
        </a>
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-20 bg-black">
    <div className="container mx-auto px-4 max-w-3xl">
      <SectionTitle>Dúvidas <span className="text-cyan-500">Frequentes</span></SectionTitle>
      <div className="mt-12">
        <AccordionItem 
          question="1. Preciso de algum conhecimento prévio?" 
          answer="Não. O método é ensinado do absoluto zero, de forma simples e didática para qualquer pessoa conseguir aplicar."
        />
        <AccordionItem 
          question="2. Como receberei o acesso ao conteúdo?" 
          answer="Imediatamente após a confirmação do pagamento, você receberá os dados de acesso por e-mail."
        />
        <AccordionItem 
          question="3. Por quanto tempo terei acesso ao programa?" 
          answer="Isso depende da oferta selecionada, mas geralmente oferecemos acesso por 1 ano ou acesso vitalício."
        />
        <AccordionItem 
          question="4. Existe suporte para dúvidas durante o curso?" 
          answer="Sim! Temos uma equipe de suporte e uma área de membros onde você pode deixar suas perguntas abaixo de cada aula."
        />
        <AccordionItem 
          question="5. E se eu não gostar ou não me adaptar?" 
          answer="Você tem uma garantia incondicional de 7 dias para testar todo o conteúdo sem riscos."
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 bg-black border-t border-white/5 text-center text-gray-500 text-sm">
    <div className="container mx-auto px-4">
      <p>© {new Date().getFullYear()} - Nome da Sua Empresa ou Marca Profissional</p>
      <p className="mt-2">CNPJ: 00.000.000/0001-00</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="hover:text-cyan-500">Política de Privacidade</a>
        <a href="#" className="hover:text-cyan-500">Termos de Uso</a>
      </div>
      <div className="flex justify-center gap-4 mt-6">
         <Instagram size={20} className="hover:text-cyan-500 cursor-pointer" />
         <Youtube size={20} className="hover:text-cyan-500 cursor-pointer" />
      </div>
    </div>
  </footer>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Scroll Animations
    const triggers = document.querySelectorAll('.reveal-trigger');
    
    triggers.forEach((trigger) => {
      gsap.fromTo(trigger, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-cyan-500 selection:text-white">
      <Hero />
      
      {/* Introduction Section - Modified */}
      <section className="py-24 bg-white text-[#020617] relative z-10">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center reveal-trigger mb-16">
                <h2 className="text-4xl md:text-5xl font-anton mb-6 leading-tight">
                    Titulo com beneficios
                </h2>
                <p className="text-lg text-gray-600">
                    Conquiste seus objetivos com um <span className="background-destaque font-bold">passo a passo</span> desenhado para a sua realidade.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto reveal-trigger">
                {/* Item 1 */}
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors shadow-sm hover:shadow-md">
                    <div className="bg-cyan-600 text-white p-2 rounded-lg shrink-0">
                        <Check size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl mb-2 text-black font-sans font-normal">Benefício Transformador 1</h3>
                        <p className="text-gray-800 leading-relaxed">Descrição clara de como esse benefício impacta positivamente a vida do aluno.</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors shadow-sm hover:shadow-md">
                    <div className="bg-cyan-600 text-white p-2 rounded-lg shrink-0">
                        <Check size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl mb-2 text-black font-sans font-normal">Benefício Transformador 2</h3>
                        <p className="text-gray-800 leading-relaxed">Descrição clara de como esse benefício impacta positivamente a vida do aluno.</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors shadow-sm hover:shadow-md">
                    <div className="bg-cyan-600 text-white p-2 rounded-lg shrink-0">
                        <Check size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl mb-2 text-black font-sans font-normal">Benefício Transformador 3</h3>
                        <p className="text-gray-800 leading-relaxed">Descrição clara de como esse benefício impacta positivamente a vida do aluno.</p>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors shadow-sm hover:shadow-md">
                    <div className="bg-cyan-600 text-white p-2 rounded-lg shrink-0">
                        <Check size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl mb-2 text-black font-sans font-normal">Benefício Transformador 4</h3>
                        <p className="text-gray-800 leading-relaxed">Descrição clara de como esse benefício impacta positivamente a vida do aluno.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Added Results Carousel */}
      <ResultsCarousel />

      <Ticker />

      {/* Added Practical Steps Section */}
      <PracticalSteps />

      <HowItWorks />

      {/* About Specialist Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1 reveal-trigger">
                <h2 className="text-5xl font-anton mb-6">Quem é seu mentor?</h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    <p>Aqui você insere uma breve descrição sobre o <strong>Especialista do Produto</strong>.</p>
                    <p>Fale sobre sua experiência, autoridade no mercado e o porquê você decidiu criar este programa.</p>
                    <p>Destaque os principais marcos da sua carreira e como você já transformou a vida de diversas pessoas através do seu conhecimento.</p>
                </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 reveal-trigger">
                <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative group">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" alt="Especialista" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
      </section>

      <Pricing />

      {/* Warranty Section */}
      <section className="py-20 bg-white text-black">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 reveal-trigger">
                  <h2 className="text-4xl font-anton mb-6">Risco Zero: <span className="text-cyan-600">Garantia Total</span></h2>
                  <p className="text-lg text-gray-600 mb-6">Eu confio tanto no que estou te entregando que tiro todo o peso da sua decisão. Você tem 7 dias para acessar tudo e, se não gostar, devolvo cada centavo.</p>
                  <p className="font-bold text-xl italic">Compromisso com o seu sucesso.</p>
              </div>
              <div className="md:w-1/3 text-center reveal-trigger">
                  <WarrantySeal />
              </div>
          </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}