import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);


  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data.rows[0]);
        setIsLoading(false)
        
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageurl}
        user={{
          avatarUrl: data.avatarurl,
          fullName: data.fullname,
        }}
        createdAt={data.time_stamps}
        viewsCount={data.viewscount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.content}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
