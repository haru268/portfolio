import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '../../../components/Header';
import { projects } from '../../../data/projects';

type Slug = keyof typeof projects;

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem,1fr] gap-3 py-3 md:py-4">
      <dt className="text-sm md:text-base font-semibold text-gray-700">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

// 静的パス生成
export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug: slug as Slug,
  }));
}

// メタデータ生成
export async function generateMetadata(
  { params }: { params: Promise<{ slug: Slug }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Haruki Kumon Portfolio`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Haruki Kumon Portfolio`,
      description: project.summary,
      images: [project.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Haruki Kumon Portfolio`,
      description: project.summary,
    },
  };
}

export default async function WorkDetail(
    { params }: { params: Promise<{ slug: Slug }> }
) {
    const { slug } = await params;
    const data = projects[slug];

    if (!data) return notFound();

    const boxH = data.imageHeight ?? 'h-72 md:h-96';
    const pad = data.imagePadding ?? 'p-2';

    return (
        <>
            <Header />

            <main id="top" className="mx-auto max-w-5xl px-6 pt-24 pb-16 space-y-10">
                <header>
                    <h1 className="text-3xl md:text-4xl font-extrabold">{data.title}</h1>
                    <div className="mt-3 flex gap-2 flex-wrap">
                        {data.status.map((status) => (
                            <span key={status} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                {status}
                            </span>
                        ))}
                    </div>
                </header>

                <div className={`relative w-full ${boxH} rounded-lg border border-gray-200 bg-white`}>
                    <Image
                        src={data.image}
                        alt={`${data.title}のスクリーンショット`}
                        fill
                        className={`object-contain ${pad}`}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                    />
                </div>

                <section>
                    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm shadow-sm p-6 md:p-8">
                        <dl className="divide-y divide-white/40">
                            <DetailRow label="概要" value={data.summary} />
                            <DetailRow
                                label="機能"
                                value={
                                    <ul className="list-disc pl-5 space-y-1 text-gray-900">
                                        {data.details.map((d) => (
                                            <li key={d}>{d}</li>
                                        ))}
                                    </ul>
                                }
                            />
                            <DetailRow
                                label="技術スタック"
                                value={
                                    <div className="flex flex-wrap gap-2">
                                        {data.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                }
                            />
                            <DetailRow
                                label="GitHub"
                                value={
                                    data.github?.trim() ? (
                                        <a
                                            href={data.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline hover:opacity-80 break-all"
                                        >
                                            {data.github}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">非公開 / 準備中</span>
                                    )
                                }
                            />
                        </dl>
                    </div>
                </section>

                {data.refs && data.refs.length > 0 && (
                    <section>
                        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm shadow-sm p-6 md:p-8">
                            <dl className="divide-y divide-white/40">
                                <DetailRow
                                    label="参考"
                                    value={
                                        <div className="flex flex-col gap-1">
                                            {data.refs.map((ref) => (
                                                <Link
                                                    key={ref.href}
                                                    href={ref.href}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="text-blue-600 underline break-words"
                                                >
                                                    {ref.label ?? ref.href}
                                                </Link>
                                            ))}
                                        </div>
                                    }
                                />
                            </dl>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
