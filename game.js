// initialize game context
kaboom({
  width: 1000,
  height: 1000, 
  background: [0, 0, 0]
});

// Sprites
loadSprite("knight", "Replit Game/knight.png");
loadSprite("enemy2", "Replit Game/enemy.png");

// Sounds
// loadSound("collide", "Sound/collide.wav");
loadSound("boxJump", "Sound/boxJump.wav");
loadSound("jump", "Sound/jump.wav");

loadSprite('night', "Replit Game/NightBorne/NightBorne_run1-Copy.gif");

loadSprite('background', 'Replit Game/floorImage.jpg');
loadSprite('barnBackground', 'Replit Game/CatchingObjectImages/Barn.jpeg');

loadSprite('enemy', 'Replit Game/BloodMoonTower_free_version/BloodMoonTower_cover_free_version-Copy.gif');
loadSprite('apple', "Replit Game/CatchingObjectImages/apple.png");
loadSprite('farmer', "Replit Game/CatchingObjectImages/farmer.png");

loadSprite('spaceship', "Replit Game/SpaceGame/spaceship.png");
loadSprite('spaceEnemy', "Replit Game/SpaceGame/spaceEnemy.png");
loadSprite('spaceBackground', "Replit Game/SpaceGame/spaceBackground.jpg");




loadSound('gameSound', 'Sound/Extreme-Sport-Trap-Music-PISTA.mp3');
loadSound('collide', 'Sound/collide.wav');
loadSound('menuSound', 'Sound/ForestWalk-320bit.mp3');
loadSound('explosion', 'Sound/explosion.mp3');

// Adds Button to screen with text and position and function as parameter
function addButton(txt, p, f) {

  	// add a parent background object
  	const btn = add([
  		rect(240, 80, { radius: 8 }),
  		pos(p),
  		area(),
  		scale(1),
  		anchor("center"),
  		outline(4),
  	])
  
  	// add a child object that displays the text
  	btn.add([
  		text(txt),
  		anchor("center"),
  		color(0, 0, 0),
  	])
  
  	// onHoverUpdate() comes from area() component
  	// it runs every frame when the object is being hovered
  	btn.onHoverUpdate(() => {
  		const t = time() * 10
  		setCursor("pointer")
  	})
  
  	// onClick() comes from area() component
  	// it runs once when the object is clicked
  	btn.onClick(f)
  
  	return btn

}


scene('game', function(){

  setGravity(2400);

  const backgroundMusic = play("gameSound", {
    loop: true,
    volume: 0.3
  })

  const background = add([
    sprite('background'),
    scale(width() / 190, height() / 190),
    
  ]);

  
  const floor = add([
    rect(width(), 50),
    pos(0, height() - 50),
    color(112, 128, 144),
    area(),
    body({ isStatic: true }),
    'floor'
  ]);

  const wall = add([
    rect(10, height()),
    pos(-10, 0),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);

  const wall2 = add([
    rect(10, height()),
    pos(1000, 0),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);
  
  const player = add([
    sprite("night"),
    pos(350,800),
    scale(1.5),
    area(),
    body(),
    "player"
  ]);


  const moveSpeed = 1000;
  
  onKeyDown('right', function(){
      player.move(moveSpeed, 0);
  });
  onKeyDown('left', function(){
      player.move(-moveSpeed, 0);
  });


  let score = 0;
    
  const scoreLabel = add([
    text(score),
    pos(24, 24),
    scale(3),
    
    ]);

  function addScore(){

      score++
      scoreLabel.text = score;
    
  }
  


  let enemy;

  function spawnEnemy(){
    
    enemy = add([
      sprite("enemy"),
      scale(rand(.5, 1)),
      pos(rand(1, 1000), -100),
      area(),
      body(),
      'enemy'
    ]); 

    wait(rand(1, 2), spawnEnemy); 
    
  }

  spawnEnemy();

  
  onCollide('enemy', 'floor', function() {
    destroy(enemy);
    addKaboom(enemy.pos);
    play('explosion');
    addScore();
  });

  onCollide('enemy', 'player', function(){
    play('collide');
    backgroundMusic.paused = true;
    go('lose');
  })


  
});

scene('lose', function(){
  add([
    text('Game Over'),
    pos(width() / 2, height() / 2),
    anchor('center')
  ])

  const menuMusic = play("menuSound", {
    loop: true,
    volume: 0.3
  })

  addButton("Restart", vec2(500,600), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game') });
  })

  addButton("Main Menu", vec2(500,700), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('menu') });
  })

});

