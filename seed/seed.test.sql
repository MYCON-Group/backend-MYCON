DROP DATABASE IF EXISTS mycon_test_db;
CREATE DATABASE mycon_test_db;

\c mycon_test_db;

CREATE TABLE events
(
    events_id SERIAL PRIMARY KEY,
    events_name VARCHAR (30) NOT NULL,
    events_img VARCHAR (500),
    events_start VARCHAR(40),
    events_end VARCHAR(40),
    events_description VARCHAR(500),
    events_location VARCHAR(40)
);

CREATE TABLE stall
(
    stall_id SERIAL PRIMARY KEY,
    stall_name VARCHAR(40) NOT NULL,
    stall_logo VARCHAR(500),
    stall_description VARCHAR(500),
    stall_email VARCHAR(50) NOT NULL,
    stall_web_address VARCHAR(100),
    stall_ctn VARCHAR(14)
);

CREATE TABLE event_stalls
(
    event_stalls_id SERIAL PRIMARY KEY,
    stall_x INT DEFAULT 0,
    stall_y INT DEFAULT 0,
    stall_height INT DEFAULT 25,
    stall_width INT DEFAULT 25,
    stall_rotation INT DEFAULT 0,
    events_id INT NOT NULL,
    stall_id INT NOT NULL,
    FOREIGN KEY (events_id) REFERENCES events(events_id),
    FOREIGN KEY (stall_id) REFERENCES stall(stall_id)
);

INSERT INTO events
    (events_name, events_img, events_start, events_end, events_description, events_location)
VALUES
    ('Northcoders Party!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/The_Adicts_2011_SO36_03.jpg/220px-The_Adicts_2011_SO36_03.jpg',
        '23 november 2018', '24 november 2019', 'A party for Northcoders', 'The Printworks'),
    ('Comicon', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/San_Diego_Comic-Con_International_logo.svg/829px-San_Diego_Comic-Con_International_logo.svg.png',
        '30 december 2018', '31 december 2018', 'gathering of nerd culture', 'Piccadilly trainstation');

INSERT INTO stall
    (stall_name, stall_logo, stall_description, stall_email, stall_web_address, stall_ctn)
VALUES
    ('Bouncy Castle', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUaoEaeDT-ex28doUezuC1JG31FDKWAC0dlhkdDZ6vCd6DzX9r',
        'A castle to bounce on', 'bouncycastle@castlebouncy.com', 'www.bouncycastle.com', '0780948392041'),
    ('facebook', 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png',
        'social media', 'facebook@fb.com', 'www.facebook.com', '07364291237'),
    ('google', 'https://pbs.twimg.com/profile_images/972154872261853184/RnOg6UyU_400x400.jpg',
        'search engine', 'google@gmail.com', 'www.google.com', '07743647381'),
    ('rockstar games', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/2000px-Rockstar_Games_Logo.svg.png',
        'we make games', 'rockstar@gmail.com', 'www.rockstar.com', '07778497381'),
    ('northcoders', 'https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png',
        'coding bootcamp', 'northcoders@gmail.com', 'www.northcoders.com', '07749324637');


INSERT INTO event_stalls
    (events_id, stall_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);


-- INSERT INTO event_stalls (stall_x, stall_y, stall_height, stall_width, stall_rotation, event_stalls_id, stall_id)
-- VALUES


-- SELECT * FROM events;
-- SELECT * FROM stall;
-- SELECT * FROM event_stalls

-- psql -f seed.test.sql > text.txt