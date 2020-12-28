# npm-package

## github で公開されているパッケージをインストールする

https://github.com/syunkitada/npm-helloworld をインストールする場合

```
$ cd react-app
$ yarn add syunkitada/npm-helloworld

# パッケージを更新する場合は、再度同じコマンドを実行する
$ yarn add syunkitada/npm-helloworld
```

## github で公開されているパッケージを submodule としてローカルからインストールする

```
# submoduleとしてcloneする
$ git submodule add git@github.com:syunkitada/npm-helloworld.git

# symbolic linkでインストールする
$ cd react-app2
$ yarn add link:../npm-helloworld

# パッケージを更新する場合は、npm-helloworld側は再ビルドする必要があるが、react-app2側は特に何もしなくてよい
# ページを再読み込みする必要はある

# ちなみに、link:を忘れると通常インストールとなるのでパッケージを更新した場合は再度、yarn add ../npm-helloworldと実行して更新する必要がある
# yarn add ../npm-helloworld
```
