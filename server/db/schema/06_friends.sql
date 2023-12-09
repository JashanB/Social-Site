DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE friends (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id_1 SMALLINT NOT NULL,
  user_id_2 SMALLINT NOT NULL,
  createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id_1) REFERENCES users(id),
  FOREIGN KEY (user_id_2) REFERENCES users(id)
);