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
    events_location VARCHAR(40),
    events_map_height INT,
    events_map_width INT,
    events_height INT,
    events_width INT
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

CREATE TABLE updates
(
    updates_id SERIAL PRIMARY KEY,
    updates_body VARCHAR NOT NULL,
    updates_time VARCHAR DEFAULT NULL,
    stall_id INT NOT NULL,
    events_id INT NOT NULL,
    FOREIGN KEY (events_id) REFERENCES events(events_id),
    FOREIGN KEY (stall_id) REFERENCES stall(stall_id)
);

INSERT INTO events
    (events_name, events_img, events_start, events_end, events_description, events_location, events_map_height, events_map_width, events_height,
    events_width)
VALUES

    ('Northcoders Party!',
        'https://i.postimg.cc/8CV0ySb0/Map1.png',
        '23 november 2018',
        '24 november 2019',
        'A party for Northcoders',
        'The Printworks',
        800,
        1043,
        80,
        100
),
    ('Comicon', 'https://i.postimg.cc/WzTH7B0v/map2.png',
        '30 december 2018', '31 december 2018', 'gathering of nerd culture', 'Piccadilly trainstation', 724, 1000, 80, 100);



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
        'coding bootcamp', 'northcoders@gmail.com', 'www.northcoders.com', '07749324637'),
    ('Coca Cola', 'https://www.cocacola.co.uk/content/dam/GO/CokeZone/Common/global/logo/logodesktop/coca-cola-logo-260x260.png',
        'Coca Cola are here to refresh you', 'cocacola@gmail.com', 'https://www.coca-cola.co.uk/', '07774395983829'),
    ('Vodafone', 'http://assets.vodafone.co.uk/cs/groups/configfiles/documents/document/vf-logo-large.png',
    'Vodafone are here to sell you a phone or two', 'vodafone@gmail.com', 'www.vodafone.com', '079999999999'),
    ('BAE Systems', 'https://130e178e8f8ba617604b-8aedd782b7d22cfe0d1146da69a52436.ssl.cf1.rackcdn.com/industry-news-bae-systems-launches-corporate-security-analysis-imageFile-8-a-7766.jpg',
    'BAE Systems are here to talk about your aeronautical needs', 'BAESystems@gmail.com', 'https://www.baesystems.com/en/home', '077743859201');


INSERT INTO event_stalls
    (events_id, stall_id)
VALUES
    (1, 1),
    (2, 2),
    (1, 3),
    (1, 4),
    (1, 5);

INSERT INTO updates
    (updates_body, updates_time, stall_id, events_id)
VALUES
    ('We are selling donuts for the next half hour at 50% off!', '1698784876406', 1, 1),
    ('We are running a demo of our latest product in 5 minuets', '1698784873423', 3, 1),
    ('Come have a go on our waterslide!', '1698784876324', 3, 1),
    ('We have found a wallet for a Mr Jones please come and collect.', '1698784875458', 3, 1),
    ('Come guess the name of our fluffy unicorn and win a new laptop', '1658784876406', 4, 1),
    ('Helicopter demonstration in 10 mins', '1698784823232', 4, 1),
    ('Help! Im stuck in this small box!', '1695684876406', 1, 1),
    ('We are closing in 30 mins', '1698784876566', 5, 1);
