CREATE TABLE creators(
  ID SERIAL PRIMARY KEY,
  first varchar(180),
  last varchar(180)
)

CREATE TABLE reviews (
  ID SERIAL PRIMARY KEY,
  site varchar(300),
  reviewtitle varchar(300),
  reviewbody varchar(2000),
  creatorID INTEGER REFERENCES creators.id
  )