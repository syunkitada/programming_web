import fetch from 'cross-fetch'

// subredditの投稿を取得するには、REQUEST_POSTSをDispatchする
// REQUEST_POSTSでリクエストが無事にDispatchされたら、RECEIVE_POSTSをDispatchする
// ユーザは表示するsubredditを選択する(SELECT_SUBREDDIT)
// ユーザは更新のために、再読み込みボタンを押せる

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    // REQUEST_POSTをDispatchし、REQUESTが始まることを伝える
    dispatch(requestPosts(subreddit))

    // 昔ながらの非同期処理では、関数にコールバックを登録しておき、
    // 最終的な結果(成功、失敗など)によって、いづれかのコールバックを呼び出して処理するというもの

    // Promiseとは最終的な完了もしくは失敗を表すオブジェクト
    // Promiseを使う非同期処理では、まず関数はPromiseと呼ばれるオブジェクトを返す
    // .thenにより、オブジェクトを受け取って処理を行う関数を登録し、その関数もまたPromiseを返す
    // .thenをチェーン(Promiseチェーン)させて、続く処理を行うこともできる
    // また、.thenの第二引数に失敗時に処理すべき関数を登録することもできる

    // fetchで非同期APIをたたいて結果を得る
    // 結果が得られたら、RECEIVE_POSTSをDispatch
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

// 関数を返すActionCreater
// この関数はRedux Thunkのミドルウェアによって実行される
// この関数は外部APIを非同期で呼び出したり、ActionをDispatchすることもできる
export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    // 同時に実行される場合もあるため、Fetchすべきかを確認する
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
