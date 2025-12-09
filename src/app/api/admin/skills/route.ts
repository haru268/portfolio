import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { skillCategories as defaultSkillCategories } from '@/data/skills';
import { getIconNameBySkillName } from '@/utils/skillIconNames';

const DATA_FILE = join(process.cwd(), 'data', 'skills.json');

// スキルデータを取得
export async function GET() {
  try {
    // データファイルが存在する場合は読み込む
    if (existsSync(DATA_FILE)) {
      try {
        const data = await readFile(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(data);
        return NextResponse.json(parsed);
      } catch (readError) {
        console.error('Error reading data file:', readError);
        // ファイル読み込みエラーの場合はデフォルトデータを返す
      }
    }
    
    // デフォルトデータを返す（iconNameを設定、iconプロパティは除外）
    const categoriesWithIconNames = defaultSkillCategories.map((cat) => ({
      title: cat.title,
      items: cat.items.map((item) => ({
        name: item.name,
        iconName: item.iconName || getIconNameBySkillName(item.name),
        level: item.level,
      })),
    }));
    
    return NextResponse.json({ skillCategories: categoriesWithIconNames });
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

