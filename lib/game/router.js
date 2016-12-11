exports.load = function(express){
  /*
   * function disponible :
   * moveOnGet(direction,x,y) retourne une nouvelle position au format JSON
   * eatAppleOnPut(x,y) retourne une nouvelle pomme {x,y} et augmente le score
   * recordScore() enregistre la fin de partie côté serveur, enregistre le score.
   */
  var router = express();
  var gameSize=40;
  
  router.get('/index.html', function(req, res, next) {
    res.sendFile(__dirname +'/public/index.html');
  });
  
  router.use('/public', express.static(__dirname + '/public', { maxAge: 0 }));
  
  return router;
};