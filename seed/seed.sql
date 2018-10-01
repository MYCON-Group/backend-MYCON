DROP DATABASE IF EXISTS mycon_db;
CREATE DATABASE mycon_db;

\c mycon_db;

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
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