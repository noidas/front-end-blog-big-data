import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ListPost from "./pages/listPost";
import Post from "./pages/post";

import RegisterBlog from "./pages/registerBlog";
import RegisterPost from "./pages/registerPost";
import RegisterUser from "./pages/registerUser";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/blog/:blogid/post/cadastrar"
          component={RegisterPost}
        ></Route>
        <Route exact path="/blog/:blogid/post/:id" component={Post}></Route>
        <Route exact path="/blog/cadastrar" component={RegisterBlog}></Route>
        <Route exact path="/user/cadastrar" component={RegisterUser}></Route>
        <Route exact path="/blog/:id" component={ListPost}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
