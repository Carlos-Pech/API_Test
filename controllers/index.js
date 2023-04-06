const fs = require('fs');

router.get('/images/:filename', (req, res) => {
  // construir la ruta completa del archivo
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);

  // Leer el archivo
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'No se pudo encontrar la imagen' });
    }

    // Enviar la imagen como una respuesta
    res.set('Content-Type', 'image/jpeg');
    res.send(data);
  });
});