scene('game2', function(){
  
  // Set Gravity
  setGravity(2400);

  //Play Background Music
  const backgroundMusic = play("boxJump", {
    loop: true,
    volume: 0.3
  })
  const background = add([
    sprite('background'),
    scale(width() / 190, height() / 190),
    
  ]);
  // Adds Player
  const player = add([
    sprite("knight"),
    pos(100,910),
    scale(5, 5),
    area(),
    body(),
    "player"
  ]);
  
  // Adds a floor
  const floor = add([
    rect(width(), 50),
    pos(0, height() - 50),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);
  
  // Player jump function
  function playerJump(){
    if(player.isGrounded()){
      player.jump(1200);
      play("jump");
    }
  }

  // Controls for Jumping
  onKeyPress("space", playerJump);
  onMousePress(playerJump);


  function spawnEnemy2() {
  // Adds Enemy
  add([
    sprite("enemy2"),
    pos(width(), 800),
    scale(rand(2, 5)),
    area(),
    body(),
    move(LEFT, 300),
    offscreen({ destroy: true }),
    "enemy2"
  ]);

  // Spawns Enemies randomly every 1 - 3 seconds
  wait(rand(1, 3), spawnEnemy2); 
  }

  spawnEnemy2();
  

  onCollide("player", "enemy2", function() {
    destroy(player);
    addKaboom(player.pos);
    play("collide");
    backgroundMusic.paused = true;
    go("lose2");
    
  })

  const obj = add([
    timer(),
  ])
  

  
  let score = 0;
    
  const scoreLabel = add([
    text(score),
    pos(24, 24),
    scale(3),
    
    ]);

  function addScore(){
    score++;
    scoreLabel.text = score;
  }
  
  loop(1, () => {
    addScore();
  })
  
});

scene('lose2', function(){
  add([
    text('Game Over'),
    pos(width() / 2, height() / 2),
    anchor('center')
  ])

  const menuMusic = play("menuSound", {
    loop: true,
    volume: 0.3
  })

  addButton("Restart", vec2(500,600), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game2') });
  })

  addButton("Main Menu", vec2(500,700), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('menu') });
  })

});

scene('game3', function(){

  setGravity(2400);

  const backgroundMusic = play("gameSound", {
    loop: true,
    volume: 0.3
  })

  const background = add([
    sprite('barnBackground'),
    scale(width() / 190, height() / 190),

  ]);


  const floor = add([
    rect(width(), 50),
    pos(0, height() - 50),
    color(112, 128, 144),
    area(),
    body({ isStatic: true }),
    'floor'
  ]);

  const wall = add([
    rect(10, height()),
    pos(-10, 0),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);

  const wall2 = add([
    rect(10, height()),
    pos(1000, 0),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);

  const player = add([
    sprite("farmer"),
    pos(350,750),
    scale(1),
    area(),
    body(),
    "farmer"
  ]);


  const moveSpeed = 1000;

  onKeyDown('right', function(){
      player.move(moveSpeed, 0);
  });
  onKeyDown('left', function(){
      player.move(-moveSpeed, 0);
  });


  let score = 0;

  const scoreLabel = add([
    text(score),
    pos(24, 24),
    scale(3),

    ]);

  function addScore(){

      score++
      scoreLabel.text = score;

  }



  let apple;

  function spawnEnemy(){

    apple = add([
      sprite("apple"),
      scale(.75,.75),
      pos(rand(1, 1000), -100),
      area(),
      body(),
      'apple',
      setGravity(1500)
    ]); 

    wait(rand(1, 2), spawnEnemy); 

  }

  spawnEnemy();


  onCollide('apple', 'floor', function() {
    destroy(apple);
    addKaboom(apple.pos);
    play('explosion');
    backgroundMusic.paused = true;
    go('lose3');
  });

  onCollide('apple', 'farmer', function(){
    play('collide');
    destroy(apple);
    addScore();
    
  })



});


scene('lose3', function(){
  add([
    text('Game Over'),
    pos(width() / 2, height() / 2),
    anchor('center')
  ])

  const menuMusic = play("menuSound", {
    loop: true,
    volume: 0.3
  })

  addButton("Restart", vec2(500,600), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game3') });
  })

  addButton("Main Menu", vec2(500,700), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('menu') });
  })

});

