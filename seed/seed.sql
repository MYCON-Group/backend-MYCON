DROP DATABASE IF EXISTS mycon_db;
CREATE DATABASE mycon_db;

\c mycon_db;

CREATE TABLE events (
    events_id SERIAL PRIMARY KEY,
    events_name VARCHAR (30) NOT NULL,
    events_img VARCHAR (500),
    events_start VARCHAR(40),
    events_end VARCHAR(40),
    events_description VARCHAR(500),
    events_location VARCHAR(40)
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
    stall_x INT NOT NULL,
    stall_y INT NOT NULL,
    stall_height INT NOT NULL,
    stall_width INT NOT NULL,
    stall_rotation INT NOT NULL,
    events_id INT NOT NULL,
    stall_id INT NOT NULL, 
    FOREIGN KEY (events_id) REFERENCES events(events_id),
    FOREIGN KEY (stall_id) REFERENCES stall(stall_id)
);