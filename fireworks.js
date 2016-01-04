(function(fabric, document) {
  var rockets = [],
    maxRockets = 50,
    firedRockets = 0,
    rocketsAtSameTime = 3;

  function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rockets.length = 0;
  }

  function Rocket(canvas) {
    this.particleCount = 20;
    this.particleDistance = 50;
    this.initialize(canvas);
    this.canvas = canvas;
  }

  Rocket.prototype.initialize = function(canvas) {
    if (firedRockets >= maxRockets) {
      return;
    }

    firedRockets++;

    this.canvasWidth = canvas.getWidth();
    this.canvasHeight = canvas.getHeight();

    this.color = 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, 30%)';

    this.rocket = new fabric.Circle({
      fill: this.color,
      radius: 7,
      top: this.canvasHeight,
      left: this.canvasWidth - (Math.random() * this.canvasWidth)
    });

    canvas.add(this.rocket);
  };

  Rocket.prototype.start = function() {
    var halfHeight = this.canvasHeight / 2;
    var targetWidth = 400; //Width of the area where the rockets should explode

    var rocket = this.rocket,
      self = this;

    this.endLeft = (this.canvasWidth / 2) + targetWidth / 2 - Math.random() * targetWidth;
    this.endTop = halfHeight - (Math.random() * halfHeight);

    this.rocket.animate('left', this.endLeft, {
      duration: 2000
    });

    this.rocket.animate('top', this.endTop, {
      duration: 2000,
      onChange: function() {
        self.addSpark();
      },
      onComplete: function() {
        canvas.remove(rocket);
        self.explode();
      }
    });
  };

  Rocket.prototype.addSpark = function() {
    var self = this;

    var spark = new fabric.Circle({
      fill: self.color,
      radius: 5,
      top: self.rocket.top + 1,
      left: self.rocket.left + 1
    });

    spark.animate('opacity', 0, {
      duration: 100,
      onComplete: function() {
        self.canvas.remove(spark);
      }
    });

    self.canvas.add(spark);
  };

  Rocket.prototype.explode = function() {
    var angleStepInRadians = (360 / this.particleCount) * (Math.PI / 180),
      currentAngleInRadians = 0,
      self = this,
      newRocketStarted = false;


    this.setupParticles();

    this.particles.forEach(function(particle) {
      var left = self.endLeft + (Math.cos(currentAngleInRadians) * self.particleDistance);
      var top = self.endTop + (Math.sin(currentAngleInRadians) * self.particleDistance);

      currentAngleInRadians += angleStepInRadians;

      particle.animate('left', left, {
        duration: 1000
      });

      particle.animate('top', top, {
        duration: 1000
      });

      particle.animate('opacity', 0, {
        duration: 1000,
        onComplete: function() {
          canvas.remove(particle);

          if (!newRocketStarted) {
            newRocketStarted = true;
            new Rocket(self.canvas).start();
          }
        }
      });

      changeCallbackAdded = true;
    });
  };

  Rocket.prototype.setupParticles = function() {
    this.particles = [];

    for (var i = 0; i < this.particleCount; i++) {
      var particle = new fabric.Circle({
        fill: this.color,
        radius: 2,
        top: this.endTop,
        left: this.endLeft
      });

      this.particles.push(particle);
      this.canvas.add(particle);
    }
  };

  window.addEventListener('resize', resizeCanvas, false);

  var rawCanvas = document.getElementById('fireworks');
  resizeCanvas(rawCanvas);

  var canvas = new fabric.StaticCanvas(rawCanvas, {
    renderOnAddRemove: false
  });
  var rocketsStarted = 0;

  function startNewRocket() {
    rocketsStarted++;

    new Rocket(canvas).start();

    if (rocketsStarted < rocketsAtSameTime) {
      window.setTimeout(startNewRocket, 500);
    }
  }

  //Wait some time for the year to show. Then fire up the rockets :)
  window.setTimeout(startNewRocket, 2000);

  function render() {
    fabric.util.requestAnimFrame(render);
    canvas.renderAll();
  }

  render();

})(fabric, document);
