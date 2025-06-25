# 詳細設計書: 色当てクイズゲーム

## 1. 要件定義

### 1.1. 概要
画面に表示された色のRGB値を当てるシンプルなクイズゲーム。モダンなUIと心地よいインタラクションを通じて、プレイヤーに色彩感覚を試す楽しさを提供する。

### 1.2. 機能要件
- **ゲーム機能:** ランダムな色と選択肢を表示し、正誤判定を行う。
- **スコア機能:** 正解ごとにスコアを加算し、ゲームオーバー時に最終スコアを表示する。
- **UI/UX:** 日本語に最適化し、アニメーションを伴う直感的な操作性を提供する。

## 2. アーキテクチャ

- **フレームワーク:** Next.js (App Router)
- **UIライブラリ:** shadcn/ui
- **スタイリング:** Tailwind CSS
- **アニメーション:** Framer Motion
- **状態管理:** React Hooks (`useState`, `useCallback`, `useEffect`) を中心としたクライアントコンポーネント内での管理。
- **ディレクトリ構造:**
  ```
  /
  ├── /app
  │   ├── /_components/       # ゲーム用コンポーネント
  │   ├── layout.tsx
  │   └── page.tsx
  ├── /components/            # shadcn/uiが生成するUIコンポーネント
  ├── /docs/                  # ドキュメント
  ├── /lib
  │   └── colorUtils.ts     # 色生成などのヘルパー関数
  ├── /public/
  └── package.json
  ```

## 3. コンポーネント設計

各コンポーネントは `app/_components/` に配置される。

| コンポーネント名            | 役割と責務                                                                 |
| --------------------------- | -------------------------------------------------------------------------- |
| `game-container.tsx`        | ゲーム全体のロジックと状態（State）を管理する、最も中心的なコンポーネント。    |
| `score-display.tsx`         | 現在のスコアをアニメーション付きで表示する。                                 |
| `color-display.tsx`         | 当てるべき色と設問テキストをアニメーション付きで表示する。                   |
| `color-options-grid.tsx`    | 4つの選択肢ボタンをグリッドレイアウトで管理・表示する。                      |
| `color-option-button.tsx`   | 個々の選択肢ボタン。クリックイベントと状態に応じたフィードバックUIを持つ。     |
| `game-over-dialog.tsx`      | ゲームオーバー時に最終スコアとリスタートボタンを持つモーダルダイアログを表示。 |

## 4. データフロー

1.  **初期化:** `game-container`が`colorUtils`を使い、`correctColor`と`options`を生成し、Stateを初期化する。
2.  **描画:** 各コンポーネントがPropsを受け取り、`framer-motion`による初期アニメーションと共に画面を描画する。
3.  **ユーザー操作:** プレイヤーが`color-option-button`をクリック。イベントが`game-container`の`handleSelectOption`に伝播する。
4.  **判定:** `handleSelectOption`内で正誤を判定し、`userChoice`と`gameState`を更新する。
5.  **フィードバック描画:** `gameState`の変更をトリガーに、各コンポーネントが再描画される。
    - `ColorOptionButton`は正解/不正解の色に変化する。
    - `ColorDisplay`は正解のRGB値を表示する。
6.  **次のステップ:**
    - **正解の場合:** `useEffect`が`gameState`の変更を検知し、1.2秒後に`startNewRound`を呼び出して新しい問題を開始する。
    - **不正解の場合:** `gameState`が`gameOver`になり、`GameOverDialog`がアニメーション付きで表示される。
7.  **リスタート:** プレイヤーがダイアログの「もう一度挑戦する」ボタンをクリックすると、`handleRestart`が呼ばれ、Stateが初期化される (1に戻る)。

## 5. 主要なライブラリと役割

- **`framer-motion`**: コンポーネントの表示/非表示、状態変更に伴うアニメーションを宣言的に実装するために使用。
- **`class-variance-authority` / `clsx`**: `shadcn/ui`の内部で使用され、コンポーネントの状態に基づいた動的なクラス名の管理を容易にする。
- **`tailwind-merge`**: Tailwind CSSのクラス名が競合した際に、論理的に正しいクラスを適用するために`cn`ユーティリティ内で使用される。
- **`tailwindcss-animate`**: `tailwind.config.ts`で定義されたキーフレームアニメーションを有効にするために使用。
