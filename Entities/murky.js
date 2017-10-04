function Murky(x, y){
    Unit.call(this, x, y);

    this.radius = 15;
    this.mass = 1;
    this.isCollideable = true;
    this.isIntersectable = true;
    this.acceleration = new Vector(0, 0, 0, 0);
    this.sprite = "murky";
}

Murky.prototype = Object.create(Unit.prototype);

Murky.prototype.Update = function Update(enviroment){
    Unit.prototype.Update.call(this, enviroment);

    this.acceleration = this.acceleration.Add(new Vector(this.x, this.y, Game.Cursor.x, Game.Cursor.y));
    this.acceleration = this.acceleration.Limit(3);
    Game.MurkyPosition.x = this.x;
    Game.MurkyPosition.y = this.y;
}

Murky.prototype.OnCollision = function OnCollision(entity, forceInvoked) {
    Unit.prototype.OnCollision.call(this, entity, forceInvoked);

    alert("GAME LOST!");
    Game.Restart(144, 60);
}