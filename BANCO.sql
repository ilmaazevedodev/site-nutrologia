CREATE TABLE posts(
 id INT AUTO_INCREMENT PRIMARY KEY,
 title TEXT,
 content TEXT,
 created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE agendamentos(
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome TEXT,
 telefone TEXT,
 data DATE
);
