create table flowers (
  id uuid NOT NULL primary key default uuid_generate_v4(),
  description text,
  title varchar(255) NOT NULL,
  sort varchar(255) NOT NULL,
  height int NOT NULL,
  price float NOT NULL
);

create table stock (
  id uuid not null UNIQUE,
  count int default NULL,
	FOREIGN KEY (id) REFERENCES flowers(id) ON DELETE CASCADE
);

insert into flowers ( description, title, sort,  height, price)
values
('Short Product Description1', 'Rose', 'avalansh', 30, 1.1 ),
('Short Product Description2', 'Rose', 'dzhumiliya', 40, 2.2 ),
('Short Product Description3', 'Rose', 'fiesta', 50, 3.3 ),
('Short Product Description4', 'Rose', 'kenya', 60, 4.4 ),
('Short Product Description5', 'Rose', 'missPiggi', 70, 5.5 ),
('Short Product Description6', 'Rose', 'redNaomi', 80, 6.6 ),
('Short Product Description7', 'Rose', 'vau', 90, 7.7 );

insert into stock ( id, count)
values
( (select id from flowers where sort='avalansh' and height=30), 300 ),
( (select id from flowers where sort='dzhumiliya' and height=40), 400 ),
( (select id from flowers where sort='fiesta' and height=50), 500 ),
( (select id from flowers where sort='kenya' and height=60), 600 ),
( (select id from flowers where sort='missPiggi' and height=70), 700 ),
( (select id from flowers where sort='redNaomi' and height=80), 800 ),
( (select id from flowers where sort='vau' and height=90), 900 );

select f.id, description, title, sort,  height, price, count from flowers f join stock s on f.id = s.id;
