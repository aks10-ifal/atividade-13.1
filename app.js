//app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const livros = [
  { id: 1, titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', ano: 1605 },
  { id: 3, titulo: 'A Revolução dos Bichos', autor: 'George Orwell', ano: 1945 },
  { id: 4, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', ano: 1943 },
  { id: 5, titulo: 'Metamorfose', autor: 'Franz Kafka', ano: 1915 },
  { id: 6, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', ano: 1953 },
  { id: 7, titulo: 'Assim Falava Zaratustra', autor: 'Friedrich Nietzsche', ano: 1883 },
  { id: 8, titulo: 'Deus Está Morto', autor: 'Friedrich Nietzsche', ano: 1882 },
  { id: 9, titulo: 'Crime e Castigo', autor: 'Fiódor Dostoiévski', ano: 1866 },
  { id: 10, titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', ano: 1967 },
  { id: 11, titulo: 'Orgulho e Preconceito', autor: 'Jane Austen', ano: 1813 },
  { id: 12, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
  { id: 13, titulo: 'O Grande Gatsby', autor: 'F. Scott Fitzgerald', ano: 1925 },
  { id: 14, titulo: 'O Apanhador no Campo de Centeio', autor: 'J.D. Salinger', ano: 1951 },
  { id: 15, titulo: 'O Conde de Monte Cristo', autor: 'Alexandre Dumas', ano: 1844 },
  { id: 16, titulo: 'A Ilíada', autor: 'Homero', ano: 800 },
  { id: 17, titulo: 'A Odisséia', autor: 'Homero', ano: 800 },
  { id: 18, titulo: 'Romeu e Julieta', autor: 'William Shakespeare', ano: 1597 }
];


app.get('/', (req, res) => {
  const tipo = req.query.tipo || ''; 
  res.render('index', { livros, tipo });
});

app.get('/buscar', (req, res) => {
  const { tipo, titulo, ano } = req.query;
  let resultado = livros;

  if (tipo === 'titulo' && titulo) {
    resultado = resultado.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
  } else if (tipo === 'ano' && ano) {
    
    res.redirect(`/buscar/ano/${ano}`);
    return; 
  } else {
    resultado = []; 
  }

  res.render('index', { livros: resultado, tipo });
});


app.get('/buscar/ano/:ano', (req, res) => {
  const { ano } = req.params;
  const valorNumerico = parseInt(ano);
  const resultado = livros.filter(livro => livro.ano === valorNumerico);
  res.render('index', { livros: resultado, tipo: 'ano' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT} http://localhost:${PORT}`);
});