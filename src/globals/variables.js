var zIndexHigh = 0;
var mainLoopStart = undefined; // will be Performance.now() when mainLoop is initialized
var tick20Hz = 50; // (ms)
var last20HzTick = undefined; // (ms)