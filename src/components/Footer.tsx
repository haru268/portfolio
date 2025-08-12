export default function Footer() {
    return (
        <footer className="mt-24 bg-gray-900 text-white">
            {/* 以前の状態に戻す：中央寄せ・max-w コンテナ */}
            <div className="mx-auto max-w-7xl px-6">
                <div className="py-6 text-center text-sm opacity-90">
                    このサイトの画像・アイコンの一部は
            
                    {' '}<span>Simple Icons（react-icons 経由）</span>
                    {' '}を使用しています。
                </div>

                <div className="py-4 border-t border-white/10 text-center text-xs opacity-70">
                    © Haruki Kumon. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
