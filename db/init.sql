-- TODO remove this table, it's redundant with the registration table
CREATE TABLE IF NOT EXISTS user(
    email TEXT NOT NULL PRIMARY KEY,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS locker(
    id TEXT NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS registration(
    locker TEXT NOT NULL UNIQUE,
    user TEXT NOT NULL,
    name TEXT NOT NULL,
    expiry DATETIME NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1, -- TODO change to deletedAt (nullable)
    PRIMARY KEY(locker, user),
    FOREIGN KEY(locker) REFERENCES locker(id),
    FOREIGN KEY(user) REFERENCES user(email)
);
CREATE INDEX IF NOT EXISTS locker_user ON registration(user);
