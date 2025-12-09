import { IconType } from 'react-icons';

type SkillRowProps = {
  icon: IconType;
  name: string;
  level: 0 | 1 | 2 | 3 | 4 | 5;
};

export function SkillRow({ icon: Icon, name, level }: SkillRowProps) {
  const renderStars = () => {
    if (level === 0) {
      return null; // 星表示なし
    }
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= level) {
        stars.push(<span key={i} className="text-amber-500 text-sm">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300 text-sm">☆</span>);
      }
    }
    return <span className="flex gap-0.5">{stars}</span>;
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm md:text-base font-semibold text-gray-900">{name}</div>
      </div>
      <div className="shrink-0">
        {renderStars()}
      </div>
    </div>
  );
}

