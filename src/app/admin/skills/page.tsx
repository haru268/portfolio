'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { skillCategories as defaultSkillCategories } from '../../../data/skills';
import type { SkillCategory, SkillItem } from '../../../data/skills';
import { getIconByName } from '../../../utils/skillIcons';
import { getIconNameBySkillName } from '../../../utils/skillIconNames';
import { IconType } from 'react-icons';

export default function AdminSkillsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    // 認証チェック
    const auth = sessionStorage.getItem('adminAuthenticated');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);

    // スキルデータを読み込み
    loadSkills();
  }, [router]);

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      if (response.ok) {
        const data = await response.json();
        if (data.skillCategories && data.skillCategories.length > 0) {
          // アイコン名からアイコンを復元
          const restored = data.skillCategories.map((cat: SkillCategory) => ({
            ...cat,
            items: cat.items.map((item: SkillItem) => {
              const iconName = item.iconName || getIconNameBySkillName(item.name);
              return {
                ...item,
                icon: getIconByName(iconName),
                iconName,
              };
            }),
          }));
          setSkillCategories(restored);
        } else {
          // デフォルトデータにアイコン名を追加
          const withIconNames = defaultSkillCategories.map((cat) => ({
            ...cat,
            items: cat.items.map((item) => ({
              ...item,
              iconName: getIconNameBySkillName(item.name),
            })),
          }));
          setSkillCategories(withIconNames);
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to load skills:', response.status, errorText);
        // デフォルトデータにアイコン名を追加
        const withIconNames = defaultSkillCategories.map((cat) => ({
          ...cat,
          items: cat.items.map((item) => ({
            ...item,
            iconName: getIconNameBySkillName(item.name),
          })),
        }));
        setSkillCategories(withIconNames);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
      // デフォルトデータにアイコン名を追加
      const withIconNames = defaultSkillCategories.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({
          ...item,
          iconName: getIconNameBySkillName(item.name),
        })),
      }));
      setSkillCategories(withIconNames);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkillLevel = (categoryIndex: number, itemIndex: number) => {
    const updated = [...skillCategories];
    const currentLevel = updated[categoryIndex].items[itemIndex].level;
    // 0 → 1 → 2 → 3 → 4 → 5 → 0 の順で循環
    updated[categoryIndex].items[itemIndex].level = 
      (currentLevel + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;
    setSkillCategories(updated);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // アイコンをアイコン名に変換して保存
      const dataToSave = skillCategories.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({
          name: item.name,
          iconName: item.iconName || getIconNameBySkillName(item.name),
          level: item.level,
        })),
      }));

      const response = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skillCategories: dataToSave }),
      });

      if (!response.ok) {
        throw new Error('データの保存に失敗しました');
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      alert('保存に失敗しました: ' + (error as Error).message);
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  if (!isAuthenticated || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">SKILL管理</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                saveStatus === 'saving'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {saveStatus === 'saving' ? '保存中...' : saveStatus === 'success' ? '保存完了！' : '保存'}
            </button>
            <Link
              href="/admin/works"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              WORKS管理
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              トップに戻る
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem('adminAuthenticated');
                router.push('/admin/login');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/40">
              <h2 className="text-xl font-bold mb-4 text-center">{category.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon as IconType;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleSkillLevel(categoryIndex, itemIndex)}
                    >
                      <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm md:text-base font-semibold text-gray-900">{item.name}</div>
                      </div>
                      <div className="shrink-0">
                        <button
                          type="button"
                          className="text-sm transition-transform hover:scale-110 flex gap-0.5 items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSkillLevel(categoryIndex, itemIndex);
                          }}
                        >
                          {item.level === 0 ? (
                            <span className="text-gray-400">☆ 表示なし</span>
                          ) : (
                            <>
                              {Array.from({ length: 5 }, (_, i) => (
                                <span
                                  key={i}
                                  className={i < item.level ? 'text-amber-500' : 'text-gray-300'}
                                >
                                  {i < item.level ? '★' : '☆'}
                                </span>
                              ))}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/40">
          <h3 className="text-lg font-bold mb-4">説明</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="text-amber-500">★★★★★</span>：実務経験があり特に熟知している</li>
            <li><span className="text-amber-500">★★★★☆</span>：実務経験あり</li>
            <li><span className="text-amber-500">★★★☆☆</span>：実務経験はあるが使用期間が短い</li>
            <li><span className="text-amber-500">★★☆☆☆</span>：個人開発の経験あり</li>
            <li><span className="text-amber-500">★☆☆☆☆</span>：基本的な学習を終えた</li>
            <li><span className="text-gray-400">☆ 表示なし</span>：これから頑張りたい（学習予定）</li>
            <li className="mt-4 pt-4 border-t border-gray-200">スキルをクリックすると星の表示を切り替えられます</li>
            <li>変更後は「保存」ボタンをクリックしてください</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

