import { Mountain, Sun, Waves, TreePalm, ArrowLeft, Sparkles, MapPin } from 'lucide-react';
import type { NatureItem } from '@/data/natureData';

interface NatureCardProps {
  item: NatureItem;
  index: number;
  variant: 'mountain' | 'desert' | 'sea' | 'palm';
}

const variantConfig = {
  mountain: {
    gradient: 'from-amber-800/90 to-amber-950/95',
    icon: Mountain,
    badge: 'bg-amber-100 text-amber-800',
  },
  desert: {
    gradient: 'from-orange-700/90 to-amber-900/95',
    icon: Sun,
    badge: 'bg-orange-100 text-orange-800',
  },
  sea: {
    gradient: 'from-cyan-700/90 to-blue-900/95',
    icon: Waves,
    badge: 'bg-cyan-100 text-cyan-800',
  },
  palm: {
    gradient: 'from-green-700/90 to-green-900/95',
    icon: TreePalm,
    badge: 'bg-green-100 text-green-800',
  },
};

export default function NatureCard({ item, index, variant }: NatureCardProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <article
      className="group relative overflow-hidden rounded-3xl shadow-xl card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${config.gradient}`} />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${config.badge}`}>
            <MapPin className="w-3 h-3" />
            {item.location}
          </span>
        </div>

        {/* Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl glass flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title on image */}
        <div className="absolute bottom-0 right-0 left-0 p-6">
          <h3 className="font-heading text-2xl font-bold text-white mb-1 drop-shadow-lg">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 text-gold-light text-sm">
            <Sparkles className="w-4 h-4" />
            <span>من معالم المملكة الطبيعية</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 bg-white">
        <p className="text-gray-700 leading-relaxed text-sm font-body">
          {item.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-saudi-green font-medium text-sm group-hover:gap-3 transition-all">
          <span>اقرأ المزيد</span>
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
