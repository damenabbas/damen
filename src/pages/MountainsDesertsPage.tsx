import { Mountain, Sun, ArrowLeft } from 'lucide-react';
import { mountains, deserts } from '@/data/natureData';
import NatureCard from '@/components/NatureCard';

interface MountainsDesertsPageProps {
  onNavigate: (page: string) => void;
}

export default function MountainsDesertsPage({ onNavigate }: MountainsDesertsPageProps) {
  return (
    <div className="min-h-screen bg-cream saudi-pattern pt-20">
      {/* Page Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-amber-950" />
          <img
            src="https://images.pexels.com/photos/16908875/pexels-photo-16908875.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600"
            alt="الجبال والصحاري"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5 animate-fade-in-up">
            <Mountain className="w-4 h-4 text-gold-light" />
            <span className="text-white text-sm font-body">القسم الأول</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
            الجبال والصحاري
          </h1>
          <p className="text-gold-light text-lg font-heading font-bold mb-4 animate-fade-in-up delay-200">
            عظمة المرتفعات وسحر الكثبان الذهبية
          </p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed font-body animate-fade-in-up delay-300">
            تتنوع تضاريس المملكة بين جبال شامخة في الشمال والجنوب وصحاري رملية ممتدة في الشرق والغرب،
            كل منها يحكي قصة جيولوجية تمتد لملايين السنين وتشكّل موئلاً للتنوع البيئي والتراث الإنساني.
          </p>
        </div>
      </section>

      {/* Mountains Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
              <Mountain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-black text-saudi-green-dark">الجبال</h2>
              <p className="text-gray-600 font-body text-sm">قمم شامخة تعانق السحاب</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mountains.map((item, i) => (
              <NatureCard key={item.id} item={item} index={i} variant="mountain" />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-saudi-green-200 to-transparent" />
      </div>

      {/* Deserts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-800 flex items-center justify-center shadow-lg">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-black text-saudi-green-dark">الصحاري</h2>
              <p className="text-gray-600 font-body text-sm">بحار رملية تمتد حتى الأفق</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deserts.map((item, i) => (
              <NatureCard key={item.id} item={item} index={i} variant="desert" />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-saudi-green text-white font-heading font-bold shadow-lg hover:bg-saudi-green-dark transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
            العودة للرئيسية
          </button>
          <button
            onClick={() => onNavigate('seas-palms')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-saudi-green-dark font-heading font-bold shadow-lg hover:bg-gold-light transition-all hover:scale-105"
          >
            البحار والنخيل
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
