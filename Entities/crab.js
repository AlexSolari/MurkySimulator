function Crab(x, y){
    var s = (x) => Math.random() * x + x;
    Unit.call(this, x, y);

    this.radius = 15;
    this.mass = 1;
    this.isCollideable = true;
    this.isIntersectable = true;
    this.sprite = "crab";
    this.speed = new Vector(s(5),s(5),s(5),s(5)).Limit(5, true);
}

Crab.prototype = Object.create(Unit.prototype);

Crab.prototype.OnCollision = function OnCollision(entity, forceInvoked) {
    Unit.prototype.OnCollision.call(this, entity, forceInvoked);

    this.speed = this.speed.Limit(5, true);
}