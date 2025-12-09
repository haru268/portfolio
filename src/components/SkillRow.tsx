import { IconType } from 'react-icons';

type SkillRowProps = {
  icon: IconType;
  name: string;
  level: 0 | 1;
};

export function SkillRow({ icon: Icon, name, level }: SkillRowProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm md:text-base font-semibold text-gray-900">{name}</div>
      </div>
      <div className="shrink-0">
        {level === 1 ? (
          <span className="text-amber-500 text-sm">★</span>
        ) : (
          <span className="text-gray-300 text-sm">☆</span>
        )}
      </div>
    </div>
  );
}

