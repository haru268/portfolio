import { IconType } from 'react-icons';
import {
  SiJavascript, SiTypescript, SiPython, SiGo, SiPhp, SiHtml5,
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiLaravel, SiDjango, SiSymfony, SiFlutter,
  SiMysql, SiPostgresql, SiSqlite, SiGithub, SiDocker, SiNetlify, SiHeroku, SiAmazon,
} from 'react-icons/si';

export type SkillItem = { name: string; icon: IconType; iconName?: string; level: 0 | 1 | 2 | 3 | 4 | 5 };
export type SkillCategory = { title: string; items: SkillItem[] };

export const skillCategories: SkillCategory[] = [
  {
    title: 'LANGUAGE',
    items: [
      { name: 'JavaScript', icon: SiJavascript, iconName: 'SiJavascript', level: 1 },
      { name: 'TypeScript', icon: SiTypescript, iconName: 'SiTypescript', level: 1 },
      { name: 'PHP', icon: SiPhp, iconName: 'SiPhp', level: 0 },
      { name: 'Python', icon: SiPython, iconName: 'SiPython', level: 0 },
      { name: 'Go', icon: SiGo, iconName: 'SiGo', level: 0 },
      { name: 'HTML5/CSS3', icon: SiHtml5, iconName: 'SiHtml5', level: 1 },
    ],
  },
  {
    title: 'FRAMEWORK',
    items: [
      { name: 'React', icon: SiReact, iconName: 'SiReact', level: 1 },
      { name: 'Next.js', icon: SiNextdotjs, iconName: 'SiNextdotjs', level: 1 },
      { name: 'Vue.js', icon: SiVuedotjs, iconName: 'SiVuedotjs', level: 0 },
      { name: 'Nuxt.js', icon: SiNuxtdotjs, iconName: 'SiNuxtdotjs', level: 0 },
      { name: 'Laravel', icon: SiLaravel, iconName: 'SiLaravel', level: 1 },
      { name: 'Django', icon: SiDjango, iconName: 'SiDjango', level: 0 },
      { name: 'Symfony', icon: SiSymfony, iconName: 'SiSymfony', level: 0 },
      { name: 'Flutter', icon: SiFlutter, iconName: 'SiFlutter', level: 0 },
    ],
  },
  {
    title: 'DB ・ TOOL',
    items: [
      { name: 'MySQL', icon: SiMysql, iconName: 'SiMysql', level: 1 },
      { name: 'PostgreSQL', icon: SiPostgresql, iconName: 'SiPostgresql', level: 0 },
      { name: 'SQLite', icon: SiSqlite, iconName: 'SiSqlite', level: 0 },
      { name: 'Git/GitHub', icon: SiGithub, iconName: 'SiGithub', level: 1 },
      { name: 'Docker', icon: SiDocker, iconName: 'SiDocker', level: 0 },
      { name: 'Netlify', icon: SiNetlify, iconName: 'SiNetlify', level: 0 },
      { name: 'Heroku', icon: SiHeroku, iconName: 'SiHeroku', level: 0 },
      { name: 'AWS', icon: SiAmazon, iconName: 'SiAmazon', level: 0 },
    ],
  },
];

