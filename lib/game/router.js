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
  
  router.get('/snake', function(req, res, next) {
    res.json(initNewGame(req));
  });
  
  router.post('/snake', function(req, res, next) {
    var toSend=moveOnGet(req.body.direction,parseInt(req.body.x), parseInt(req.body.y));
    console.log(toSend);
    res.json(toSend );
  });
  
  router.put('/snake', function(req, res, next) {
    res.json(eatAppleOnPut(req,parseInt(req.query.x), parseInt(req.query.y)));
  });
  
  function moveOnGet(direction,x,y){
    console.log(x,y)
    // Change the last cell's coordinates relative to the head of the snake, according to the direction.

    if (direction == 'right') {
       return {x:(x + 15),y :y} ;
    } else if (direction == 'left') {
       return {x:(x - 15),y :y} ;
    } else if (direction == 'up') {
       return {x:x,y :(y - 15)} ;
    } else if (direction == 'down') {
       return {x:x,y :(y + 15)} ;
    }
  }
  
  function initNewGame(req){
    req.session.score=0;
    return generateApple();
  }
  
  function eatAppleOnPut(req,x,y){
    req.session.score++;
    return generateApple();
  }
  
  function generateApple(){
    return {x:Math.floor(Math.random() * gameSize),y:Math.floor(Math.random() * gameSize)};
  }
  
  router.use('/public', express.static(__dirname + '/public', { maxAge: 0 }));
  
  return router;
};