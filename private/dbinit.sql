CREATE TABLE IF NOT EXISTS users (
    usr_id VARCHAR(50) NOT NULL,
    usr_pw INTEGER NOT NULL,
    type CHAR(1) NOT NULL,
    job VARCHAR(50),
    state VARCHAR(10) NOT NULL,
    remarks VARCHAR(255),
    PRIMARY KEY ( usr_id )
) ENGINE=INNODB;

INSERT INTO users(usr_id, usr_pw, usr_type, state) VALUES ("patient", 1111, 'I', 'active');
INSERT INTO users(usr_id, usr_pw, usr_type, state) VALUES ("nurse", 2222, 'N', 'active');
INSERT INTO users(usr_id, usr_pw, usr_type, state) VALUES ("doctor", 3333, 'D', 'active');

CREATE TABLE IF NOT EXISTS pinfo (
    name	VARCHAR(50) NOT NULL,
    pnumber	VARCHAR(255) NOT NULL,
    gender	CHAR(1) NOT NULL,
    type	VARCHAR(10) NOT NULL,
    state	VARCHAR(20) NOT NULL,
    hspd_date	DATE NOT NULL,
    ward	VARCHAR(10) NOT NULL,
    room	INTEGER NOT NULL,
    doctor	VARCHAR(50) NOT NULL,
    pid		VARCHAR(50) NOT NULL,

    PRIMARY KEY ( pnumber )
    FOREIGN KEY ( pid )
	REFERENCES users(usr_id)
) ENGINE=INNODB;

INSERT INTO pinfo() VALUES ();

CREATE TABLE IF NOT EXISTS diagnosation (
    code VARCHAR(20) NOT NULL,
    diag_date DATE NOT NULL,
    inst VARCHAR(255) NOT NULL,
    dept VARCHAR(50),
    diagosis VARCHAR(255),
    pid VARCHAR(50) NOT NULL,

    PRIMARY KEY ( code )
    FOREIGN KEY ( pid )
	REFERENCES users(usr_id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS prescription (
    code VARCHAR(20) NOT NULL,
    pres_date DATE NOT NULL,
    medicine VARCHAR(255) NOT NULL,
    dept VARCHAR(50),
    remarks VARCHAR(255),
    pid VARCHAR(50) NOT NULL,

    PRIMARY KEY ( code )
    FOREIGN KEY ( pid )
	REFERENCES users(usr_id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS operproc (
    code VARCHAR(20) NOT NULL,
    oppr_date DATE NOT NULL,
    type VARCHAR(20) NOT NULL,
    dept VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    remarks VARCHAR(255),
    pid VARCHAR(50) NOT NULL,

    PRIMARY KEY ( code )
    FOREIGN KEY ( pid )
	REFERENCES users(usr_id)
) ENGINE=INNODB;
