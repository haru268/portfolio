// スキル名とアイコン名のマッピング
export const skillIconNameMap: Record<string, string> = {
  'JavaScript': 'SiJavascript',
  'TypeScript': 'SiTypescript',
  'PHP': 'SiPhp',
  'Python': 'SiPython',
  'Go': 'SiGo',
  'HTML5/CSS3': 'SiHtml5',
  'React': 'SiReact',
  'Next.js': 'SiNextdotjs',
  'Vue.js': 'SiVuedotjs',
  'Nuxt.js': 'SiNuxtdotjs',
  'Laravel': 'SiLaravel',
  'Django': 'SiDjango',
  'Symfony': 'SiSymfony',
  'Flutter': 'SiFlutter',
  'MySQL': 'SiMysql',
  'PostgreSQL': 'SiPostgresql',
  'SQLite': 'SiSqlite',
  'Git/GitHub': 'SiGithub',
  'Docker': 'SiDocker',
  'Netlify': 'SiNetlify',
  'Heroku': 'SiHeroku',
  'AWS': 'SiAmazon',
};

export function getIconNameBySkillName(skillName: string): string {
  return skillIconNameMap[skillName] || 'SiGithub';
}

