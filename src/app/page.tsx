'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import { Section } from '../components/Section';
import { SkillRow } from '../components/SkillRow';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { ExternalLink } from '../components/ExternalLink';
import { AdminLink } from '../components/AdminLink';
import { projectCards } from '../data/projectCards';
import { skillCategories } from '../data/skills';
import { SiGithub } from 'react-icons/si';



function Hero() {
  return (
    <header id="top" className="relative w-full pt-16 overflow-hidden">
      <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px]">
        <Image
          src="/hero.jpg"
          alt="Haruki Kumon - Web Application Engineer"
          fill
          className="object-cover md:object-cover object-right md:object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-900/40 to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-20 left-8 bg-gray-900/30 backdrop-blur-sm text-white p-6 rounded-xl w-fit leading-relaxed shadow-lg border border-white/10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        >
          Haruki&nbsp;Kumon
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold mb-6"
        >
          Webアプリケーション開発エンジニア
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl"
        >
          ユーザーとクライアントの「使いやすい！」を形にします。<br />Webアプリ開発はお任せください。
        </motion.p>
      </motion.div>
    </header>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" title="WORKS">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectCards.map((project, index) => (
            <ScrollAnimation key={project.slug} delay={index * 0.1}>
              <ProjectCard
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                description={project.description}
                badges={project.badges}
                href={`/works/${project.slug}`}
              />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </Section>
  );
}



function Skills() {
  return (
    <Section id="skills" title="SKILL">
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {skillCategories.map((cat) => (
          <ScrollAnimation key={cat.title}>
            <div>
              <h3 className="text-base md:text-lg font-extrabold uppercase text-gray-700 mb-4 px-2 text-center">
                {cat.title}
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {cat.items.map((item) => (
                    <SkillRow key={item.name} icon={item.icon} name={item.name} level={item.level} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>

      <div className="mt-10">
        <div className="mx-auto max-w-2xl md:max-w-3xl px-4 text-center">
          <ul className="text-base md:text-lg text-gray-900 space-y-2 font-bold text-left inline-block">
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


function About() {
  return (
    <Section id="about" title="ABOUT">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <ScrollAnimation>
          <div className="mt-6 md:mt-10 flex items-start gap-8 md:gap-12">
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="shrink-0"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/profile.jpg"
                  alt="Haruki Kumon"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 144px, (min-width:768px) 128px, 112px"
                />
              </div>
            </motion.div>
            <div className="min-w-0 leading-relaxed">
              <p className="text-2xl md:text-3xl font-extrabold mb-4">Haruki Kumon</p>
              <div className="space-y-3">
                <p className="text-base md:text-lg">
                  Webアプリ開発を学びながら成長しているジュニアエンジニアです。
                </p>
                <p className="text-base md:text-lg">
                  フロントエンドは React / Next.js / TypeScript、バックエンドは PHP / Laravel を中心に学習しています。
                </p>
                <p className="text-base md:text-lg">
                  「使いやすさ」を意識した設計や UI を追求しながら、少しずつ実践的な開発経験を積んでいます。
                </p>
                <p className="text-base md:text-lg">
                  将来的には、フロントとバックの両方を理解したエンジニアとして活躍できるように努力していきます。
                </p>
              </div>

              <div className="flex items-center gap-6 mt-6">
                <ExternalLink
                  href="https://github.com/haru268"
                  target="_blank"
                  ariaLabel="GitHubプロフィールを開く（新しいタブ）"
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-300"
                >
                  <SiGithub className="w-5 h-5" />
                  <span className="underline">GitHub</span>
                </ExternalLink>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="CONTACT">
      <ScrollAnimation>
        <p className="text-center mb-6 font-medium text-lg">
          お問い合わせは、メールにてお願いいたします。
        </p>
        <div className="text-center">
          <ExternalLink
            href="mailto:ha3110rukiruki@gmail.com"
            ariaLabel="メールを送信: ha3110rukiruki@gmail.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-lg font-semibold transition-colors duration-300"
          >
            <span>📧</span>
            <span className="underline">ha3110rukiruki@gmail.com</span>
          </ExternalLink>
        </div>
      </ScrollAnimation>
    </Section>
  );
}

export default function HomePage() {
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
      <AdminLink />
    </>
  );
}
