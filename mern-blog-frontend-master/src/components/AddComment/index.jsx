import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/auth.slice";
import { fetchCreateComments } from "../../redux/slices/comm.slice";

export const Index = ({ urlAvatar, idPost }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState();

  const Submit = () => {
    dispatch(fetchCreateComments({
      coment_text: value,
      fk_posts_id: idPost
    }))

    setValue('')
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={urlAvatar}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={value}
            onChange={event => { setValue(event.target.value) }}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button type="button" onClick={Submit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
