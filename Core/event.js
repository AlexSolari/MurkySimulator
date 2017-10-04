function Event(handler, context, timesInvoked, period, finite){
    timesInvoked = timesInvoked || 1;
    period = period || 1;
    finite = finite || true;

    this.Handler = handler;
    this.Context = context;
    this.InvokeCounter = timesInvoked;
    this.Period = period;
    this.Finite = finite;
}

Event.prototype.Handle = function Handle(){
    this.Handler.call(this.Context);

    if (this.Finite)
        this.InvokeCounter -= 1;
}