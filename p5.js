const particles = [];
// Called once
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  const particlesLength = Math.floor(window.innerWidth / 10);
  // Initialize particles array
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}
// Called in a loop
function draw() {
  // Canvas background
  background(20);
  // Call particle methods
  particles.forEach((particle, index) => {
    particle.create();
    particle.update();
    particle.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.size = 10;
  }
  // Draw particle
  create() {
    noStroke();
    fill('rgba(255, 255, 255, 0.5)');
    circle(this.pos.x, this.pos.y, this.size);
  }
  // Move particle
  update() {
    this.pos.add(this.vel);
    this.edges();
  }
  // Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
  // Connect particles with line
  checkParticles(particles) {
    particles.forEach(particle => {
      // Distante between current particle and all the others
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 120) {
        // Calculate alpha based on distance
        const alpha = map(d, 0, 120, 0, 0.2);
        stroke(`rgba(255, 255, 255, ${alpha})`);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
