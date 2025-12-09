import { IconType } from 'react-icons';
import {
  SiJavascript, SiTypescript, SiPython, SiGo, SiPhp, SiHtml5,
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiLaravel, SiDjango, SiSymfony, SiFlutter,
  SiMysql, SiPostgresql, SiSqlite, SiGithub, SiDocker, SiNetlify, SiHeroku, SiAmazon,
} from 'react-icons/si';

export type SkillItem = { name: string; icon: IconType; level: 0 | 1 };
export type SkillCategory = { title: string; items: SkillItem[] };

export const skillCategories: SkillCategory[] = [
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

