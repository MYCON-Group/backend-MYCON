DROP DATABASE IF EXISTS mycon_test_db;
CREATE DATABASE mycon_test_db;

\c mycon_test_db;

CREATE TABLE events (
    events_id SERIAL PRIMARY KEY,
    event_name VARCHAR (30) NOT NULL,
    event_img VARCHAR (500),
    event_start VARCHAR(40),
    event_end VARCHAR(40),
    event_description VARCHAR(500),
    event_location VARCHAR(40)
);

CREATE TABLE stall (
    stall_id SERIAL PRIMARY KEY,
    stall_name VARCHAR(40) NOT NULL,
    stall_logo VARCHAR(500),
    stall_description VARCHAR(500),
    stall_email VARCHAR(50) NOT NULL,
    stall_web_address VARCHAR(100),
    stall_ctn VARCHAR(14)
);

CREATE TABLE event_stalls (
    event_stalls_id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    stall_id INT NOT NULL, 
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (stall_id) REFERENCES stall(stall_id)
);

INSERT INTO events (event_name, event_img, event_start, event_end, event_description, event_location)
    VALUES ('Northcoders Party!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/The_Adicts_2011_SO36_03.jpg/220px-The_Adicts_2011_SO36_03.jpg',
        '23 november 2018', '24 november 2019', 'A party for Northcoders', 'The Printworks');

INSERT INTO stall (stall_name, stall_logo, stall_description, stall_email, stall_web_address, stall_ctn)
    VALUES ('Bouncy Castle', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUaoEaeDT-ex28doUezuC1JG31FDKWAC0dlhkdDZ6vCd6DzX9r',
    'A castle to bounce on', 'bouncycastle@castlebouncy.com', 'www.bouncycastle.com', '0780948392041');

-- SELECT * FROM events;
-- SELECT * FROM stall;
-- SELECT * FROM event_stalls

-- psql -f seed.test.sql > text.txt