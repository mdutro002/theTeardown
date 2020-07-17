CREATE TABLE creators(
  ID SERIAL PRIMARY KEY,
  first varchar(180),
  last varchar(180)
);

CREATE TABLE reviews (
  ID SERIAL PRIMARY KEY,
  site varchar(300),
  reviewtitle varchar(300),
  reviewbody varchar(2000),
  creatorID INTEGER REFERENCES creators (id)
  );

INSERT INTO creators (first, last) VALUES ('Madeline', 'BigBrainwater');
INSERT INTO reviews (site, reviewtitle, reviewbody, creatorID) VALUES ('twitter', 'Big Concerns', 'plaintext password leaks and blue checkmark woes abound', 1);