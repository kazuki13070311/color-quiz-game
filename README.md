# 色当てクイズゲーム (Color Guessing Quiz)

表示された色のRGB値を当てる、シンプルでモダンなデザインのクイズゲームです。

## ✨ 特徴

[![Image from Gyazo](https://i.gyazo.com/f91f7bf60fcad60c4d935db37e97a9fa.gif)](https://gyazo.com/f91f7bf60fcad60c4d935db37e97a9fa)

- **モダンなUI/UX:** `shadcn/ui` と `Tailwind CSS` をベースに、グラデーション背景や洗練されたコンポーネントデザインを採用。

- **モダンなUI/UX:** `shadcn/ui` と `Tailwind CSS` をベースに、グラデーション背景や洗練されたコンポーネントデザインを採用。
- **心地よいアニメーション:** `framer-motion` を活用し、スムーズで直感的なインタラクションを実現。
- **日本語対応:** 日本語環境に最適化されたフォント（Noto Sans JP）とUIテキスト。
- **レスポンシブデザイン:** PCからスマートフォンまで、様々なデバイスで快適にプレイ可能。

## 🛠️ 技術スタック

- **フレームワーク:** Next.js (App Router)
- **UIコンポーネント:** shadcn/ui
- **スタイリング:** Tailwind CSS
- **アニメーション:** Framer Motion
- **言語:** TypeScript
- **パッケージマネージャー:** pnpm
- **Node.jsバージョン管理:** anyenv (nodenv)

## 🚀 起動方法

1.  **リポジトリをクローン:**
    ```bash
    git clone <repository_url>
    cd color-quiz-game
    ```

2.  **Node.jsのバージョンを合わせる:**
    このプロジェクトは特定のNode.jsバージョンを使用します。`anyenv` (`nodenv`) を使用している場合、ディレクトリに入るだけで自動的にバージョンが切り替わります。
    
    もし指定のバージョン (`.node-version` ファイルに記載) がインストールされていない場合は、以下のコマンドでインストールしてください。
    ```bash
    nodenv install
    ```

3.  **依存関係をインストール:**
    ```bash
    pnpm install
    ```

4.  **開発サーバーを起動:**
    ```bash
    pnpm dev
    ```

5.  ブラウザで `http://localhost:3000` を開いてください。
## 📄 詳細

より詳細なアーキテクチャやコンポーネント設計については、以下のドキュメントを参照してください。

- [詳細設計書](./docs/details.md)

