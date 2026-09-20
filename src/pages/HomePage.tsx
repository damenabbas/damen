import { Mountain, Sun, Waves, TreePalm, ArrowLeft, Calendar, Sparkles, Heart } from 'lucide-react';
import { heroImage, categories } from '@/data/natureData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categoryIcons: Record<string, { icon: typeof Mountain; color: string; bg: string }> = {
  'mountains-deserts': { icon: Mountain, color: 'text-amber-600', bg: 'from-amber-500 to-orange-700' },
  'seas-palms': { icon: Waves, color: 'text-cyan-600', bg: 'from-cyan-500 to-blue-700' },
};

const stats = [
  { value: '2,150,000', label: 'كم² مساحة المملكة', icon: MapPinIcon },
  { value: '1,800', label: 'كم ساحل البحر الأحمر', icon: Waves },
  { value: '3,000', label: 'متر أعلى قمة جبلية', icon: Mountain },
  { value: '3,000,000+', label: 'نخلة في الأحساء', icon: TreePalm },
];

function MapPinIcon(props: { className?: string }) {
  return <Sparkles {...props} />;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="المملكة العربية السعودية"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-saudi-green-dark/70 via-saudi-green-dark/50 to-saudi-green-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-gold/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-10 w-40 h-40 rounded-full bg-saudi-green-light/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-12">
          {/* National Day Badge */}
          <div className="inline-flex items-center gap-3 mb-8 animate-badge-bounce">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="font-heading font-black text-3xl text-saudi-green-dark">96</span>
              </div>
              <div className="absolute -inset-2 rounded-full border-2 border-gold/40 animate-ping" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-dark mb-6 animate-fade-in-up">
            <Calendar className="w-4 h-4 text-gold-light" />
            <span className="text-white text-sm font-body">اليوم الوطني السعودي ٩٦</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl animate-fade-in-up delay-100">
            المملكة العربية السعودية
          </h1>

          <p className="text-xl sm:text-2xl text-gold-light font-heading font-bold mb-4 animate-fade-in-up delay-200">
            واحة الطبيعة والتنوع
          </p>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-300">
            من قمم الجبال الشامخة إلى امتداد الصحاري الذهبية، ومن زرقة البحار المرجانية إلى خضرة واحات النخيل،
            تحتفي المملكة العربية السعودية في يومها الوطني التسعين بتنوعها الطبيعي الساحر وتراثها العريق.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-400">
            <button
              onClick={() => onNavigate('mountains-deserts')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-saudi-green-dark font-heading font-bold shadow-xl hover:bg-gold-light transition-all duration-300 hover:scale-105"
            >
              <Mountain className="w-5 h-5" />
              اكتشف طبيعة المملكة
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('ai-classifier')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-white font-heading font-bold shadow-xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-gold-light" />
              جرّب الذكاء الاصطناعي
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-7 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-white/70" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-cream saudi-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl glass shadow-lg card-hover animate-scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-saudi-green flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-7 h-7 text-gold-light" />
                  </div>
                  <p className="font-heading text-2xl lg:text-3xl font-black text-saudi-green-dark mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 font-body">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saudi-green-50 text-saudi-green text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              أقسام الموقع
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-saudi-green-dark mb-3">
              استكشف تنوع الطبيعة السعودية
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-body">
              أربعة عوالم طبيعية متناذعة تجمع بين عظمة الجبال، سحر الصحاري، زرقة البحار، وخضرة الواحات
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((cat, i) => {
              const config = categoryIcons[cat.id];
              const Icon = config?.icon ?? Mountain;
              return (
                <button
                  key={cat.id}
                  onClick={() => onNavigate(cat.id)}
                  className="group relative overflow-hidden rounded-3xl shadow-xl card-hover text-right animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${config?.bg} opacity-80`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading text-2xl font-black text-white mb-2 drop-shadow-lg">
                        {cat.title}
                      </h3>
                      <p className="text-gold-light font-heading font-bold text-sm mb-3">
                        {cat.subtitle}
                      </p>
                      <p className="text-white/90 text-sm leading-relaxed mb-4 max-w-md">
                        {cat.description}
                      </p>
                      <div className="flex items-center gap-2 text-white font-heading font-bold group-hover:gap-3 transition-all">
                        <span>استكشف الآن</span>
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Teaser */}
      <section className="py-20 bg-gradient-to-br from-saudi-green-dark via-saudi-green to-saudi-green-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-gold-light" />
            <span className="text-white text-sm font-body">ميزة تفاعلية</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4 animate-fade-in-up delay-100">
            جرّب مُصنّف الذكاء الاصطناعي
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto font-body animate-fade-in-up delay-200">
            ارفع صورة أو فعّل الكاميرا ليقوم النموذج بتصنيف المشهد الطبيعي السعودي تلقائياً إلى الجبال أو الصحاري أو البحار أو النخيل
          </p>
          <button
            onClick={() => onNavigate('ai-classifier')}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold text-saudi-green-dark font-heading font-bold text-lg shadow-2xl hover:bg-gold-light transition-all duration-300 hover:scale-105 animate-fade-in-up delay-300"
          >
            <Sparkles className="w-5 h-5" />
            ابدأ التجربة
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-saudi-green-dark text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-gold-light" />
          <span className="text-white/80 font-body text-sm">
            صُنع بكل فخر احتفاءً باليوم الوطني السعودي ٩٦
          </span>
        </div>
        <p className="text-white/50 text-xs font-body">المملكة العربية السعودية - ١٤٤٧هـ</p>
      </footer>
    </div>
  );
}
