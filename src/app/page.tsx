// src/app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';

import { IconType } from 'react-icons';
import {
  SiJavascript, SiTypescript, SiPython, SiGo, SiPhp, SiHtml5,
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiLaravel, SiDjango, SiSymfony, SiFlutter,
  SiMysql, SiPostgresql, SiSqlite, SiGithub, SiDocker, SiNetlify, SiHeroku, SiAmazon,
} from 'react-icons/si';


function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (

    <header id="top" className="relative z-0 w-full pt-16 overflow-hidden">
      {/* PC：そのまま全幅表示（既存の見え方を維持） */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1920}
        height={800}
        className="hidden md:block w-full object-cover"
        priority
      />

      {/* モバイル：右端に合わせて“実際の幅を広げて”拡大表示 */}
      <Image
        src="/hero.jpg"
        alt="Hero (mobile)"
        width={1920}
        height={800}
        className="
          block md:hidden
          w-[115vw] max-w-none    /* 画面幅より少し大きく */
          object-cover object-right  /* 右端を基準にトリミング */
          ml-auto                  /* 右側へ寄せる */
        "
        priority
      />

      {/* オーバーレイのテキストはそのまま */}
      <div className="absolute top-20 left-8 bg-gray-900/20 text-white p-4 rounded-lg w-fit leading-relaxed">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-3">Haruki&nbsp;Kumon</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Webアプリケーション開発エンジニア</h2>
        <p className="text-lg md:text-xl">
          ユーザーとクライアントの「使いやすい！」を形にします。<br />Webアプリ開発はお任せください。
        </p>

      </div>
    </header>
  );
}

