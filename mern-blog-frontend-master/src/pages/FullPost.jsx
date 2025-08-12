import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comm, setComm] = useState([]);
  const { comments } = useSelector(state => state.commReduser);
  const aboutMe = useSelector(state => state.authReduser.data);

  const { id } = useParams();

 useEffect(() => {
    // юзефект не может быть ассинхронной, поэтому оборачиваем в отдельную функцию и в конце вызываем ее.
    const loadOrders = async () => {
      await axios
        .get(`/posts/${id}`)
        .then((res) => {
          setData(res.data.rows[0]);
          setIsLoading(false);
        })
        .catch(err => {
          console.warn(err);
          alert('Ошибка при получении статьи')
        })

      await axios
        .get(`/comments/${id}`)
        .then((res) => {
          setComm(res.data.rows);
          setIsLoading(false);
        })
        .catch(err => {
          console.warn(err);
          alert('Ошибка при получении комментариев')
        })
    }
    loadOrders()
  }, [comments.items])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
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
        items={isLoading ? [] : comm}
        isLoading={isLoading}
      >
        <Index urlAvatar={aboutMe?.avatarurl} idPost={id} />
      </CommentsBlock>
    </>
  );
};
