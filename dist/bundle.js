(()=>{"use strict";const t=function(){function t(t,i,o,s,r){void 0===t&&(t=0),void 0===i&&(i=0),void 0===o&&(o=100),void 0===s&&(s=100),void 0===r&&(r="#f00"),this.x=t,this.y=i,this.width=o,this.height=s,this.color=r}return t.prototype.render=function(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()},t}();var i,o=(i=function(t,o){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])},i(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function s(){this.constructor=t}i(t,o),t.prototype=null===o?Object.create(o):(s.prototype=o.prototype,new s)});const s=function(t){function i(i,o,s,r){void 0===i&&(i=0),void 0===o&&(o=0),void 0===s&&(s=10),void 0===r&&(r="#0095DD");var e=t.call(this,i,o,0,0,r)||this;return e.radius=s,e.dx=2,e.dy=-2,e}return o(i,t),i.prototype.move=function(){this.x+=this.dx,this.y+=this.dy},i.prototype.render=function(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()},i}(t);var r=function(){var t=function(i,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])},t(i,o)};return function(i,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function s(){this.constructor=i}t(i,o),i.prototype=null===o?Object.create(o):(s.prototype=o.prototype,new s)}}();const e=function(t){function i(i,o,s,r,e,n){void 0===s&&(s=75),void 0===r&&(r=20),void 0===e&&(e=1),void 0===n&&(n="#0095DD");var h=t.call(this,i,o,s,r,n)||this;return h.points=e,h.status=1,h}return r(i,t),i}(t);function n(){return Math.floor(256*Math.random())}const h=function(){function t(){this.bricks=[],this.brickWidth=50,this.brickHeight=20,this.brickPadding=10,this.brickOffsetTop=30,this.brickOffsetLeft=30,this.brickRowCount=4,this.brickColumnCount=7,this.activeBricks=0,this.createBricks()}return t.prototype.createBricks=function(){for(var t,i,o,s=[],r=0;r<this.brickColumnCount;r+=1){this.bricks[r]=[];for(var h=0;h<this.brickRowCount;h+=1)s[h]=void 0===s[h]?(void 0,void 0,void 0,t=n(),i=n(),o=n(),"rgb(".concat(t,",").concat(i,",").concat(o,")")):s[h],this.bricks[r][h]=new e(0,0,this.brickWidth,this.brickHeight,this.brickRowCount-h,s[h]),this.activeBricks+=1}},t.prototype.render=function(t){for(var i=0;i<this.brickColumnCount;i+=1)for(var o=0;o<this.brickRowCount;o+=1)if(1===this.bricks[i][o].status){var s=i*(this.brickWidth+this.brickPadding)+this.brickOffsetLeft;s=o%2==0?s:s+this.brickWidth/4;var r=o*(this.brickHeight+this.brickPadding)+this.brickOffsetTop;this.bricks[i][o].x=s,this.bricks[i][o].y=r,this.bricks[i][o].render(t)}},t}();var a=function(){var t=function(i,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])},t(i,o)};return function(i,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function s(){this.constructor=i}t(i,o),i.prototype=null===o?Object.create(o):(s.prototype=o.prototype,new s)}}();const c=function(t){function i(i,o,s,r,e){void 0===s&&(s=75),void 0===r&&(r=10),void 0===e&&(e="#0095DD");var n=t.call(this,i,o,s,r,e)||this;return n.dx=7,n}return a(i,t),i.prototype.moveRight=function(t){this.x=Math.min(this.x+this.dx,t-this.width)},i.prototype.moveLeft=function(){this.x=Math.max(this.x-this.dx,0)},i}(t);var l=function(){var t=function(i,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])},t(i,o)};return function(i,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function s(){this.constructor=i}t(i,o),i.prototype=null===o?Object.create(o):(s.prototype=o.prototype,new s)}}();const d=function(t){function i(i,o,s,r,e,n){void 0===e&&(e=0),void 0===n&&(n="16px Arial");var h=t.call(this,o,s,0,0,r)||this;return h.text=i,h.value=e,h.font=n,h}return l(i,t),i.prototype.render=function(t){t.font=this.font,t.fillStyle=this.color,t.fillText("".concat(this.text," ").concat(this.value),this.x,this.y)},i}(t);new(function(){function t(t){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.ball=new s(this.canvas.width/2,this.canvas.height-30,10,"#0095DD"),this.paddle=new c((this.canvas.width-75)/2,this.canvas.height-10,75,10,"#0095DD"),this.allBricks=new h,this.scoreLabel=new d("Score: ",8,20,"#0095DD"),this.livesLabel=new d("Lives: ",this.canvas.width-65,20,"#0095DD",3),this.rightPressed=!1,this.leftPressed=!1,this.setup(),this.draw()}return t.prototype.setup=function(){var t=this;document.addEventListener("keydown",(function(i){return t.keyDownHandler(i)}),!1),document.addEventListener("keyup",(function(i){return t.keyUpHandler(i)}),!1),document.addEventListener("mousemove",(function(i){return t.mouseMoveHandler(i)}),!1)},t.prototype.collisionsWithBricks=function(){for(var t=0;t<this.allBricks.brickColumnCount;t+=1)for(var i=0;i<this.allBricks.brickRowCount;i+=1){var o=this.allBricks.bricks[t][i];1===o.status&&this.ball.x>o.x&&this.ball.x<o.x+this.allBricks.brickWidth&&this.ball.y>o.y&&this.ball.y<o.y+this.allBricks.brickHeight&&(this.ball.dy=-this.ball.dy,o.status=0,this.allBricks.activeBricks-=1,this.ball.color=o.color,this.scoreLabel.value+=o.points,0===this.allBricks.activeBricks&&(alert("YOU WIN, CONGRATULATIONS! Your score is ".concat(this.scoreLabel.value)),document.location.reload()))}},t.prototype.collisionsWithCanvasAndPaddle=function(){(this.ball.x+this.ball.dx>this.canvas.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx),this.ball.y+this.ball.dy<this.ball.radius?this.ball.dy=-this.ball.dy:this.ball.y+this.ball.dy>this.canvas.height-this.ball.radius&&(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.width?this.ball.dy=-this.ball.dy-.5:this.ball.y+this.ball.dy>=this.canvas.height&&(this.livesLabel.value-=1,this.livesLabel.value<1?(alert("GAME OVER! Your score is ".concat(this.scoreLabel.value)),document.location.reload()):(this.ball.x=this.canvas.width/2,this.ball.y=this.canvas.height-30,this.ball.dx=2,this.ball.dy=-2,this.paddle.x=(this.canvas.width-this.paddle.width)/2)))},t.prototype.movePaddle=function(){this.rightPressed?this.paddle.moveRight(this.canvas.width):this.leftPressed&&this.paddle.moveLeft()},t.prototype.drawBackground=function(){var t=this.ctx.createRadialGradient(this.canvas.width/2,this.canvas.height/4*3,0,this.canvas.width/2,this.canvas.height/4*3,this.canvas.width/16);t.addColorStop(0,this.ball.color),t.addColorStop(.2,"white"),t.addColorStop(.4,this.ball.color),t.addColorStop(.6,"white"),t.addColorStop(.8,this.ball.color),t.addColorStop(1,"#f1f1f1"),this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.mouseMoveHandler=function(t){var i=t.clientX-this.canvas.offsetLeft;i>this.paddle.width/2&&i<this.canvas.width-this.paddle.width/2&&(this.paddle.x=i-this.paddle.width/2)},t.prototype.keyDownHandler=function(t){"Right"===t.key||"ArrowRight"===t.key||"d"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key&&"a"!==t.key||(this.leftPressed=!0)},t.prototype.keyUpHandler=function(t){"Right"===t.key||"ArrowRight"===t.key||"d"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key&&"a"!==t.key||(this.leftPressed=!1)},t.prototype.draw=function(){var t=this;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawBackground(),this.ball.render(this.ctx),this.ball.move(),this.paddle.render(this.ctx),this.movePaddle(),this.collisionsWithBricks(),this.collisionsWithCanvasAndPaddle(),this.allBricks.render(this.ctx),this.scoreLabel.render(this.ctx),this.livesLabel.render(this.ctx),requestAnimationFrame((function(){return t.draw()}))},t}())("myCanvas")})();