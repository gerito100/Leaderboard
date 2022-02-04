create database leaderboard;
use leaderboard;
create table student(
	id int auto_increment primary key,
    name varchar(45) not null,
    points int unsigned default 0
);