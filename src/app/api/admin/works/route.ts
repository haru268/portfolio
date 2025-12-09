import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const DATA_FILE = join(process.cwd(), 'data', 'projects.json');

// プロジェクトデータを取得
export async function GET() {
  try {
    if (!existsSync(DATA_FILE)) {
      return NextResponse.json({ projects: {} });
    }
    const data = await readFile(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'データの取得に失敗しました' }, { status: 500 });
  }
}

// プロジェクトデータを保存
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projects } = body;

    // データディレクトリが存在しない場合は作成
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    await writeFile(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'データの保存に失敗しました' }, { status: 500 });
  }
}

