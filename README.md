# Shiba Gallery for ComfyUI

生成画像を素早く見渡し、左に基準画像を固定して比較するための、読み取り専用ギャラリーです。

## インストール

**Python 3.14以上が必要です。** ComfyUIを実行しているPythonが対象です。Python 3.13以下との互換性は維持しません。CIはLinux・Windowsの通常版CPython 3.14を対象とし、将来のPython版やfree-threaded版での動作は別途確認が必要です。

ComfyUI の `custom_nodes` 内でこのリポジトリを clone し、ComfyUI を実行する Python 環境で `pip install -r requirements.txt` を実行して再起動します。ビルド済み frontend を同梱するため、利用者側の Node.js は不要です。サーバーはLinux/POSIXおよびWindowsの安全なファイルハンドル方式を実装していますが、Windows実機はこの環境では未検証です。

画面右側の水色の **Gallery** ボタンから開きます。旧 Gallery は当面無効化してください。同時導入での動作は保証していません。

## 操作

- output またはサブフォルダーを切り替え、新しい順に表示します。
- 初期表示は大きめのサムネイルです。小／大を利用中に変更できます。保存画像は変更しません。
- 画像を開いて大きく表示、またはチェックした画像から比較対象を選びます。
- 左が固定の基準、右が比較対象です。基準を選んだ直後は左右に同じ画像を表示し、その後の前後移動・候補選択で右だけを切り替えます。
- Pin済み画像とチェック済み画像から基準候補を選べます。チェックしただけでは自動でPin済みにはなりません。
- 通常表示は長辺1024px以内の高品質WebPです。切替直後はサムネイルを先に表示し、高速送り中は表示画像と設定情報の重い取得を停止後まで待ちます。単独選択や設定を開く操作は待機しません。
- 画質状態は画像直下に表示します。高品質WebPは非可逆圧縮であり、原画像と完全に同一ではありません。1:1など明示的な原画像表示で細部を確認できます。
- Downloadから取得するのは元ファイルそのものです。元がPNGならPNGのまま、保存設定も保持します。WebP表示用画像への置換や元PNGの書換えは行いません。
- 拡大・移動は連動を基本とし、個別調整もできます。
- 設定と差分は必要なときに開き、保存された値を確認・コピーします。
- Gallery を閉じると比較チェックを解除します。画像削除・workflow書き換え機能はありません。

## 画像転送の改善

最初の画像一覧はフォルダー全体の探索を待たず取得します。高品質WebP・高速送り中の取得抑制・元画像ダウンロードについては[画像配信の設計と測定](docs/image-delivery.md)を参照してください。Paperspaceでの体感改善は実環境での計測が必要です。

## Python 3.14での高速化

サムネイル生成を最大2枚の並行処理にし、同じ画像の重複変換を抑え、キャッシュ保存ごとの全件走査をなくしています。Python 3.14での合成ベンチマークでは未キャッシュ50枚の生成が約3.40秒から1.80秒になりました。Paperspaceでの体感速度や推論への影響を保証する数字ではありません。JIT・free-threadingを必須とせず、ComfyUI全体の設定は変更しません。[測定条件と制約](docs/python314-performance.md)を参照してください。

## 設定差分の限界

保存された PNG の `prompt`（実行用データ）と `workflow` を情報源ごとに扱います。実行時に保存されなかった値を復元しません。workflow の無名 widgets は配列位置で表示し、現在インストールされたノード定義から過去の意味を推測しません。同型ノードの対応は確認・変更してください。プロンプトとして識別できたテキストと、seedとして識別できた値は差分表示から除外します。seedは通常の設定表示にも出しません。元JSONの保存内容は保持し、コピー用の元データには含まれます。無名widgetの意味は推測しません。

## 開発

PythonテストはPython 3.14環境で `python -m pytest tests`。frontendは `cd web && npm ci && npm test && npm run build`。型チェックもbuildに含まれます。詳細は [実装計画](docs/superpowers/plans/2026-11-11-gallery.md) と [仕様書](docs/specs/gallery-spec.md) を参照してください。

## 状態・検証範囲

CIではPython 3.14のLinux／Windowsテスト、frontendの状態・コンポーネントテスト、ビルドとbundle検証、合成環境でのChromiumブラウザーテストを行います。実際の Paperspace 回線、GPU推論中の負荷、ユーザー独自ノードの全組み合わせ、最新ComfyUIとの実機互換性は別途確認が必要です。Vueへの変更だけで高速化できたとは主張しません。サーバー側サムネイル、表示範囲優先読み込み、一時キャッシュを組み合わせます。

サムネイル・索引は一時領域のみです。再起動時に作り直します。ファイル順は更新時刻（mtime）の新しい順であり、元の生成時刻を保証しません。詳細な性能計測手順は [検証記録](docs/verification.md) を参照してください。

## 謝辞・ライセンス

[PanicTitan/ComfyUI-Gallery](https://github.com/PanicTitan/ComfyUI-Gallery) と作者 PanicTitan 氏に感謝します。画像一覧・比較の利用体験および拡張構成を参考に、新規リポジトリとして実装しています。元リポジトリは MIT License、Copyright (c) 2025 PanicTitan です。

元のMIT全文を [licenses/PanicTitan-ComfyUI-Gallery-MIT.txt](licenses/PanicTitan-ComfyUI-Gallery-MIT.txt) に収録しています。流用範囲と依存物については [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。新規作成部分のライセンスはオーナーによる選定待ちです。

