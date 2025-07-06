import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { fetchPosts, fetchTags } from '../redux/slices/post.slice';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchComments } from '../redux/slices/comm.slice';

export const Home = () => {
  const dispath = useDispatch();
  const userData = useSelector(state => state.authReduser.data);
  const { posts, tags } = useSelector(state => state.reducerPosts);
  const { comments } = useSelector(state => state.commReduser);
  const [orderBy, setOrderBy] = useState(0)

  React.useEffect(() => {
    dispath(fetchPosts(orderBy))
    dispath(fetchTags());
    dispath(fetchComments())
  }, [orderBy])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={orderBy} aria-label="basic tabs example">
        <Tab onClick={() => setOrderBy(0)} label="Новые" />
        <Tab onClick={() => setOrderBy(1)} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>

          {(posts.status === 'loading' ? [...Array(5)] : posts.items).map((obj, index) => (posts.status === 'loading'
            ? <Post key={index} isLoading={true} /> :
            <Post
              key={index}
              id={obj.id}
              title={obj.title}
              imageUrl={obj.imageurl}
              user={{
                avatarUrl: obj.avatarurl,
                fullName: obj.fullname,
              }}
              createdAt={obj.time_stamps}
              viewsCount={obj.viewscount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?.id === obj.user_id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={posts.status === 'loading'} />
          <CommentsBlock
            items={comments.status === "loaded" ? comments.items.slice(0, 3) : []}
            isLoading={comments.status === "loading"}
          />
        </Grid>
      </Grid>
    </>
  );
};
