PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO user(email) VALUES('malcolmseyd@gmail.com');
INSERT OR IGNORE INTO locker VALUES('130','malcolmseyd@gmail.com','2023-04-30 14:09:16');

SELECT * FROM user;
SELECT * FROM locker;

INSERT OR IGNORE INTO user(email) VALUES('admin@ocha.ca');
UPDATE locker SET user = 'admin@ocha.ca' WHERE id = '130';

SELECT * FROM user;
SELECT * FROM locker;

INSERT OR IGNORE INTO user(email) VALUES('admin@ocha.ca');
UPDATE locker SET user = 'admin@ocha.ca' WHERE id = '130';