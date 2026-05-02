import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';

type Language = 'AZ' | 'RU' | 'EN';

const translations = {
  RU: [
    { title: "", description: "" },
    { title: "Здесь всё на своих местах.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145402/0264330e-fe99-4a70-9a96-bf04c7c1e946_eaqkqx.jpg" },
    { title: "Этот порядок не случаен.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777147880/45813d4c-a586-4f0e-91c7-fcd04f6760e4_idf7oz.jpg", layout: "split-left" },
    { title: "Это продуманная среда.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777149851/275b294c-9db1-4fe5-b3c2-0b2932ad0cc8_le9nnv.jpg", layout: "split-right" },
    { title: "", description: "Квартира куплена. Затем начинается ремонт и бесконечные решения.\nВремя идет, бюджет меняется, процесс требует постоянного внимания.", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto,f_auto,w_1920/v1777150162/0S3A8059_cpwbzf.jpg" },
    { title: "", description: "Но мы изменили этот процесс.\nВы выбираете, остальное уже решено.", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto,f_auto,w_1920/v1777150606/0S3A8036_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_lrh3eb.jpg" },
    { title: "Всё готово.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145399/b346ca02-3a3e-4957-92bb-563fef71e8b9_lh2qn1.jpg" },
    { title: "Comfort", description: "Всё необходимое для жизни.\nБыстрое исполнение, прозрачный бюджет.\n\nПолный ремонт\nВыбранные материалы и покрытия\nСбалансированное кухонное решение\nНеобходимый набор техники\nФункциональное освещение\n\nVitra · Artema · Filli Boya · Barlinek · Linea Decor · Panasonic", image: null },
    { title: "Calm", description: "Полностью сформированная среда.\nНикаких возвратов к теме ремонта.\n\nПолный fit-out\nМатериалы и покрытия высокого уровня\nКухня и полный пакет техники\nВстроенные шкафы и решения для хранения\nКонцепция и исполнение освещения\n\nDuravit · Grohe · Jotun · Coswick · Porcelanosa · Valdesign · Siemens · ABB", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop" },
    { title: "Signature", description: "Без каких-либо ограничений.\nПолностью индивидуально.\n\nИндивидуальная архитектура и дизайн интерьера\nЭксклюзивные материалы и покрытия\nИндивидуально изготовленная кухня и техника\nГардеробные и системы хранения\n(По желанию) полная меблировка и декор\n\nAxor · Dornbracht · Oikos · Gessi · Rimadesio · Miele · Gaggenau · Bticino · Casa İnternational · Valdesign · Danielli Studio · Matteo Nunziati", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145396/301f3a91-6e0f-4a03-adf7-76d69bce86fc_ro5hg1.jpg" },
    { title: "Решения", description: "Здесь вы можете отметить важное", contacts: null, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2067&auto=format&fit=crop" },
    { title: "Просто заезжай и живи.", description: "", contacts: null, image: null },
    { 
      title: "Контакты", 
      description: "", 
      contacts: {
        addressLabel: "Адрес",
        address: "Xarici Dairavi Yol 10,\nYeni Yasamal, Bakı, Azərbaycan\nAZ1070",
        phoneLabel: "Телефон",
        phone: "+994 12 504 20 20\n+994 51 252 56 56",
        emailLabel: "E-mail / Web",
        email: "office@atelierroyal.az\nwww.atelierroyal.az"
      },
      cta: "Запланировать визит",
      image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145395/b27c721d-bb17-4862-8255-5de359daaf1a_mtszkp.jpg" 
    }
  ],
  EN: [
    { title: "", description: "" },
    { title: "Everything is in its place here.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145402/0264330e-fe99-4a70-9a96-bf04c7c1e946_eaqkqx.jpg" },
    { title: "This order is no coincidence.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777147880/45813d4c-a586-4f0e-91c7-fcd04f6760e4_idf7oz.jpg", layout: "split-left" },
    { title: "This is a thoughtfully designed environment.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777149851/275b294c-9db1-4fe5-b3c2-0b2932ad0cc8_le9nnv.jpg", layout: "split-right" },
    { title: "", description: "The house is bought. Then renovation starts and with it countless decisions.\nTime passes, the budget changes, the process requires constant attention.", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto,f_auto,w_1920/v1777150162/0S3A8059_cpwbzf.jpg" },
    { title: "", description: "But we changed this course.\nYou make your choice, the rest is taken care of.", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto,f_auto,w_1920/v1777150606/0S3A8036_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_lrh3eb.jpg" },
    { title: "Everything is ready.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145399/b346ca02-3a3e-4957-92bb-563fef71e8b9_lh2qn1.jpg" },
    { title: "Comfort", description: "Everything needed for living.\nFast execution, clear budget.\n\nFull renovation\nSelected materials and coverings\nBalanced kitchen solution\nEssential appliance set\nFunctional lighting\n\nVitra · Artema · Filli Boya · Barlinek · Linea Decor · Panasonic", image: null },
    { title: "Calm", description: "Fully formed living environment.\nNo returning to the renovation topic.\n\nFull fit-out\nHigh-level materials and coverings\nKitchen and full appliance package\nBuilt-in wardrobes and storage solutions\nLighting concept and execution\n\nDuravit · Grohe · Jotun · Coswick · Porcelanosa · Valdesign · Siemens · ABB", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop" },
    { title: "Signature", description: "Without any restrictions.\nCompletely individual.\n\nIndividual architecture and interior design\nCustom materials and coverings\nCustom-made kitchen and appliances\nWardrobe and storage systems\n(Optional) full furniture and decoration\n\nAxor · Dornbracht · Oikos · Gessi · Rimadesio · Miele · Gaggenau · Bticino · Casa İnternational · Valdesign · Danielli Studio · Matteo Nunziati", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145396/301f3a91-6e0f-4a03-adf7-76d69bce86fc_ro5hg1.jpg" },
    { title: "For decisions", description: "Here you can mark what is important", contacts: null, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2067&auto=format&fit=crop" },
    { title: "Just move in and live.", description: "", contacts: null, image: null },
    { 
      title: "Contact", 
      description: "", 
      contacts: {
        addressLabel: "Address",
        address: "Xarici Dairavi Yol 10,\nYeni Yasamal, Bakı, Azərbaycan\nAZ1070",
        phoneLabel: "Phone",
        phone: "+994 12 504 20 20\n+994 51 252 56 56",
        emailLabel: "E-mail / Web",
        email: "office@atelierroyal.az\nwww.atelierroyal.az"
      },
      cta: "Schedule a visit",
      image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145395/b27c721d-bb17-4862-8255-5de359daaf1a_mtszkp.jpg" 
    }
  ],
  AZ: [
    { title: "", description: "" },
    { title: "Burada hər şey öz yerindədir.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145402/0264330e-fe99-4a70-9a96-bf04c7c1e946_eaqkqx.jpg" },
    { title: "Bu səhman təsadüfi deyil.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777147880/45813d4c-a586-4f0e-91c7-fcd04f6760e4_idf7oz.jpg", layout: "split-left" },
    { title: "Bu, düşünülmüş mühitdir.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777149851/275b294c-9db1-4fe5-b3c2-0b2932ad0cc8_le9nnv.jpg", layout: "split-right" },
    { title: "", description: "Ev alınıb. Sonra təmir başlayır və onunla birlikdə saysız qərarlar.\nVaxt gedir, büdcə dəyişir, proses davamlı diqqət tələb edir.", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto,f_auto,w_1920/v1777150162/0S3A8059_cpwbzf.jpg" },
    { title: "", description: "Amma biz bu gedişatı dəyişdik.\nSiz seçiminizi edin, qalanı isə həll olunub.", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto,f_auto,w_1920/v1777150606/0S3A8036_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_lrh3eb.jpg" },
    { title: "Hər şey hazırdır.", description: "", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145399/b346ca02-3a3e-4957-92bb-563fef71e8b9_lh2qn1.jpg" },
    { title: "Comfort", description: "Yaşamaq üçün lazım olan hər şey.\nSürətli icra, aydın büdcə.\n\nTam təmir\nSeçilmiş material və örtüklər\nBalanslı mətbəx həlli\nZəruri texnika dəsti\nFunksional işıqlandırma\n\nVitra · Artema · Filli Boya · Barlinek · Linea Decor · Panasonic", image: null },
    { title: "Calm", description: "Tam formalaşmış yaşayış mühiti.\nTəmir mövzusuna qayıtmamaq.\n\nTam fit-out\nYüksək səviyyəli materiallar və örtüklər\nMətbəx və tam texnika paketi\nQuraşdırılmış şkaflar və saxlama həlləri\nİşıqlandırma konsepti və icrası\n\nDuravit · Grohe · Jotun · Coswick · Porcelanosa · Valdesign · Siemens · ABB", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop" },
    { title: "Signature", description: "Heç bir məhdudiyyət olmadan.\nTam fərdi.\n\nFərdi memarlıq və interyer dizaynı\nXüsusi material və örtüklər\nXüsusi hazırlanmış mətbəx və texnika\nQarderob və saxlama sistemləri\n(İstəklə) tam mebel və dekorasiya\n\nAxor · Dornbracht · Oikos · Gessi · Rimadesio · Miele · Gaggenau · Bticino · Casa İnternational · Valdesign · Danielli Studio · Matteo Nunziati", image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145396/301f3a91-6e0f-4a03-adf7-76d69bce86fc_ro5hg1.jpg" },
    { title: "Qərarlar üçün", description: "Burada vacib olanları qeyd edə bilərsiniz", contacts: null, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2067&auto=format&fit=crop" },
    { title: "Sadəcə köç və yaşa.", description: "", contacts: null, image: null },
    { 
      title: "Əlaqə", 
      description: "", 
      contacts: {
        addressLabel: "Ünvan",
        address: "Xarici Dairavi Yol 10,\nYeni Yasamal, Bakı, Azərbaycan\nAZ1070",
        phoneLabel: "Telefon",
        phone: "+994 12 504 20 20\n+994 51 252 56 56",
        emailLabel: "E-mail / Web",
        email: "office@atelierroyal.az\nwww.atelierroyal.az"
      },
      cta: "Görüş təyin etmək",
      image: "https://res.cloudinary.com/dqgku24ur/image/upload/q_auto/f_auto/v1777145395/b27c721d-bb17-4862-8255-5de359daaf1a_mtszkp.jpg" 
    }
  ]
};

const menuItems = {
  RU: [
    { label: "Главная", index: 0 },
    { label: "Comfort", index: 7 },
    { label: "Calm", index: 8 },
    { label: "Signature", index: 9 },
    { label: "Контакты", index: 11 }
  ],
  EN: [
    { label: "Home", index: 0 },
    { label: "Comfort", index: 7 },
    { label: "Calm", index: 8 },
    { label: "Signature", index: 9 },
    { label: "Contacts", index: 11 }
  ],
  AZ: [
    { label: "Əsas", index: 0 },
    { label: "Comfort", index: 7 },
    { label: "Calm", index: 8 },
    { label: "Signature", index: 9 },
    { label: "Əlaqə", index: 11 }
  ]
};

export function Scene() {
  const [lang, setLang] = useState<Language>('RU');
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = translations[lang];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.1,
    restDelta: 0.001
  });

  const totalSteps = sections.length;
  const step = 1 / Math.max(1, totalSteps - 1);

  const scrollToSection = (index: number) => {
    setMenuOpen(false);
    const centerProgress = index * step;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({ top: centerProgress * totalScroll, behavior: 'smooth' });
  };

  // SEO & Accessibility: Update document title and language dynamically
  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    const titles = {
      RU: "Royal Park | Премиальный жилой комплекс",
      EN: "Royal Park | Premium Residences",
      AZ: "Royal Park | Premium Yaşayış Kompleksi"
    };
    const descriptions = {
      RU: "Эксклюзивные резиденции в Баку. Оставьте заявку на персональную презентацию.",
      EN: "Exclusive residences in Baku. Schedule a personal presentation.",
      AZ: "Bakıda eksklüziv iqamətgahlar. Fərdi təqdimat üçün müraciət edin."
    };
    
    document.title = titles[lang];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptions[lang]);
    }
  }, [lang]);

  return (
    <main 
      ref={containerRef} 
      className="bg-[#f3efe7] relative font-serif"
      style={{ height: `${totalSteps * 100}vh` }}
    >
      {/* Container Spacer & Mobile Snap Points */}
      <div className="absolute inset-0 w-full flex flex-col pointer-events-none">
        {sections.map((_, i) => (
          <div key={i} className="h-screen w-full snap-start snap-always" />
        ))}
      </div>

      {/* Burger Menu Button */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-[150] flex items-center justify-center mix-blend-difference text-white">
        <Magnetic intensity={0.2}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-transparent hover:border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            {menuOpen ? <X strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" /> : <Menu strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </Magnetic>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 50px 50px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 50px 50px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 50px 50px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#56565c] z-[140] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 md:gap-12 items-center">
              {menuItems[lang].map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  onClick={() => scrollToSection(item.index)}
                  className="font-serif text-3xl md:text-5xl lg:text-7xl font-[285] tracking-tight text-[#F3EDE6] hover:text-[#A0AD77] transition-colors duration-500"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#F3EDE6]/50 text-sm font-sans uppercase tracking-[0.2em]"
            >
              <div className="mb-2 tracking-[0.3em]">ATELIER ROYAL</div>
              <div className="text-[10px]">Bakı, Azərbaycan</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Switcher */}
      <div className="fixed top-6 right-6 md:top-10 md:right-10 z-[100] flex gap-4 md:gap-6 text-xs md:text-sm font-medium tracking-[0.2em] uppercase font-sans mix-blend-difference text-white">
        {(['AZ', 'RU', 'EN'] as Language[]).map((l) => (
          <Magnetic key={l} intensity={0.15}>
            <button
              onClick={() => {
                setLang(l);
                setMenuOpen(false);
              }}
              className={`relative py-2 transition-opacity duration-500 ${lang === l ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
            >
              {l}
              {lang === l && (
                <motion.div 
                  layoutId="active-lang" 
                  className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-white opacity-80" 
                />
              )}
            </button>
          </Magnetic>
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {sections.map((section, index) => {
          const isLast = index === sections.length - 1;
          const center = index * step;
          
          // Tighten the crossfade ranges to prevent deadzones
          const ranges = [center - step * 0.6, center - step * 0.1, center + step * 0.1, center + step * 0.6];
          
          // Continuous parallax ranges so there is ALWAYS movement, even when card is fully opaque
          const continuousRanges = [center - step * 0.8, center, center + step * 0.8];

          // First card starts visible, last card stays visible AND expands
          const opacityRange = index === 0 ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0];
          
          // Scale uses different logic for last card because width/height handles the expansion
          const scaleRange = index === 0 ? [1, 1, 1, 0.9] : isLast ? [1.1, 1, 1, 1] : [1.1, 1, 1, 0.9];

          const opacity = useTransform(smoothProgress, ranges, opacityRange);
          const scale = useTransform(smoothProgress, ranges, scaleRange);
          const imageYRange = isLast ? ["-58%", "-50%", "-50%"] : ["-58%", "-50%", "-42%"];
          const imageY = useTransform(smoothProgress, continuousRanges, imageYRange);

          const titleY = useTransform(smoothProgress, continuousRanges, [40, 0, -40]);
          const subtitleY = useTransform(smoothProgress, continuousRanges, [20, 0, -20]);
          const descY = useTransform(smoothProgress, continuousRanges, [60, 0, -60]);

          const filterRange = index === 0 
            ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)"] 
            : isLast 
              ? ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)"]
              : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"];
          const filter = useTransform(smoothProgress, ranges, filterRange);

          const expandRange = [center, 1];
          const expandWidth = useTransform(smoothProgress, expandRange, ["92%", "100%"]);
          const expandHeight = useTransform(smoothProgress, expandRange, ["85%", "100%"]);
          const expandRadius = useTransform(smoothProgress, expandRange, ["16px", "0px"]);
          const expandMaxWidth = useTransform(smoothProgress, expandRange, ["1600px", "9999px"]);

          const layout = (section as any).layout;
          const isSplitLeft = layout === 'split-left';
          const isSplitRight = layout === 'split-right';
          const isSplit = isSplitLeft || isSplitRight;

          const titleColorClass = (section.image && !isSplit) ? 'text-[#F7F3F0]' : (isSplit ? 'text-[#F7F3F0] md:text-[#2C2A28]' : 'text-[#2C2A28]');
          const descColorClass = (section.image && !isSplit) ? 'text-[#F3EDE6]' : (isSplit ? 'text-[#F3EDE6] md:text-[#2C2A28]/80' : 'text-[#2C2A28]/80');
          
          let bgClass = "bg-[#F3EDE6]";
          if (index === 0) bgClass = "bg-[#ece1d2]";
          else if (section.image) {
            if (isSplit) bgClass = "bg-[#2C2A28] md:bg-[#F3EDE6]";
            else bgClass = "bg-[#2C2A28]";
          }

          return (
            <motion.section
              key={index}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <motion.article
                className={`relative overflow-hidden shadow-2xl flex text-center pointer-events-none ${bgClass} ${isSplit ? `items-center justify-center p-6 sm:p-10 md:p-0 ${isSplitRight ? 'md:flex-row-reverse' : 'md:flex-row'}` : 'items-center justify-center p-6 sm:p-10 md:p-12 lg:p-20'}`}
                style={{ 
                  scale, 
                  opacity, 
                  width: isLast ? expandWidth : "92%",
                  height: isLast ? expandHeight : "85%",
                  borderRadius: isLast ? expandRadius : "16px",
                  maxWidth: isLast ? expandMaxWidth : "1600px",
                  z: 0 // Forces hardware acceleration
                }}
              >
                {/* Optional Image Background */}
                {index !== 0 && section.image && (
                  <>
                    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isSplit ? 'md:hidden' : ''}`}>
                      <motion.img 
                        src={section.image} 
                        alt={`${section.title} - Royal Park`} 
                        className="absolute top-1/2 left-1/2 max-w-none w-[100vw] h-[100vh] object-cover opacity-60 origin-center" 
                        style={{ x: '-50%', y: imageY, scale: 1.15 }}
                        referrerPolicy="no-referrer"
                        loading={index === 1 ? "eager" : "lazy"}
                        fetchPriority={index === 1 ? "high" : "auto"}
                        decoding="async"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#2C2A28]/90 via-[#2C2A28]/30 to-[#2C2A28]/80 pointer-events-none ${isSplit ? 'md:hidden' : ''}`} />
                  </>
                )}

                {/* Split Image */}
                {index !== 0 && isSplit && section.image && (
                  <div className="hidden md:block relative w-1/2 h-full overflow-hidden shrink-0">
                    <motion.img 
                      src={section.image} 
                      alt={`${section.title} - Royal Park`} 
                      className="absolute top-1/2 left-1/2 max-w-none w-[50vw] h-[100vh] object-cover origin-center" 
                      style={{ x: '-50%', y: imageY, scale: 1.15 }}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                {/* Card Content */}
                {index === 0 ? (
                  <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <motion.h1 
                      style={{ 
                        y: titleY,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(1.5rem, 5vw, 6rem)",
                        color: "#56565c"
                      }}
                      className="font-[100] lg:font-[200] tracking-[0.2em] md:tracking-[0.3em] uppercase text-center whitespace-nowrap"
                    >
                      ATELIER ROYAL
                    </motion.h1>
                  </div>
                ) : (
                  <div className={`relative z-10 w-full h-full overflow-hidden ${isSplit ? 'md:w-1/2' : ''}`}>
                    <div className={`flex flex-col items-center justify-center min-h-full w-full mx-auto ${isSplit ? 'p-6 sm:p-10 lg:p-16' : 'max-w-5xl py-12 md:py-20'}`}>
                      {section.subtitle && (
                      <div className="mb-3 sm:mb-5 lg:mb-8 shrink-0">
                        <motion.span 
                          style={{ y: subtitleY }}
                          className="block text-[#A0AD77] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm font-medium font-sans"
                        >
                          {section.subtitle}
                        </motion.span>
                      </div>
                    )}
                    {section.title && (
                      <div className="mb-4 sm:mb-6 lg:mb-10 px-4 shrink-0">
                        <motion.h2 
                          style={{ y: titleY }}
                          className={`block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[285] tracking-tight leading-tight py-2 ${titleColorClass}`}
                        >
                          {section.title}
                        </motion.h2>
                      </div>
                    )}
                    
                    {section.contacts ? (
                      <motion.div style={{ y: descY }} className="flex flex-col items-center w-full shrink-0">
                        <div className="mb-6 md:mb-8 lg:mb-10">
                          <p className={`text-sm sm:text-base lg:text-xl font-[285] leading-relaxed max-w-2xl px-4 text-center whitespace-pre-wrap ${descColorClass}`}>
                            {section.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full max-w-5xl bg-[#2C2A28]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl shrink-0">
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[#A0AD77] text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-sans">{section.contacts.addressLabel}</span>
                            <span className={`text-[13px] sm:text-sm md:text-base lg:text-lg font-[285] whitespace-pre-wrap ${titleColorClass}`}>{section.contacts.address}</span>
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[#A0AD77] text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-sans">{section.contacts.phoneLabel}</span>
                            <span className={`text-[13px] sm:text-sm md:text-base lg:text-lg font-[285] whitespace-pre-wrap ${titleColorClass}`}>{section.contacts.phone}</span>
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[#A0AD77] text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-sans">{section.contacts.emailLabel}</span>
                            <span className={`text-[13px] sm:text-sm md:text-base lg:text-lg font-[285] break-all flex-wrap whitespace-pre-wrap ${titleColorClass}`}>{section.contacts.email}</span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        {section.cta && (
                          <Magnetic intensity={0.15}>
                            <button className="mt-8 md:mt-10 lg:mt-12 px-8 md:px-10 py-3 md:py-4 border border-[#A0AD77] bg-[#A0AD77]/10 hover:bg-[#A0AD77] text-[#F7F3F0] text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.2em] transition-all duration-500 backdrop-blur-sm cursor-pointer font-sans shrink-0 pointer-events-auto">
                              {section.cta}
                            </button>
                          </Magnetic>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div style={{ y: descY }} className="flex flex-col items-center shrink-0">
                        {section.description && (
                          <div>
                            <p className={`text-sm sm:text-base lg:text-2xl font-[285] leading-relaxed max-w-2xl px-4 text-center shrink-0 whitespace-pre-wrap ${descColorClass}`}>
                              {section.description}
                            </p>
                          </div>
                        )}
                        {/* Decorative line */}
                        {(section.title || section.description) && (
                          <div className={`w-12 md:w-16 h-[1px] bg-[#A0AD77] mt-8 lg:mt-12 opacity-60 shrink-0`} />
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
                )}
              </motion.article>
            </motion.section>
          );
        })}
      </div>
    </main>
  );
}
