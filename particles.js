class Particle {
  
    constructor(red, green, blue, alpha, weight, speed) {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0,0);
      this.acc = createVector(0,0);
      this.maxSpeed = speed;
      this.r = random(red);
      this.g = random(green);
      this.b = random(blue);
      this.a = alpha;
      this.w = weight;
    }
    
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    
    applyForce(force) {
      this.acc.add(force);
    }
    

    
    edges() {
      if (this.pos.x > width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = width;
      if (this.pos.y > height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = height;
    }
    
    follow(vectors) {
      let x = floor(this.pos.x / scl);
      let y = floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }


    show() {
        stroke(this.r, this.g, this.b, this.a);
        strokeWeight(this.w);
        point(this.pos.x, this.pos.y);
      }
  
  }