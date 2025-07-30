import React, { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const isAuth = Boolean(useSelector(state => state.authReduser.data));
  const navigate = useNavigate();

  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputFileRef = useRef(null);
  const isEdited = Boolean(id);

  const onSubmit = async () => {
    try {
      const arrayTags = tags.split(' ');

      const filds = {
        title,
        content,
        tags: arrayTags,
        imageUrl: imageUrl ? `http://compitplus.ru${imageUrl}` : ''
      }

      const { data } = isEdited ? await axios.patch(`/posts/${id}`, filds) : await axios.post('/posts', filds);
      const _id = isEdited ? id : data.rows[0].id;
      navigate(`/posts/${_id}`)
    } catch (error) {
      console.log(error);
      alert("Не смог загрузить пост!")
    }
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла")

    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  useEffect(() => {
    if (id) {
      axios.get(`posts/${id}`).then(res => {
        setTitle(res.data.rows[0].title);
        setTags(res.data.rows[0].tags.join(' '));
        setContent(res.data.rows[0].content);
        setImageUrl(res.data.rows[0].imageUrl)
      })
    }
  }, [])

  const onChange = React.useCallback((value) => {
    setContent(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!isAuth) {
    navigate('/');
    return
  }

  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button onClick={() => { inputFileRef.current.click() }} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:8000${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={content} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdited ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
