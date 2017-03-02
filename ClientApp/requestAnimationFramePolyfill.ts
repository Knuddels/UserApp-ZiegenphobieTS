export function polyfillRequestAnimationFrame() {
	if (!('requestAnimationFrame' in window))
	{
		// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
		// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
		// MIT license
		(function() {
			let lastTime = 0;
			let vendors = ['ms', 'moz', 'webkit', 'o'];
			for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = (<any>window)[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = (<any>window)[vendors[x]+'CancelAnimationFrame']
					|| (<any>window)[vendors[x]+'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback) {
					let currTime = new Date().getTime();
					let timeToCall = Math.max(0, 16 - (currTime - lastTime));
					let id: number = window.setTimeout(function() { callback(currTime + timeToCall); },
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};

			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
		}());
	}
}

