import { Waves, TreePalm, ArrowLeft } from 'lucide-react';
import { seas, palms } from '@/data/natureData';
import NatureCard from '@/components/NatureCard';

interface SeasPalmsPageProps {
  onNavigate: (page: string) => void;
}

export default function SeasPalmsPage({ onNavigate }: SeasPalmsPageProps) {
  return (
    <div className="min-h-screen bg-cream saudi-pattern pt-20">
      {/* Page Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 via-blue-800 to-cyan-950" />
          <img
            src="https://images.pexels.com/photos/13828960/pexels-photo-13828960.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600"
            alt="البحار والنخيل"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5 animate-fade-in-up">
            <Waves className="w-4 h-4 text-gold-light" />
            <span className="text-white text-sm font-body">القسم الثاني</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
            البحار والنخيل
          </h1>
          <p className="text-gold-light text-lg font-heading font-bold mb-4 animate-fade-in-up delay-200">
            زرقة البحار المرجانية وخضرة واحات النخيل
          </p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed font-body animate-fade-in-up delay-300">
            تمتد سواحل المملكة على البحر الأحمر والخليج العربي بشعابها المرجانية الساحرة،
            بينما تنتشر واحات النخيل في شرق المملكة وغربها، تحكي قصة حضارة وتراث ضارب في القدم.
          </p>
        </div>
      </section>

      {/* Seas Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg">
              <Waves className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-black text-saudi-green-dark">البحار</h2>
              <p className="text-gray-600 font-body text-sm">شعاب مرجانية ومياه فيروزية</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seas.map((item, i) => (
              <NatureCard key={item.id} item={item} index={i} variant="sea" />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-saudi-green-200 to-transparent" />
      </div>

      {/* Palms Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg">
              <TreePalm className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-black text-saudi-green-dark">النخيل</h2>
              <p className="text-gray-600 font-body text-sm">واحات خضراء وتراث عريق</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {palms.map((item, i) => (
              <NatureCard key={item.id} item={item} index={i} variant="palm" />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('mountains-deserts')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-saudi-green text-white font-heading font-bold shadow-lg hover:bg-saudi-green-dark transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
            الجبال والصحاري
          </button>
          <button
            onClick={() => onNavigate('ai-classifier')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-saudi-green-dark font-heading font-bold shadow-lg hover:bg-gold-light transition-all hover:scale-105"
          >
            جرّب الذكاء الاصطناعي
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
