DROP DATABASE socialcity;
create database socialcity;
use socialcity;

create table usuario(
id INT auto_increment,
nome varchar(30),
sobrenome varchar(30),
email varchar(50),
nome_usuario varchar(50) UNIQUE key,
genero varchar(100),
senha varchar(50),
cargo VARCHAR(1),
foto varchar (255) null,
primary key(id));

create table posts(
id INT NOT NULL AUTO_INCREMENT primary KEY,
 titulo longtext,
 assunto varchar(50),
 body TEXT, 
 nome_usuario varchar(50),
 foto varchar (255),
 imagem varchar (255),
 cargo VARCHAR(2)
);
 
 CREATE TABLE comentarios( 
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
id_post varchar(255),
comentario varchar(255),
assunto varchar(255),
nome_usuario VARCHAR( 30 ) NOT NULL
);

select * from comentarios;
select * from usuario;
SELECT * FROM posts WHERE assunto ="Ongs"; 
SELECT * FROM posts;  