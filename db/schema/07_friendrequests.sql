DROP TABLE IF EXISTS friendRequests CASCADE;

CREATE TABLE friendRequests (
    id SERIAL PRIMARY KEY NOT NULL,
    from_user_id SMALLINT,
    to_user_id SMALLINT,
    status VARCHAR(20) DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user_id) REFERENCES users(id),
    FOREIGN KEY (to_user_id) REFERENCES users(id)
);