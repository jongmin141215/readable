import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import PostItem from './components/PostItem';
import PostListByCategory from './components/PostListByCategory';
import PostForm from './components/PostForm';

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log("store", store)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostForm} />
          <Route path="/posts/:id" component={PostItem} />
          <Route path="/:category/posts" component={PostListByCategory} />

          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
