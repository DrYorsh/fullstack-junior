import Container from "@mui/material/Container";
import { useDispatch, useSelector } from 'react-redux';

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, TagsOfPosts } from "./pages";

import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth.slice";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<TagsOfPosts />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
