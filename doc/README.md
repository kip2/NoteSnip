<h1 align="center">🐈️作成の際に検討したこと🐈</h1>

作成の際に検討したことや苦労話を書いておきます。

昔から、人がプログラムでなにかを作っているのをみて、彼らはなにも苦労せず作成できているように感じていました（絶対そんなこと無いと思うんですけどね。皆さんそれぞれ苦労しながら作成していると思うので。誤解による所産です）。

愚かな身の感想として、「みんなぐっとガッツポーズしただけで作品ができている」様に感じていた、というわけです。

しかし、自分もいろいろ作るようになり、さらに長じて人の苦労を知ると、「裏で苦労している部分はあるが、表に出していないだけ」というのが分かってきました。

分かってはきましたが、その苦労したところ、それから作成する過程をぜひとも知りたかったんですね。

どう悩んで作ってきたのか、悩んで止まったときはどの様に解決しているのか、等々...

「作ります」 -> 「できました」の間の飛躍の中身が知りたかったというわけです。

そういった思いがあったんですが、そういった物を記載するかどうかは個人の自由です。

書かれることを期待することがナンセンスだったのだと、いまでは思っています。

しかし、人に期待していたのだから、自分はせめてなにか作成過程を残すかなーと思って書いたのが、本文書になります。

参考にするなり、読んで笑うなりしてもらえればよいかと思います。

文章稚拙なため、参考にならない場合は申し訳ない。

なお、今回作成したものがRecursionCSのバックエンドプロジェクトの課題の一つのため、RecursionCSをやっているユーザーには多少でも参考になるところがあるかもしれません。

---

## 目次

