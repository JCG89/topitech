//On declare les librairies qui ont été installées
const express = require('express');

const app = express();

// On déclare le port
const http = require('http').createServer(app)

const mongoose = require('mongoose');

//Le chemin de récupération du dossier public
app.use(express.static(__dirname + '/public'));

//On défini la route
app.get('/', (req, res) =>{
      res.render('index.ejs');
});
//On défini la page d'érreur au cas ou l'utilisateur demande une page qui n'éxiste pas
app.use(function(req, res, next){
      res.setHeader('Content-Type', 'text/html');
      res.status(404).send('Page introuvable');
});
// On instacie socket.io
const io = require('socket.io')(http);
// On initialise la connection de l'utlisateur
io.on('connection', (socket) => {

      socket.on('pseudo', (pseudo) =>{
       socket.pseudo = pseudo;
       socket.broadcast.emit('newUser', pseudo);
      });
      socket.on('disconnect', () =>{
            socket.broadcast.emit('quitUser');
      })
})
http.listen(8080, ()=>{
      console.log(`Le server est lancé sur le port: 8080`)
})