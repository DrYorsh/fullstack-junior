import React from 'react';

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

export const Home = () => {
  const dispath = useDispatch();
  const userData = useSelector(state => state.authReduser.data)
  const { posts, tags } = useSelector(state => state.reducerPosts)

  React.useEffect(() => {
    dispath(fetchPosts())
    dispath(fetchTags())
  }, [])



  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
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
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
