# Shiba Gallery for ComfyUI

生成画像を素早く見渡し、左に基準画像を固定して比較するための、読み取り専用ギャラリーです。

## インストール

ComfyUI の `custom_nodes` 内でこのリポジトリを clone し、ComfyUI を実行する Python 環境で `pip install -r requirements.txt` を実行して再起動します。ビルド済み frontend を同梱するため、利用者側の Node.js は不要です。サーバーはLinux/POSIXおよびWindowsの安全なファイルハンドル方式を実装していますが、Windows実機はこの環境では未検証です。非公開リポジトリの clone にはご自身の GitHub 認証が必要です。

画面右側の水色の **Gallery** ボタンから開きます。旧 Gallery は当面無効化してください。同時導入での動作は保証していません。

## 操作

- output またはサブフォルダーを切り替え、新しい順に表示します。
- 小／大サムネイルを利用中に変更できます。保存画像は変更しません。
- 画像を開いて大きく表示、またはチェックした画像から比較対象を選びます。
- 左が固定の基準、右が比較対象です。前後移動・候補選択で右だけを切り替えます。
- 拡大・移動は連動を基本とし、個別調整もできます。
- 設定と差分は必要なときに開き、保存された値を確認・コピーします。
- Gallery を閉じると比較チェックを解除します。画像削除・workflow書き換え機能はありません。

## 設定差分の限界

保存された PNG の `prompt`（実行用データ）と `workflow` を情報源ごとに扱います。実行時に保存されなかった値を復元しません。workflow の無名 widgets は配列位置で表示し、現在インストールされたノード定義から過去の意味を推測しません。同型ノードの対応は確認・変更してください。プロンプトとして識別できたテキストと、seedとして識別できた値は差分表示から除外します。seedは通常の設定表示にも出しません。元JSONの保存内容は保持し、コピー用の元データには含まれます。無名widgetの意味は推測しません。

## 開発

Pythonテストは `python -m pytest tests`。frontendは `cd web && npm ci && npm test && npm run build`。型チェックもbuildに含まれます。詳細は [実装計画](docs/superpowers/plans/2026-11-11-gallery.md) と [仕様書](docs/specs/gallery-spec.md) を参照してください。

## 状態・検証範囲

初回実装です。合成PNGのPythonテスト、frontendの状態・コンポーネントテスト、ビルドとbundle起動検証を実施しました。ブラウザーE2Eは実行環境のChromium起動制限で未実行です。実際の Paperspace 回線、GPU推論中の負荷、ユーザー独自ノードの全組み合わせ、最新ComfyUIとの実機互換性は別途確認が必要です。Vueへの変更だけで高速化できたとは主張しません。サーバー側サムネイル、表示範囲優先読み込み、一時キャッシュを組み合わせます。

サムネイル・索引は一時領域のみです。再起動時に作り直します。ファイル順は更新時刻（mtime）の新しい順であり、元の生成時刻を保証しません。詳細な性能計測手順は [検証記録](docs/verification.md) を参照してください。

## 謝辞・ライセンス

[PanicTitan/ComfyUI-Gallery](https://github.com/PanicTitan/ComfyUI-Gallery) と作者 PanicTitan 氏に感謝します。画像一覧・比較の利用体験および拡張構成を参考に、新規リポジトリとして実装しています。元リポジトリは MIT License、Copyright (c) 2025 PanicTitan です。

元のMIT全文を [licenses/PanicTitan-ComfyUI-Gallery-MIT.txt](licenses/PanicTitan-ComfyUI-Gallery-MIT.txt) に収録しています。流用範囲と依存物については [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。新規作成部分のライセンスはオーナーによる選定待ちです。
