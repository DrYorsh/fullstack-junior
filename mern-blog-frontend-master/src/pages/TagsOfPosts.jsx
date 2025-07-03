import React, { useEffect, useState } from 'react';
import { useParams } from "react-router"
import axios from '../axios';

import { Grid } from '@mui/material';
import { Post } from '../components/Post';


export function TagsOfPosts() {
  const [tags, setTags] = useState([]);
  let params = useParams()

  useEffect(() => {
    try {
      if (params.tag) axios.get(`/tags/${params.tag}`)
        .then(res => {
          setTags(res.data);
        })
    } catch (error) {

    }
  }, [params])

  console.log(tags);

  return (
    <>
      <h1>#{params.tag}</h1>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          {tags.map((obj, index) => {
            return (
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
              />
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}
