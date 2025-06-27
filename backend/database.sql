
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    avatarUrl VARCHAR(255),
    registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    tags VARCHAR(255)[],
    viewsCount INTEGER DEFAULT 0,
    imageUrl VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id),
    time_stamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp
);