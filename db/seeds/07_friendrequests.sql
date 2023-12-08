DROP TABLE IF EXISTS friendRequests CASCADE;

CREATE TABLE friendRequests (
    id SERIAL PRIMARY KEY NOT NULL,
    from_user_id SMALLINT NOT NULL,
    to_user_id SMALLINT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(id),
    FOREIGN KEY (to_user_id) REFERENCES users(id),
    from_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    to_user_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
);