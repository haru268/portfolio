import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const DATA_FILE = join(process.cwd(), 'data', 'skills.json');

// スキルデータを取得
export async function GET() {
  try {
    if (!existsSync(DATA_FILE)) {
      // デフォルトデータを返す（iconNameを設定、iconプロパティは除外）
      const { skillCategories } = await import('@/data/skills');
      const { getIconNameBySkillName } = await import('@/utils/skillIconNames');
      
      const categoriesWithIconNames = skillCategories.map((cat) => ({
        title: cat.title,
        items: cat.items.map((item) => ({
          name: item.name,
          iconName: item.iconName || getIconNameBySkillName(item.name),
          level: item.level,
        })),
      }));
      
      return NextResponse.json({ skillCategories: categoriesWithIconNames });
    }
    const data = await readFile(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'データの取得に失敗しました' }, { status: 500 });
  }
}

// スキルデータを保存
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillCategories } = body;

    // データディレクトリが存在しない場合は作成
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    await writeFile(DATA_FILE, JSON.stringify({ skillCategories }, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'データの保存に失敗しました' }, { status: 500 });
  }
}

