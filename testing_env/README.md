# テスト環境

## CockroachDB

### テスト環境構築

まずはCockroachDBの環境を構築する

```sh
docker-compose up

# もしくは
docker-compose -f compose.yaml up
```

### 接続

以下のパスで接続が行える

```sh
psql "postgresql://root@127.0.0.1:26257/app?sslmode=disable"
```

### クライアントコマンドについて

CockraochDBはPostgreSQL互換ではあるが、全く同じコマンドが使えるわけではない

備忘としてpsqlとのコマンドの違いについて記載する

#### テーブルの列情報の確認

```sh
# psql
# 使えない
\d <table-name>

# CockroachDB
SHOW COLUMNS FROM <table-name>;
```

#### テーブルの一覧

これはpsql相当のコマンドでも問題ない

```sh
# psql
\d
# もしくは
\dt

# CockroachDBで使えるコマンド
# 出力が若干異なる
SHOW TABLES;
```

#### データベースの一覧

これはpsql相当のコマンドでも問題ない

```sh
# psql
\l

# CockroachDB
SHOW DATABASES;
```

#### テーブルのインデックスの表示

これはpsqlのコマンドは使えない

```sh
# psql
# 使えない
\d <table-name>

# CockroachDB
SHOW INDEXES FROM <table-name>;
```

#### スキーマの一覧

```sh
# psql
# 出力は異なるが使える
\dn

# CockroachDB
SHOW SCHEMAS;
```

