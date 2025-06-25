# Gemini CLIとペアプロ開発！Next.jsで色当てクイズゲームをゼロから作った全記録

## はじめに

「AIは本当に開発のパートナーになり得るのか？」

そんな疑問から、今回はGoogleのAIアシスタント「Gemini CLI」を相棒に、Next.js製のWebアプリケーションをゼロから構築する挑戦をしました。

この記事では、単純なコード生成だけでなく、**設計、プロジェクトセットアップ、実装、予期せぬエラーとの戦い、UIの改善、そしてドキュメント作成**に至るまで、Gemini CLIと対話しながら開発を進めた全プロセスを、具体的なコマンドやコードを交えて共有します。

完成したプロダクトはこちらです。

[![Image from Gyazo](https://i.gyazo.com/f91f7bf60fcad60c4d935db37e97a9fa.gif)](https://gyazo.com/f91f7bf60fcad60c4d935db37e97a9fa)

**リポジトリ:** [https://github.com/kazuki13070311/color-quiz-game](https://github.com/kazuki13070311/color-quiz-game)

## 第1章：設計から始めるAIとの対話

開発は「Next.jsで色当てクイズゲームを作りたい」という漠然とした要求から始まりました。

驚いたことに、Geminiは単にコードを書き始めるのではなく、まず**ユーザーストーリー**の定義から提案してきました。これにより、作るべき機能が明確になりました。

> **Geminiの提案（要約）:**
> 1.  **コア体験:** 色を見て、選択肢からRGB値を選び、即座にフィードバックを得る。
> 2.  **モチベーション:** スコアが加算され、ゲームオーバー時に再挑戦したくなる。
> 3.  **UI/UX:** クリーンで、スムーズなアニメーションを持つインターフェース。

このユーザーストーリーに基づき、コンポーネント設計やデータフローを定義したドキュメント (`docs/details.md`) を作成させました。AIが開発の上流工程から関われるのは、大きな発見でした。

## 第2章：コマンド一つで進むプロジェクトセットアップ

設計が固まったら、次は環境構築です。ここでのGemini CLIの真価は、シェルコマンドの実行能力にありました。

#### 1. Next.jsプロジェクト作成

```bash
# Geminiが実行したコマンド
$ npx create-next-app@latest color-quiz-game --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

#### 2. shadcn/uiの導入

```bash
# Geminiが実行したコマンド
$ cd color-quiz-game
$ yes | npx shadcn@latest init
$ npx shadcn@latest add button card alert-dialog
```

#### 3. Gitの初期化

```bash
# Geminiが実行したコマンド
$ git add . && git commit -m "feat: Initial setup with Next.js and shadcn/ui"
```

これらの定型的な作業を、対話形式で指示するだけでGeminiが正確に実行してくれたため、開発者は本来集中すべきアプリケーションのロジック設計にすぐに取り掛かることができました。

## 第3章：実装フェーズ - AIがコードを書く

ファイル生成もGeminiの得意分野です。まず、設計書に基づいた空のコンポーネントファイル群を`touch`コマンドで一括作成させました。

その後、各コンポーネントの実装を依頼しました。例えば、ゲームの心臓部である `GameContainer.tsx` の状態管理部分は、以下のようなコードを生成してくれました。

```typescript:app/_components/game-container.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
// ... 他のimport

type GameState = 'playing' | 'answered' | 'gameOver';

export default function GameContainer() {
  const [correctColor, setCorrectColor] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [userChoice, setUserChoice] = useState<{ color: string; isCorrect: boolean } | null>(null);

  const startNewRound = useCallback(() => {
    // ... 新しい問題を作成するロジック
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  // ... 回答処理やリスタートのハンドラ関数
}
```

このように、React Hooksの作法に則った、見通しの良いコードを生成してくれるため、開発者はレビューと微調整に集中できます。

## 第4章：予期せぬエラーとの戦い - AIはデバッガーになる

開発は順調に見えましたが、ここで大きな壁にぶつかります。`pnpm dev`でアプリを起動しようとすると、Node.jsのバージョンエラーで失敗するのです。

```
You are using Node.js 16.17.0. For Next.js, Node.js version "^18.18.0 ..." is required.
```

ローカルのNode.jsはv20に切り替えたはずなのに、なぜ...？

ここでGeminiに原因究明を依頼したところ、問題の切り分けが始まりました。

1.  **仮説1:** `pnpm`のキャッシュか？ → `rm -rf node_modules` と `pnpm install` を実行させるも、解決せず。
2.  **仮説2:** `pnpm`の実行環境の問題か？ → `pnpm`をバイパスして`node ./node_modules/.bin/next dev`を試すも、別のエラー。

そして、決定的な診断コマンドをGeminiが提案しました。

```bash
# Geminiが提案・実行したコマンド
$ pnpm exec which node
```

**実行結果:**
`/Users/kazuki.kasai/.anyenv/envs/nodenv/versions/16.17.0/bin/node`

**原因が判明しました。** 私の環境では`anyenv`と`nvm`という2つのバージョン管理ツールが混在しており、`pnpm`が古い`anyenv`側のNode.jsを参照してしまっていたのです。

最終的に、`anyenv` (`nodenv`) を使ってNode.jsのバージョンをプロジェクトに固定する(`nodenv local 20.11.1`)ことで、この問題は完全に解決しました。AIが**対話的にデバッグ**を進め、根本原因を特定してくれた瞬間は、まさに「パートナー」だと感じました。

## 第5章：UIの改善とドキュメント作成

エラーを乗り越えた後、アプリを「日本人向けのモダンなデザイン」に仕上げる作業を行いました。

-   **日本語フォント(Noto Sans JP)の導入**
-   **Framer Motionによるアニメーション強化**
-   **UIテキストの日本語化**

これらの作業も、`layout.tsx`や各コンポーネントの修正を指示するだけで、Geminiが具体的なコードに落とし込んでくれました。

最後に、このプロジェクトの知見をまとめるドキュメント作成も依頼しました。

-   `README.md`: プロジェクト概要や起動方法
-   `docs/details.md`: 詳細な設計書
-   `GEMINI.md`: Gemini自身が今後の作業で参照するための作業用ドキュメント

特に、AI自身のための設定ファイル`GEMINI.md`を作成するというアイデアは、AIとの長期的な協業を見据えた面白い試みでした。

## まとめ：Gemini CLIは開発をどう変えるか

今回の挑戦を通じて、Gemini CLIが開発の様々なフェーズで強力なパートナーになることを実感しました。

-   **高速なセットアップと実装:** 定型作業を自動化し、開発者はコアロジックに集中できる。
-   **対話的なデバッグ:** エラー発生時に、仮説検証を繰り返しながら根本原因を特定する手助けをしてくれる。
-   **知識の拡張:** `framer-motion`の導入や`tailwind.config.ts`の書き方など、自分が知らないベストプラクティスを提案してくれる。

もちろん、最終的な判断や設計の舵取りは開発者自身が行う必要があります。しかし、AIを「思考の壁打ち相手」であり「有能な実装アシスタント」として活用することで、開発の生産性と質は間違いなく向上すると感じました。

皆さんも、次のプロジェクトでAIとのペアプログラミングを試してみてはいかがでしょうか。
