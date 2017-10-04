function GameManager() {
    this.UpdateIntervalID = 0;
    this.RenderIntervalID = 0;

    this.ScreenWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

    this.ScreenHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
    
    this.Scenes = [];

    this.CurrentSecondNumber = 0;
    this.CurrentFrameNumber = 0;
    this.CurrentTickNumber = 0;
    this.LastSecondFrameNumber = 0;
    this.ImageCache = null;
    this.Screen = null;
    this.Cursor = {x:1, y:1};
    this.MurkyPosition = {x:0,y:0};
    this.DebugMode = false;
    this.InitializerCallback = function() {};
    this.FPS = 0;
}

GameManager.prototype.GetTopScene = function GetTopScene() {
    return this.Scenes[0];
}

GameManager.prototype.Restart = function Restart(size, targetFPS) {
    this.CurrentSecondNumber = 0;
    this.CurrentFrameNumber = 0;
    this.CurrentTickNumber = 0;
    this.LastSecondFrameNumber = 0;
    this.MurkyPosition = {x:0,y:0};
    this.Scenes = [];
    this.Start(size, targetFPS, this.InitializerCallback);
}

GameManager.prototype.Initialize = function Initialize() {
    var self = this;

    self.ImageCache = new ImageCache();
    self.Screen = new GameScreen(this.ScreenWidth, this.ScreenHeight);

    $("body").on("mousemove", function SaveMousePosition(e) {
        self.Cursor.x = e.clientX;
        self.Cursor.y = e.clientY;
    });
}

GameManager.prototype.Stop = function(){
    clearInterval(this.UpdateIntervalID);
    clearInterval(this.RenderIntervalID);

    Game.OnStop();
}

GameManager.prototype.Start = function Start(targetFPS, targetTickrate, initializerCallback) {
    targetFPS = targetFPS || 100;
    targetTickrate = targetTickrate || 25;

    var self = this;

    this.Scenes = [];
    this.Scenes.push(new GameScene(self.Screen));

    this.InitializerCallback = initializerCallback;

    initializerCallback(this, this.GetTopScene());

    clearInterval(this.UpdateIntervalID);
    clearInterval(this.RenderIntervalID);

    this.UpdateIntervalID = setInterval(function GameUpdateLoop() {
        self.CurrentTickNumber += 1;
        self.GetTopScene().UpdateScene(self.CurrentTickNumber);
    }, 1000 / targetTickrate);
    this.RenderIntervalID = setInterval(function GameRenderLoop() {
        self.CountFPS();
        self.Screen.RenderScene(targetFPS, targetTickrate, self.GetTopScene());
    }, 1000 / targetFPS);
}

GameManager.prototype.CountFPS = function CountFPS() {
    if (this.CurrentSecondNumber != new Date().getSeconds()) {
        this.FPS = this.CurrentFrameNumber - this.LastSecondFrameNumber;
        $("#fpsMeter").html(this.FPS + "fps");
        this.LastSecondFrameNumber = this.CurrentFrameNumber;
        this.CurrentSecondNumber = new Date().getSeconds();
    }
    this.CurrentFrameNumber++;
}

GameManager.prototype.OnStop = function(){

};