scene('game4', function(){

  setGravity(2400);

  const BULLET_SPEED = 1200

  const backgroundMusic = play("gameSound", {
    loop: true,
    volume: 0.3
  })

  const background = add([
    sprite('spaceBackground'),
    scale(width() / 190, height() / 190),

  ]);


  const floor = add([
    rect(width(), 50),
    pos(0, height() - 50),
    color(112, 128, 144),
    area(),
    body({ isStatic: true }),
    'floor'
  ]);

  const wall = add([
    rect(10, height()),
    pos(-10, 0),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);

  const wall2 = add([
    rect(10, height()),
    pos(1000, 0),
    color(112, 128, 144),
    area(),
    body({ isStatic: true })
  ]);

  const player = add([
    sprite("spaceship"),
    pos(350,750),
    scale(.75),
    area(),
    body(),
    "spaceship"
  ]);


  const moveSpeed = 1000;

  onKeyDown('right', function(){
      player.move(moveSpeed, 0);
  });
  onKeyDown('left', function(){
      player.move(-moveSpeed, 0);
  });


  let score = 0;

  const scoreLabel = add([
    text(score),
    pos(24, 24),
    scale(3),

    ]);

  function addScore(){
      score++
      scoreLabel.text = score;
  }



  // let spaceEnemy;
  //   spaceEnemy = add([
  //     sprite("spaceEnemy"),
  //     scale(.2,.2),
  //     pos(rand(1, 1000), -100),
  //     area(),
  //     body(),
  //     'spaceEnemy',
  //     setGravity(500)
  //   ]);

  // function spawnEnemy(){

  //   spawnEnemy = add([
  //     sprite("spaceEnemy"),
  //     scale(.2,.2),
  //     pos(rand(1, 1000), -100),
  //     area(),
  //     body(),
  //     'spaceEnemy',
  //     setGravity(500)
  //   ]); 

  //   wait(rand(2, 3), spawnEnemy); 

  // }

  // spawnEnemy();

  let spaceEnemy = add([
    sprite("spaceEnemy"),
    area(),
    pos(rand(1, 1000), -100),
    // health(OBJ_HEALTH),
    // anchor("bot"),
    scale(.2,.2),
    body(),
    "spaceEnemy",
    // { speed: rand(TRASH_SPEED * 0.5, TRASH_SPEED * 1.5) },
    setGravity(500)
  ]);
  
  wait(rand(5, 6), spaceEnemy);
  

  function spawnBullet(p) {
    add([
      rect(12, 48),
      area(),
      pos(p),
      anchor("center"),
      color(127, 127, 255),
      outline(4),
      move(UP, BULLET_SPEED),
      offscreen({ destroy: true }),
      // strings here means a tag
      "bullet",
    ])
  }
  
  onKeyPress("space", () => {
    spawnBullet(player.pos.sub(0, 0))
    spawnBullet(player.pos.add(100, 0))
  })


  onCollide('spaceEnemy', 'floor', function() {
    destroy(spaceEnemy);
    addKaboom(spaceEnemy.pos);
    play('explosion');
    backgroundMusic.paused = true;
    go('lose4');
  });
  
  onCollide('spaceEnemy', 'bullet', function() {
    destroy(spaceEnemy);
    addKaboom(spaceEnemy.pos);
    play('explosion');
    addScore();
    
  });

  onCollide('spaceEnemy', 'spaceship', function(){
    play('collide');
    destroy(spaceEnemy);
    backgroundMusic.paused = true;
    go('lose4');
  })



});


scene('lose4', function(){
  add([
    text('Game Over'),
    pos(width() / 2, height() / 2),
    anchor('center')
  ])

  const menuMusic = play("menuSound", {
    loop: true,
    volume: 0.3
  })

  addButton("Restart", vec2(500,600), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game4') });
  })

  addButton("Main Menu", vec2(500,700), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('menu') });
  })

});

scene('menu', function(){
  add([
    text('Play Games'),
    pos(width() / 2, height() / 2),
    anchor('center')
  ])

  const menuMusic = play("menuSound", {
    loop: true,
    volume: 0.3
  })

  addButton("Start", vec2(500,600), function(){
    onClick(function(){ 
      go('moreGames') });
  })

  addButton("Setting", vec2(500,700), function(){
    onClick(function(){ go('setting') });
  })


});

scene('setting', function(){
  add([
    text('Under Developement'),
    pos(width() / 2, height() / 2),
    anchor('center')
  ])
  addButton("Back", vec2(500,600), function(){
    onClick(function(){ go('menu') });
  })
});

scene('moreGames', function(){
  const menuMusic = play("menuSound", {
    loop: true,
    volume: 0.3
  })
  add([
    text('Avoid Falling Object'),
    pos(width() / 2, height() / 2 - 300),
    anchor('center')
  ])
  addButton("Start ^", vec2(500,260), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game') });
  })
  add([
    text('Endless Side Scroller'),
    pos(width() / 2, height() / 2 - 175),
    anchor('center')
  ])
  addButton("Start ^", vec2(500,385), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game2') });
  })
  add([
    text('Catch Object'),
    pos(width() / 2, height() / 2 - 50),
    anchor('center')
  ])
  addButton("Start ^", vec2(500,510), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game3') });
  })
  add([
    text('Space Shooter'),
    pos(width() / 2, height() / 2 + 85),
    anchor('center')
  ])
  addButton("Start ^", vec2(500,650), function(){
    onClick(function(){ 
      menuMusic.paused = true;
      go('game4') });
  })
  addButton("Main Menu", vec2(500,800), function(){
    onClick(function(){ 
      go('menu') });
  })
});

go('menu');