# jquery

```
$ yarn create react-app helloworld-app --template typescript
$ cd helloworld-app

$ yarn add @types/jquery
$ yarn add @types/bootstrap@4.0
```

## Note

- System limit for number of file watchers reached というメッセージが出てたら、上限を上げる必要がある

```
$ echo 'fs.inotify.max_user_watches=65536' | sudo tee /etc/sysctl.d/50-web-samples.conf
$ sudo sysctl -p
```

## UI Library

### Bootstrap 4

- public/index.html に以下を追加する

```

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

```

## Chart Library

### Google Charts

- public/index.html に以下を追加する

```
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

```
$ yarn add @types/google.visualization
```
