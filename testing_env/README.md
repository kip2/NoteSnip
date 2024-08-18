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
