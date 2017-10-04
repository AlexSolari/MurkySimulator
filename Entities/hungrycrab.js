function HungryCrab(x, y){
    var s = (x) => Math.random() * x + x;
    Unit.call(this, x, y);

    this.maxspeed = 10;
    this.radius = 15;
    this.mass = 1;
    this.isCollideable = true;
    this.isIntersectable = true;
    this.sprite = "hungrycrab";
    this.speed = new Vector(s(10),s(10),s(10),s(10)).Limit(10);
}

HungryCrab.prototype = Object.create(Unit.prototype);

HungryCrab.prototype.Update = function Update(enviroment){
    this.acceleration = this.acceleration.Add(new Vector(this.x, this.y, Game.MurkyPosition.x, Game.MurkyPosition.y));

    this.acceleration.Limit(3);
    this.acceleration.Limit(3);

    Unit.prototype.Update.call(this, enviroment);
}

HungryCrab.prototype.OnCollision = function OnCollision(entity, forceInvoked) {
    Unit.prototype.OnCollision.call(this, entity, forceInvoked);

    this.speed = this.speed.Limit(10, true);
}