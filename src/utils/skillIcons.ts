import { IconType } from 'react-icons';
import {
  SiJavascript, SiTypescript, SiPython, SiGo, SiPhp, SiHtml5,
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiLaravel, SiDjango, SiSymfony, SiFlutter,
  SiMysql, SiPostgresql, SiSqlite, SiGithub, SiDocker, SiNetlify, SiHeroku, SiAmazon,
} from 'react-icons/si';

export const iconMap: Record<string, IconType> = {
  SiJavascript: SiJavascript,
  SiTypescript: SiTypescript,
  SiPython: SiPython,
  SiGo: SiGo,
  SiPhp: SiPhp,
  SiHtml5: SiHtml5,
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiVuedotjs: SiVuedotjs,
  SiNuxtdotjs: SiNuxtdotjs,
  SiLaravel: SiLaravel,
  SiDjango: SiDjango,
  SiSymfony: SiSymfony,
  SiFlutter: SiFlutter,
  SiMysql: SiMysql,
  SiPostgresql: SiPostgresql,
  SiSqlite: SiSqlite,
  SiGithub: SiGithub,
  SiDocker: SiDocker,
  SiNetlify: SiNetlify,
  SiHeroku: SiHeroku,
  SiAmazon: SiAmazon,
};

export function getIconByName(name: string): IconType {
  return iconMap[name] || SiGithub;
}

