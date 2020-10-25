# jquery vs react vs vue

```
$ create-react-app react-app
```

```
$ git clone https://github.com/vuejs/vue-next-webpack-preview.git vue-app
$ cd vue-app
$ rm -rf .git
$ yarn install

$ vim webpack.config.js

   54   devServer: {
   55     inline: true,
   56     hot: true,
   57     stats: "minimal",
>  58     host: "0.0.0.0",
   59     contentBase: __dirname,
   60     overlay: true,
   61   },

$ sudo sysctl -w fs.inotify.max_user_watches=65536
$ npm run dev
```
