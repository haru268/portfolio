'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { projects } from '../../../data/projects';

type ProjectFormData = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  details: string[];
  stack: string[];
  github: string;
  status: string[];
};

const availableStacks = [
  'Laravel', 'React', 'TypeScript', 'MySQL', 'Docker', 'PHP', 'Next.js',
  'Vue.js', 'Nuxt.js', 'Django', 'Symfony', 'Flutter', 'PostgreSQL',
  'SQLite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Blade/Tailwind',
];

export default function AdminWorksPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projectsList, setProjectsList] = useState<ProjectFormData[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    slug: '',
    title: '',
    image: '',
    summary: '',
    details: [''],
    stack: [],
    github: '',
    status: [],
  });

  useEffect(() => {
    // 認証チェック
    const auth = sessionStorage.getItem('adminAuthenticated');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);

    // プロジェクトデータを読み込み
    const projectsArray = Object.entries(projects).map(([slug, project]) => ({
      slug,
      ...project,
    }));
    setProjectsList(projectsArray);
  }, [router]);

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, ''],
    });
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData({ ...formData, details: newDetails });
  };

  const handleRemoveDetail = (index: number) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  const handleStackToggle = (stack: string) => {
    const newStack = formData.stack.includes(stack)
      ? formData.stack.filter((s) => s !== stack)
      : [...formData.stack, stack];
    setFormData({ ...formData, stack: newStack });
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = formData.status.includes(status)
      ? formData.status.filter((s) => s !== status)
      : [...formData.status, status];
    setFormData({ ...formData, status: newStatus });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 画像をAPI経由でアップロード
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('画像のアップロードに失敗しました');
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.filename }));
    } catch (error) {
      alert('画像のアップロードに失敗しました: ' + (error as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // プロジェクトデータを更新
      const updatedProjects = { ...projects };
      updatedProjects[formData.slug] = {
        title: formData.title,
        image: formData.image,
        summary: formData.summary,
        details: formData.details.filter((d) => d.trim() !== ''),
        stack: formData.stack,
        github: formData.github,
        status: formData.status,
      };

      // API経由で保存
      const response = await fetch('/api/admin/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects: updatedProjects }),
      });

      if (!response.ok) {
        throw new Error('データの保存に失敗しました');
      }

      // 一覧を更新
      const projectsArray = Object.entries(updatedProjects).map(([slug, project]) => ({
        slug,
        ...project,
      }));
      setProjectsList(projectsArray);

      alert('保存しました！');
      
      // 新規追加の場合はフォームをリセット
      if (!editingSlug) {
        setFormData({
          slug: '',
          title: '',
          image: '',
          summary: '',
          details: [''],
          stack: [],
          github: '',
          status: [],
        });
      }
    } catch (error) {
      alert('保存に失敗しました: ' + (error as Error).message);
    }
  };

  const handleEdit = (project: ProjectFormData) => {
    setFormData(project);
    setEditingSlug(project.slug);
  };

  const handleNew = () => {
    setFormData({
      slug: '',
      title: '',
      image: '',
      summary: '',
      details: [''],
      stack: [],
      github: '',
      status: [],
    });
    setEditingSlug(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">WORKS管理</h1>
          <div className="flex gap-4">
            <button
              onClick={handleNew}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              新規追加
            </button>
            <Link
              href="/admin/skills"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              SKILL管理
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* フォーム */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/40">
            <h2 className="text-xl font-bold mb-6">
              {editingSlug ? '編集' : '新規追加'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  スラッグ（URL用）
                  <span className="ml-2 text-xs text-gray-500 font-normal">
                    （例: fleamarket → /works/fleamarket でアクセス）
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="例: my-project"
                  required
                  disabled={!!editingSlug}
                />
                <p className="mt-1 text-xs text-gray-500">
                  英数字とハイフンのみ使用可能。編集時は変更不可。
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {formData.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  概要
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  機能
                </label>
                {formData.details.map((detail, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleDetailChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder={`機能 ${index + 1}`}
                    />
                    {formData.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDetail(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        削除
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDetail}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  + 機能を追加
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  技術スタック
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableStacks.map((stack) => (
                    <button
                      key={stack}
                      type="button"
                      onClick={() => handleStackToggle(stack)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.stack.includes(stack)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {stack}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ステータス
                </label>
                <div className="flex gap-4">
                  {['private', 'ongoing', 'public', 'complete'].map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.status.includes(status)}
                        onChange={() => handleStatusToggle(status)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://github.com/..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                保存
              </button>
            </form>
          </div>

          {/* 一覧 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/40">
            <h2 className="text-xl font-bold mb-6">プロジェクト一覧</h2>
            <div className="space-y-4">
              {projectsList.map((project) => (
                <div
                  key={project.slug}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.summary}</p>
                      <div className="flex gap-2 mt-2">
                        {project.status.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      編集
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