/* ---------- WORKS ---------- */
function ProjectsSection() {
  return (
    <Section id="projects" title="WORKS">
      <div className="pl-4 md:pl-10">
        {/* ～lg までは grid の 2 列、lg 以上で従来の横並び */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:flex lg:flex-wrap lg:gap-8">
          {/* フリマアプリ */}
          <ProjectCard
            imageSrc="/fleamarket.jpg"
            imageAlt="フリマアプリ"
            title="フリマアプリ"
            description="Laravel + React で作成したフリマアプリ"
            badges={[{ label: 'private', variant: 'pink' }]}
            offset={5}
            widthClass="w-full lg:w-96"
            heightClass="h-64"
            showBorder
            href="/works/fleamarket"
          />

          {/* ポートフォリオサイト */}
          <ProjectCard
            imageSrc="/portfolio.jpg"
            imageAlt="ポートフォリオサイト"
            title="ポートフォリオサイト"
            description="Next.js + TypeScript で作成した個人サイト"
            badges={[
              { label: 'private', variant: 'pink' },
              { label: 'ongoing', variant: 'blue' },
            ]}
            offset={5}
            widthClass="w-full lg:w-96"
            heightClass="h-64"
            showBorder
            href="/works/portfolio"
          />
          {/* Attendance（GitHub 直リンク） */}
          <ProjectCard
            imageSrc="/attendance.jpg"          // ← public/attendance.jpg を置く（無ければ他の画像でもOK）
            imageAlt="Attendance（勤怠管理アプリ）"
            title="勤怠管理アプリ"
            description="Laravel + MySQL の勤怠管理アプリ"
            badges={[{ label: 'private', variant: 'pink' }]}
            offset={5}
            widthClass="w-full md:w-96"         // モバイルは列幅いっぱい、PCは従来幅
            heightClass="h-64"
            showBorder
            href="/works/attendance"
          />
          {/* Gacha Lite（説明ページへ遷移） */}
          <ProjectCard
            imageSrc="/gacha.jpg"               // ← public/gacha.jpg を置く
            imageAlt="Gacha Lite"
            title="Gacha Lite 🎲"
            description="Laravel + Next.js のガチャアプリ"
            badges={[
              { label: 'public', variant: 'gray' },
              { label: 'complete', variant: 'blue' },
            ]}
            offset={5}
            widthClass="w-full md:w-96"
            heightClass="h-64"
            showBorder
            href="/works/gacha"                 // ← ココがポイント（/works/gacha へ）
          />



        </div>
      </div>
    </Section>
  );
}


/* ---------- SKILL---------- */
type SkillItem = { name: string; icon: IconType; level: 0 | 1 };
type Category = { title: string; items: SkillItem[] };

const categories: Category[] = [
  {
    title: 'LANGUAGE',
    items: [
      { name: 'JavaScript', icon: SiJavascript, level: 1 },
      { name: 'TypeScript', icon: SiTypescript, level: 1 },
      { name: 'PHP', icon: SiPhp, level: 0 },
      { name: 'Python', icon: SiPython, level: 0 },
      { name: 'Go', icon: SiGo, level: 0 },
      { name: 'HTML5/CSS3', icon: SiHtml5, level: 1 },
    ],
  },
  {
    title: 'FRAMEWORK',
    items: [
      { name: 'React', icon: SiReact, level: 1 },
      { name: 'Next.js', icon: SiNextdotjs, level: 1 },
      { name: 'Vue.js', icon: SiVuedotjs, level: 0 },
      { name: 'Nuxt.js', icon: SiNuxtdotjs, level: 0 },
      { name: 'Laravel', icon: SiLaravel, level: 1 },
      { name: 'Django', icon: SiDjango, level: 0 },
      { name: 'Symfony', icon: SiSymfony, level: 0 },
      { name: 'Flutter', icon: SiFlutter, level: 0 },
    ],
  },
  {
    title: 'DB ・ TOOL',
    items: [
      { name: 'MySQL', icon: SiMysql, level: 1 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 0 },
      { name: 'SQLite', icon: SiSqlite, level: 0 },
      { name: 'Git/GitHub', icon: SiGithub, level: 1 },
      { name: 'Docker', icon: SiDocker, level: 0 },
      { name: 'Netlify', icon: SiNetlify, level: 0 },
      { name: 'Heroku', icon: SiHeroku, level: 0 },
      { name: 'AWS', icon: SiAmazon, level: 0 },
    ],
  },
];

function Stars({ n }: { n: 0 | 1 }) {
  if (n !== 1) return null;
  return <div className="text-amber-500 text-base md:text-lg leading-none">★</div>;
}

function SkillRow({ icon: Icon, name, level }: { icon: IconType; name: string; level: 0 | 1 }) {
  return (
    <div className="flex items-center gap-4">
      <span className="shrink-0 grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 bg-white">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
      </span>
      <div className="leading-tight">
        <div className="text-lg md:text-xl font-bold">{name}</div>
        <Stars n={level} />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" title="SKILL">
      {/* ← ここは常に同じ余白。mdで増やさない */}
      <div className="pl-4">
        {/* ← 右オフセットを全部削除（pl-0 だけ） */}
        <div className="grid gap-16 md:gap-20 md:grid-cols-3 pl-0">
          {categories.map((cat) => (
            <div key={cat.title} className="text-left">
              <h3 className="text-base md:text-lg font-extrabold uppercase text-gray-600 mb-6">
                {cat.title}
              </h3>
              <div className="grid gap-y-10 gap-x-10 sm:grid-cols-2 md:grid-cols-1">
                {cat.items.map((it) => (
                  <SkillRow key={it.name} icon={it.icon} name={it.name} level={it.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 説明文：left/translate系を完全撤去。常に同一配置 */}
      <div className="mt-10">
        <div className="mx-auto max-w-2xl md:max-w-3xl px-4">
          <ul className="text-base md:text-lg text-gray-900 space-y-2 font-bold text-left">
            <li><span className="text-amber-500">★★★★★</span> ： 実務経験があり特に熟知している</li>
            <li><span className="text-amber-500">★★★★☆</span> ： 実務経験あり</li>
            <li><span className="text-amber-500">★★★☆☆</span> ： 実務経験はあるが使用期間が短い</li>
            <li><span className="text-amber-500">★★☆☆☆</span> ： 個人開発の経験あり</li>
            <li><span className="text-amber-500">★☆☆☆☆</span> ： 基本的な学習を終えた</li>
            <li className="font-bold">
              <span className="text-gray-400 font-normal">☆ 表示なし</span>
              <span className="ml-2">： これから頑張りたい（学習予定）</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}


/* ---------- ABOUT ---------- */
function About() {
  return (
    <Section id="about" title="ABOUT">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mt-6 md:mt-10 flex items-start gap-8 md:gap-12">
          <div className="shrink-0">
            <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-gray-200">
              <Image
                src="/profile.jpg"
                alt="Haruki Kumon"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 144px, (min-width:768px) 128px, 112px"
              />
            </div>
          </div>
          <div className="min-w-0 leading-relaxed">
            <p className="text-2xl md:text-3xl font-extrabold">Haruki Kumon</p>
            <p className="mb-3 text-base md:text-lg">
              Webアプリ開発を学びながら成長しているジュニアエンジニアです。
            </p>
            <p className="mb-3 text-base md:text-lg">
              フロントエンドは React / Next.js / TypeScript、バックエンドは PHP / Laravel を中心に学習しています。
            </p>
            <p className="mb-3 text-base md:text-lg">
              「使いやすさ」を意識した設計や UI を追求しながら、少しずつ実践的な開発経験を積んでいます。
            </p>
            <p className="mb-4 text-base md:text-lg">
              将来的には、フロントとバックの両方を理解したエンジニアとして活躍できるように努力していきます。
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/haru268"
                target="_blank"
                className="inline-flex items-center gap-2 text-gray-900 hover:opacity-80"
              >
                <SiGithub className="w-5 h-5" />
                <span className="underline">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <Section id="contact" title="CONTACT">
      <p className="text-center mb-4 font-medium">
        お問い合わせは、メールにてお願いいたします。
      </p>
      <div className="text-center space-y-2">
        <p>Mail:&nbsp;<a href="mailto:you@example.com" className="text-blue-600 hover:underline">ha3110rukiruki@gmaul.com</a></p>
      </div>
    </Section>
  );
}

/* ---------- ページ本体 ---------- */
export default function PortfolioApp() {
  return (
    <>
      <Header />
      <main className="scroll-smooth text-gray-900 space-y-16">
        <Hero />
        <ProjectsSection />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