- [目次](#目次)
- [要件](#要件)
  - [機能要件](#機能要件)
  - [技術要件](#技術要件)
  - [非機能要件](#非機能要件)
- [全体的なこと](#全体的なこと)
  - [言語の選定](#言語の選定)
    - [言語を変更したことによって生じた作業](#言語を変更したことによって生じた作業)
      - [Rustで作成した自作ツール郡](#rustで作成した自作ツール郡)
        - [consowrap](#consowrap)
        - [sqcr](#sqcr)
        - [db-wipe](#db-wipe)
        - [migrate](#migrate)
        - [migrate-PostgreSQL](#migrate-postgresql)
        - [seeder](#seeder)
- [サーバ](#サーバ)
- [バックエンド](#バックエンド)
  - [ハッシュ関数について](#ハッシュ関数について)
  - [API](#api)
- [フロントエンド](#フロントエンド)
  - [YamadaUI](#yamadaui)
  - [CodeMirror](#codemirror)
  - [UIVerse](#uiverse)
  - [Google Fonts](#google-fonts)
  - [favion](#favion)
- [セキュリティ](#セキュリティ)
  - [クロスオリジン対策](#クロスオリジン対策)
  - [各種設定値](#各種設定値)
- [その他](#その他)
  - [Domainの移管](#domainの移管)
- [参考資料](#参考資料)
- [インフラ](#インフラ)
  - [Cloudflare](#cloudflare)
  - [NGINX](#nginx)
- [フロントエンド](#フロントエンド-1)
  - [全体的](#全体的)
  - [React](#react)
  - [TypeScript](#typescript)
  - [vite](#vite)
  - [CSS](#css)
  - [CodeMirror](#codemirror-1)
  - [使わなかったが、勉強になったもの](#使わなかったが勉強になったもの)
- [バックエンド](#バックエンド-1)
  - [API作成時の資料](#api作成時の資料)
  - [hash関数作成時の資料](#hash関数作成時の資料)
- [DB](#db)
  - [DB検討時の資料](#db検討時の資料)
  - [DB設計時の資料](#db設計時の資料)
  - [CockroachDB Serverless](#cockroachdb-serverless)
  - [DBの検証環境構築時の資料](#dbの検証環境構築時の資料)
- [その他](#その他-1)
  - [Font](#font)


---

---

---


## 要件

今回作成したものの要件は以下になります。

### 機能要件

- スニペットのアップロード
	- テキストエリアにテキストやコードを貼り付ける
	- プログラミング言語ごとに構文ハイライトする
	- ユーザーが内容を送信すると、スニペット用のURL（一意）が生成される
		- フォーマットは`https://{domain}/{path}/{unique-string}`
- スニペットの閲覧
	- 一意のURLにアクセスしてスニペットを閲覧できる
	- コードハイライトあり
- スニペットの有効期限設定
	- スニペットの有効期限が設定できる(例: 10分、1時間、1日、永続)
	- 期限切れになったスニペットは自動的に削除され、「Expired Snippet」とメッセージを表示する
- データストレージ
	- ユーザーからの送信されるデータは、厳格に検証とサニタイズが行われる必要がある
	- SQLインジェクションを防ぐために、スニペットは安全に保存される
- フロントエンドインタフェース
	- シンプルで使いやすいインタフェース
	- スニペット成功して送信されると、内容にアクセスできる一意のURLが生成され、ユーザーに表示する
- エラーハンドリング
	- 大量のテキストやコード、または、サポートされていない文字が送信された場合でも、適切に処理してエラーメッセージを表示する

### 技術要件

- ウェブインタフェース
	- HTML/CSSを利用
	- JavaScriptも使用
	- monacoエディタを使用
- バックエンド
	- サーバーサイドは静的型付けが可能なOOPの言語。例ではPHP8.0
	- 一意のURL生成にはhash()のようなハッシュ関数を用いる
- データベース
	- MySQLを使用
- ミドルウェア
	- マイグレーション管理システムを使用
	- DBとの接続にMySQLWrapperを使用する

### 非機能要件

- デプロイメント
	- サービスはユーザーが簡単に記憶できるドメインやサブドメインで公開する必要がある
	- サービスが常に利用可能となるようにする(使えない時間を極力少なくする)
	- Gitコマンドを実行するだけで、コードの更新と同期が自動で行える必要がある
- パフォーマンス
	- スニペットを効率よく取得して、ユーザーが迅速に閲覧できるようにする必要がある
	- ページの読み込みが極端に遅くなることなく、速やかに構文ハイライトを表示できるようにする
- スケーラビリティ
	- 大量のスニペットが送信されても、それらをスムーズに処理できるシステムを確立する必要がある
- セキュリティ
	- スニペットが安全に保存され、不正アクセスを防ぐ必要がある
	- 安全な接続とデータの暗号化を保証するために、HTTPSを採用する必要がある


要件は以上ですが、すべての要件は満たしていません。

言語を変えたり、意図的によりよいと思ったものに変更したものがあるためです。

故に、課題としては百点満点で実装できたわけではないことを、ここに明言しておきます。

今見返すと取りこぼしたところもありそうだしね...(目逸らし)

---

---

---

## 全体的なこと

さて、ここから苦労した点や作成時の考え方などについて記載します。

---

### 言語の選定

本来、バックエンドプロジェクトで想定されているのは以下のものでした。

- php
- JavaScript

ただ、プロジェクト側で静的型付け言語であればいいといった記載があったため（あったかな？ ...あったと思う）、趣味で以下の言語を選択しました。

バックエンドはRust。
趣味で選定。

本来はバックエンドプロジェクトおわるまではRustの学習は我慢する予定でしたが、バックエンドプロジェクト自体が時間がかかる内容であることもあり、我慢できずRustを使用することにしました。
というよりも、「やりたい言語があるのに自分を縛り続けるのも意味がわからないな」といったところが実情でしょうか。
どうせ苦労するなら好きな言語使っちまえ、ということですね。

やっぱり好きなものやるほうが健康に良いですね。

しかし、Rustを選定することで苦労が生じました。それについては後述します。

  

フロントエンドはTypeScript + Reactを使っています。

こちらはもともとReactプロジェクト等で勉強していたこと、それからjsx記法、コンポーネント化の機能を気に入っていたため使用しています。
一つ前の静的サイトを作成する課題で使用していたので、そのまま続投した形です。

なお、その時作ったサイトは[こちら](https://github.com/kip2/my-website)になります。


#### 言語を変更したことによって生じた作業

Rustを選定したことによって生じた苦労について。

もともとはphpで進めるプロジェクトであり、学習中のサンプルコードももちろんphpで書かれていました。
しかし、Rustを選んだことで、そのサンプルは使えません。
そのため、サンプルコードもRustで自力実装する必要が生じました。

しかも、Rustとphpの言語の特徴の差異のため、この自力実装にかなり悩まされました。
何に悩まされたかというと、

- サンプルコードはphpによりOOPを使用したコードでした。RustはOOPも実装は可能ですが、せっかくならよりRustっぽく実装したいと思っていたので、Rustのパラダイムに変換しながら実装する必要が生じました。これは自分で背負った苦労です。
- サンプルコードはphpのスクリプト言語の側面を最大限に利用していました。Rustではコンパイルする必要があるため、そこの違いをどの様に実装するべきか、といったところをかなり悩み、なかなか骨が折れました。苦しいです。評価してください。

上記の点、それからRust自体のキャッチアップを含めて、結局作成志してから作り上げるまで9ヶ月かかってしまいました。

もちろん間でwebsiteを作ったり他のプロダクト作成をしていたため、そのあたりの時間を差っ引く必要はありますが...

さすがに時間かけすぎでしょ...

わりぃ...やっぱ...つれぇわ......

まあ無事に完成したので無問題です。
時間かかったことは特に気にしていません。後悔もしていません。本当です。信じてください（曇りなき眼）。

冗談はさておき、苦労はしましたが、結果的には良かったと考えているのが以下の点です。

- RustでCLIツールを作るところから始めたので、Rustの学習がスムーズだった。
- また、たくさんのツールを作る必要が生じたため、経験値も積めた。
- 最終的にAPIサーバをRustで作成できたので、自信につながった。
- Rust触るの楽しい。

##### Rustで作成した自作ツール郡

さて、phpからRustに変えることで自作したツールは以下のものです。

個別にリポジトリを切っているので、興味があればご覧ください。

###### consowrap

[GitHub - kip2/consowrap: It is a simple console wrapper application made in Rust.](https://github.com/kip2/consowrap)

コマンドツールをまとめて一括で扱えるようにするためのCLIツール。

###### sqcr

[GitHub - kip2/sqcr: This is a simple application for executing SQL from the console.](https://github.com/kip2/sqcr)

単純にsqlファイルのSQLを実行できるようにしたコマンド。当初必要かなと考えて作ったが、結局不要になったため使っていない。

###### db-wipe

[GitHub - kip2/db-wipe: A simple command-line tool for deleting databases in MySQL.](https://github.com/kip2/db-wipe)

MySQLのバックアップを行うためのツール。MySQLは使用しないことになったため、作ったが使っていないツール。

###### migrate

[GitHub - kip2/migrate: This is a simple migration application that can be executed in the console.](https://github.com/kip2/migrate)

マイグレーション用のツール。PostgreSQLとMySQLに対応したマイグレーションツール。
MySQLが要件にあったが、マイグレーションの仕様を誤解していたため、DDL文によるトランザクションを回避する必要があると誤解し、PostgreSQLでも使用できるようにしている。

###### migrate-PostgreSQL

[GitHub - kip2/migrate-PostgreSQL: This is a simple migration application that can be executed in the console, using PostgreSQL as the database.](https://github.com/kip2/migrate-PostgreSQL)

マイグレーション用のツールで、途中PostgreSQLに変更しようか検討したときに作成。

上のmigrateに機能が統合されたため、こちらは作ったが使っていない。

###### seeder

[GitHub - kip2/seeder](https://github.com/kip2/seeder)

シーダー用のツール。一番最後に作成。

このころには使用するDBが決定していたため、PostgreSQLのみに対応している。

---

## サーバ

今回利用しているサーバは以下になります

- バックエンドサーバ:APIを配置するサーバ。
- フロントエンドサーバ:クライアントに配布する画面機能を配置するサーバ。
- DBサーバ:DBを配置するサーバ。

プロジェクトの流れに従うと、1つのサーバ上に上記3つを乗せることになると思います。

とはいえ、冒険してはいけないわけではないと思うので、冒険して個別のサーバにわけました。

また、冒険したのは以下の理由もあったからです。

- 一つのインスタンス（AWS）に乗せるとスペックを考慮する必要があります。特に、今後バックエンドプロジェクトを進めると他のプロダクトも乗せる必要があるため、それによる懸念がありました。
- お金をあまりかけたくなかったことがあります。一点目と関連する内容ですが、インスタンスの数を増やしたりスペックを増強するとお金がかかります。公開するサービスの永続性のためにもできるだけお金をかけずに継続したかったのです。
- 単純に冒険したかったことがあります。いろんな技術触りたい。技術触るの楽しい。

---

## バックエンド

Rustをバックエンドに選定したことによる苦労等は言語の欄で語っているため、こちらでは省略します。

その他の覚えてる範囲のことを書きます。

### ハッシュ関数について

今回のプロダクトでは、要件上、API側で一意のハッシュを生成する必要がありました。

いろいろ実現手段はあるかと思いますが、最初、一意性があり衝突性を気にしなくて良いと聞いたため、Blake3を使おうと選定しました。

しかし実際に使ってみると、今回のプロダクトには向かない点がみつかりました。

生成されるハッシュが64文字ありURLにするには長すぎる、という点です。

さすがにURLにするのに64文字は長すぎのかなと思い、検討した結果、UUID + sqidsクレートを採用しました。

[Short Unique IDs in Rust · Sqids](https://sqids.org/rust)

sqidsを使うと一意性を失わずにハッシュを短くできるそうです。

難しいことはわかりませんが、どうやらそうらしいです。

さて、実現方式としては、UUIDを生成しsqidsクレートを使用して62進数エンコード、という形で実現しています。

これで、64 -> 24文字までハッシュを短くできました。

### API

バックエンド用のサーバにAPIを配置するにあたり行ったことは以下になります。

- ビルド用にdockerfileを用意
- デプロイごとにビルドとディレクトリの配置変更してくれるように、シェルスクリプトを用意
- APIサーバをデーモンとして設定。systemdを用いて管理。

なぜDockerfileか、というと、単純にサーバの環境を汚したくなかったからです。

ビルド用の環境を、Dockerfileを用いることで、ポータビリティ性を持たせています。

もしサーバを移管する必要があっても安心。

---

## フロントエンド

フロントエンドで覚えてる範囲のことを書きます。

### YamadaUI

いままではフロントのUIも一から作ってきたが、自サイトを作る際に一から作る苦労を嫌と言うほど知ってしまったため（作成に160時間くらいかけてしまった）、UIライブラリを使おうと思いました。

また、これは個人的な思いですが、OSS活動もいつか参加したかったということがあります。

YamadaUIは定期的に参加の呼びかけを行っており、更に、参加用のドキュメントもあり、OSS参加に最適に思えました。

しかし、YamadaUIを使ったこともないのに参加するのもおかしい話なので、一度ちゃんと使ってみたかったのです。

そこで、OSS活動の参加まで見据えて、YamadaUIを使うことに決定。

あれだけ苦労していたUIがするすると簡単に実装できるのはかなり楽しかったです。

しかもドキュメントが完全日本語対応しているので、困った場合も公式ドキュメントがある、という安心感があります。

みんなもぜひ使ってみよう。

### CodeMirror

コードエディターのサイトのため、エディターの部分を担うライブラリが必要です。

もともとの要件ではmonacoが推奨されていました。

しかし、いろいろ探したところ、CodeMirrorという便利なライブラリがあることを知ったため、こちらを使用するようにしました。

コードハイライトやテーマが充実しているため、おかげてかなりの言語をサポートしたり、いろんなバリエーションのテーマが使えるようになりました。

しかし、公式ドキュメントが若干読みにくいと思う...自分だけかな？

### UIVerse

一部のデザインについて、UIVerseからお借りました。

[Switch by aymenthedeveloper made with CSS | Uiverse.io](https://uiverse.io/aymenthedeveloper/polite-elephant-80)

[Button by McHaXYT made with CSS | Uiverse.io](https://uiverse.io/McHaXYT/swift-mayfly-80)

[Button by xopc333 made with CSS | Uiverse.io](https://uiverse.io/xopc333/modern-stingray-68)

[Loader by jeremyssocial made with CSS | Uiverse.io](https://uiverse.io/jeremyssocial/ordinary-baboon-49)

[Button by gharsh11032000 made with CSS | Uiverse.io](https://uiverse.io/gharsh11032000/loud-chicken-53)

### Google Fonts

フォントに関してはGoogle Fontsからいくつかお借りしています。

[Nerko One - Google Fonts](https://fonts.google.com/specimen/Nerko+One)

[Oswald - Google Fonts](https://fonts.google.com/specimen/Oswald)

[Dancing Script - Google Fonts](https://fonts.google.com/specimen/Dancing+Script)

### favion

サイトのアイコンはこちらからお借りしています。

[Phosphor Icons](https://phosphoricons.com/)

---

## セキュリティ

セキュリティ関係で覚えてる範囲のことを書きます。

### クロスオリジン対策

バックエンドとしてAPIサーバを立てています。

何も設定しないままではあらゆる場所からのアクセスが可能となってしまうため（対策をしないと画面機能を通さずにAPIにアクセスできる可能性があります。API機能は公開していないので防ぐ必要がある、ということです。）、アクセスするオリジンを制限することでクロスオリジンを対策しています。

同じサーバ上に配置していれば気にしなくていい部分かと思いますが、今回は冒険でフロントエンドとバックエンドを別のサーバに配置したため、このような措置の必要性が発生しています。

### 各種設定値

.envに設定値を設定することで、セキュリティに配慮しています。

これしか知らないからこれでやってるだけなので、他にいい方法あったら教えて下さい（他力本願）。

---

## その他

### Domainの移管

もともと、ドメインはお名前.comで取得していましたが、今回、Cloudflareを使用するに当たり、Cloudflareに移管しています。

DNSの移管は移管で面倒も多い作業でしたが、なかなか楽しい作業でした。

Cloudflareは初めて触りましたが、なかなかいいもんですね。

管理画面は使いやすいし、DNS、静的サイトのデプロイサーバと、一気通貫で一つのサービスで管理できるのが魅力です。

今回使った以外のサービスや機能もあるため、今後使い込んでいきたいなーと思っています。



---

---

---

## 参考資料

作成の際に参考にさせていただいた資料等を記載しておきます。

世の中に技術記事を書いてくださる方がいるからこそ、私のような愚鈍の性質でも技術にキャッチアップすることができます。

技術記事を書いている方に最大限の感謝と敬意を評して、この場を借りてお礼を述べさせていただきます。

いつもありがとうございます。

## インフラ

### Cloudflare

[Cloudflare Registrarでdevドメインを取得した](https://zenn.dev/pino0701/articles/cloudflare_registrar)

[お名前.com から Cloudflare Registrar にドメイン移管した話](https://zenn.dev/muchoco/articles/9039762136e15c)

[Cloudflareにドメインを移管してみた | DevelopersIO](https://dev.classmethod.jp/articles/domain-transfer-from-onamae-to-cloudflare/)

[Cloudflare Registrarでdevドメインを取得した](https://zenn.dev/pino0701/articles/cloudflare_registrar)

[個人開発のWebサービスをCloudflareに載せてみた【無料でここまでできる】](https://zenn.dev/matsubokkuri/articles/cloudflare-service)

### NGINX

[nginxでリバースプロキシ](https://zenn.dev/sey323/scraps/eee29d8b822d34)

---

## フロントエンド

### 全体的

[AbortController - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/AbortController)

### React

[React で初期化時に 1 回だけ処理を実行したいときの書き方](https://zenn.dev/karamem0/articles/2023_02_01_140000)

[Reactが初回マウントされるまでの仕組みを理解する](https://zenn.dev/aishift/articles/d046335a98bc34)

[なぜ非同期処理？ Node.jsの実装から読み解く Fetch API の response.json()](https://zenn.dev/ryomaejii/articles/a55f428609ffc5)


### TypeScript

[バグを減らす第一歩は、ちゃんと名前を呼んであげること（名前付き引数を使おう）](https://zenn.dev/kenpi/articles/0509abeb48470e)

### vite

[【Vite】デプロイ環境ごとに参照する環境変数の値を変える](https://zenn.dev/fugithora812/articles/41b8496532ef40)

### CSS

[【初心者でもわかる】cssで使われる透明3種類の使い方 #CSS - Qiita](https://qiita.com/7note/items/a5975366cef5e169506d)

[cubic-bezier を知る。 #CSS - Qiita](https://qiita.com/96usa_koi/items/6f313f1d664806a77313)

### CodeMirror

[ReactでCodemirror6を使ってみた - Qiita](https://qiita.com/BB30330807/items/c0651f1ea270d2e396d5)

[React CodeMirror - CodeMirror component for React.](https://uiwjs.github.io/react-codemirror/)

[ディレクトリツリーを2秒で書けるアプリを作りました](https://zenn.dev/praha/articles/b2e225ae091ae3)

[CodeMirror v6によるZennのMarkdownエディタの作り方](https://zenn.dev/team_zenn/articles/zenn-markdown-editor-by-cm6)

[新しくなったCodeMirror v6で遊ぼう！ - TECHSCORE BLOG](https://blog.techscore.com/entry/2023/02/10/080000)

[How to use legacy-modes in CodeMirror6 - v6 - discuss.CodeMirror](https://discuss.codemirror.net/t/how-to-use-legacy-modes-in-codemirror6/5987)

[CodeMirror: Language Modes](https://codemirror.net/5/mode/index.html)

### 使わなかったが、勉強になったもの

[一瞬で理解するHydration](https://zenn.dev/ak/articles/dd60f8b1712628)

[React のハイドレーションとは？](https://zenn.dev/dozo13189/articles/07e96c182afa46)

[\[Next.js\] SSR と React Server Components の相違点を理解する](https://zenn.dev/noko_noko/articles/7987456909978c)

[SSRとReact Server Components の違いをレスポンスから考える - Qiita](https://qiita.com/karintou8710/items/28dee39c5cb82bd1775d)

[htmxとは何なのか？ その背景にある思想について  - Qiita](https://qiita.com/tsmd/items/0d07feb8e02cfa213cc4)

[Svelte をはじめる - ウェブ開発を学ぶ | MDN](https://developer.mozilla.org/ja/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started)

[Svelteのすすめ  - Qiita](https://qiita.com/kurata04/items/d39e004dc3c837bfc4a1)

[【2024年】React Router & TanStack Router比較](https://zenn.dev/aishift/articles/f5469d88ea1c53)

[TanStack Router（& Query）はSPA開発で求めていたものだった✨【Reactのルーティングとデータ取得】](https://zenn.dev/aishift/articles/ad1744836509dd)


---

## バックエンド

### API作成時の資料

[API設計まとめ  - Qiita](https://qiita.com/KNR109/items/d3b6aa8803c62238d990)

[RustでAPIを開発してみたら結構辛かった話](https://zenn.dev/praha/articles/aab4b7cbe175f0)

[RustでAPIサーバーを書くのが思ったより良い](https://zenn.dev/adwd/articles/e5687ef6e3ed19)

[概要 - Rust APIガイドライン](https://sinkuu.github.io/api-guidelines/)

[Go、Rust、Pythonで実装したAPIサーバーの負荷試験比較 #Postman - Qiita](https://qiita.com/sergicalsix/items/6a334811626187b99147)

[RustでWeb APIを作る際のエラーハンドリング - CADDi Tech Blog](https://caddi.tech/2024/03/06/184143)

[Pavex – Rust API構築のための新しいWebフレームワーク | DevelopersIO](https://dev.classmethod.jp/articles/rust-pavex/)

[E2E テストの実装方法｜Rust で MVP な Web API サーバを開発する方法](https://zenn.dev/tetter/books/webapi-mvp-book/viewer/10_e2e-test)

[systemdでユニットファイルを作ってサービス化してみる #初心者 - Qiita](https://qiita.com/miyuki_samitani/items/953140bc3c89f0fb606f)


### hash関数作成時の資料

[hashアルゴリズムとハッシュ値の長さ一覧（＋ハッシュ関数の基本と応用） #ブロックチェーン - Qiita](https://qiita.com/KEINOS/items/c92268386d265042ea16)

[【Hash関数】できるだけ衝突率を上げずにIDを短くしたい #JavaScript - Qiita](https://qiita.com/al_tarte/items/eaaf404554f553fa3909)

[Hashidsを使って短いハッシュ値を生成する - Qiita](https://qiita.com/hamaryo/items/644a35c38070fa152a0b)

---

## DB

### DB検討時の資料

[永久無料のサーバーレスSQLデータベースを構築した方法](https://zenn.dev/kaorumori/articles/a11742713a9d01)

[【クラウドDB比較】無料枠で提供されるサービスレベル  - Qiita](https://qiita.com/hamachi4708/items/e8c63b02e3fa9c28837f)

[無料から使えるデータベース比較  - Qiita](https://qiita.com/takiguchi-yu/items/020e17151903011d92f6)

[フルマネージドサーバーレスPostgres「Neon」を触ってみた](https://zenn.dev/collabostyle/articles/d0e27b6f918621)

[PlanetScaleの無料プランがなくなるので、NeonとTiDBを試してみた - wheatandcatの開発ブログ](https://www.wheatandcat.me/entry/2024/03/17/101353)

[安価かつスケーラブルなサーバレスバックエンドプラットフォーム　～KoyebとNeonのススメ～](https://zenn.dev/ficilcom/articles/koyeb-neon-introduction)

[Bun & TypeScriptでバックエンド開発：サーバーレスDB「Neon」の基本的な使い方 | Go-Tech Blog](https://go-tech.blog/paas/serverless-db-neon/)

[授業内開発で部室予約システムを開発した話](https://zenn.dev/calloc134/articles/c24167f2fb6921)

### DB設計時の資料
[SQL Training 2021 - Speaker Deck](https://speakerdeck.com/ymiyake/sql-training-2021)


### CockroachDB Serverless

[CockroachDB Serverlessから学んだこと｜昭和のオッサン](https://note.com/masa_tec_note/n/n4d33748bb7a5)

[CockroachDB はどのくらい「しぶとい」のか？ / How tough is CockroachDB? - Speaker Deck](https://speakerdeck.com/kota2and3kan/how-tough-is-cockroachdb)

[PostgreSQLでしない方がいいことリスト](https://zenn.dev/uta_mory/scraps/5e0b03c9b3478b)

### DBの検証環境構築時の資料

[Cockroach DBをsingle-node clusterで動かすdocker-compose最小構成  - Qiita](https://qiita.com/IzumiSy/items/70776534234913821f94)

## その他

### Font

[フォントのライセンスはわかりづらい？ モリサワnote編集部が法務担当を突撃してみた｜モリサワ　note編集部](https://note.morisawa.co.jp/n/nd1ab06673e07?gs=5b5c382a1ad6#3d384db5-8b23-4253-90b9-5b6349562839)

[SIL Open Font License - Wikipedia](https://ja.wikipedia.org/wiki/SIL_Open_Font_License)

