import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'ファイルが選択されていません' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // public フォルダに保存
    const publicDir = join(process.cwd(), 'public');
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(publicDir, filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      success: true, 
      filename: `/${filename}`,
      path: filepath 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'ファイルのアップロードに失敗しました' }, { status: 500 });
  }
}

