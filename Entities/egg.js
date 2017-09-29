function Egg(x, y){
    Unit.call(this, x, y);

    this.radius = 15;
    this.mass = 1;
    this.isCollideable = false;
    this.isIntersectable = false;
    this.acceleration = new Vector(0, 0, 0, 0);
    this.sprite = "egg";
}

Egg.prototype = Object.create(Unit.prototype);
