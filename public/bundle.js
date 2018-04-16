(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Created by Kelvin Ishigo on 4/15/18.
 *
 * Copyright (c) 2018 Kelvin Ishigo
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */
var Math2 = {};

Math2.random = function(from, to)
{
	return Math.random()*(to-from) + from;
}

Math2.map = function(val, inputMin, inputMax, outputMin, outputMax)
{
			/*
			var inputRange = inputMax - inputMin

			var inputFraction = (val - inputMin)/inputRange

			var outputRange = outputMax - outputMin

			var output = (outputRange * inputFraction) + outputMin

			return output
			*/

	return ((outputMax - outputMin) * ((val - inputMin)/(inputMax - inputMin))) + outputMin;
}


Math2.randomPlusMinus = function(chance)
{
	chance = chance ? chance : 0.5;
	return (Math.random() > chance) ? -1 : 1;
}

Math2.randomInt = function(from, to)
{
	to += 1;
	return Math.floor(Math.random()*(to-from) + from);
}



Math2.randomBool = function(chance)
{
	chance = chance ? chance : 0.5;
	return (Math.random() < chance) ? true : false;
}


},{}],2:[function(require,module,exports){
/**
 * Created by Kelvin Ishigo on 4/14/18.
 *
 * Copyright (c) 2018 Kelvin Ishigo
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */
var Math2 = require('./Math2');
var width = 1920;
var height = 1080;

var gravity = 0.5//1.5 ;
var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;
var numSprites = 25;
var stats;

// Set up for multiple images to make sure we are handling multiple textures.
var images = ['dementia.jpg', 'doraemon.png', 'pikachu.png', 'togedemaru-169.jpg'];
var currentImage = 1;

function getCurrentImage() {
	if (currentImage >= images.length) {
		currentImage = 0;
	}
	var currentImageString = 'images/' + images[currentImage];
	currentImage++;
	console.log('currentImageString: ' + currentImageString);
	return currentImageString;
}

function randomSetBunny(myBunny) {
	myBunny.x = Math.floor(Math.random() * app.screen.width);
	myBunny.y = Math.floor(Math.random() * app.screen.height);
};
// PIXI is global as long as I include pixi.js or pixi.min.js physically in with the code
// Had this problem with earlier usage as well.
// with pixi v4.x the PIXI.Application creates a root stage and a renderer
var app = new PIXI.Application(1920, 1080, {backgroundColor : 0x1099bb});
console.log('view: ' + app.view);
// Don't know what this is but the fast bunnymark uses it.
app.view.style["transform"] = "translatez(0)";

document.body.appendChild(app.view);

app.view.style.position = "absolute";
// Cannot use Particles without a lot of difficulty.  They only support one texture.
// We would have many with sliders and grids.
var stage = new PIXI.DisplayObjectContainer();
// var stage = new PIXI.particles.ParticleContainer(10000, {
// 	scale: false,
// 	position: true,
// 	rotation: false,
// 	uvs: false,
// 	alpha: true
// });
app.stage.addChild(stage);

function randomInt(from, to) {
	to += 1;
	return Math.floor(Math.random()*(to-from) + from);
}

// create a new Sprite from an image path
var doraemon = new PIXI.Sprite.fromImage('images/doraemon.png');
var dementia = new PIXI.Sprite.fromImage('images/dementia.jpg');
var myBunnies = [];

// center the sprite's anchor point
dementia.anchor.set(0.5);
doraemon.anchor.set(0.5);

var singleBunny = false;
if (!singleBunny) {
	for (i=0; i<numSprites; ++i) {
		// var bunny = PIXI.Sprite.fromImage('images/rabbitv3_stormtrooper.png');
		// var n = getCurrentImage();
		// console.log('getCurrentImage: ' + n);
		// var bunny = PIXI.Sprite.fromImage('images/doraemon.png');
		var b = new PIXI.Sprite.fromImage(getCurrentImage());
		b.speedX = Math.random() * 10;
		b.speedY = (Math.random() * 10) - 5;
		b.anchor.y = 1;
		myBunnies.push(b);
		b.scale.set(0.5 + Math.random()*0.5);

		b.rotation = (Math.random()-0.5)

		//bunny.rotation = Math.random() - 0.5;
		var random = randomInt(0, stage.children.length-2);
		stage.addChild(b);
	}
}
// move the sprite to the center of the screen
dementia.x = app.screen.width / 2;
dementia.y = app.screen.height / 2;
doraemon.x = app.screen.width / 4;
doraemon.y = app.screen.height / 4;

stage.addChild(doraemon);
stage.addChild(dementia);
stats = new Stats();
console.log("stats: " + stats);
document.body.appendChild( stats.domElement );
stats.domElement.style.position = "absolute";
stats.domElement.style.top = "0px";

var useTicker = false;

if (useTicker) {
	// Listen for animate update
	app.ticker.add(function(delta) {
		stats.begin();
		if (!singleBunny) {
			for (aBunny in myBunnies) {
				var bunny = myBunnies[aBunny];
				bunny.position.x += bunny.speedX;
				bunny.position.y += bunny.speedY;
				bunny.speedY += gravity;

				if (bunny.position.x > maxX)
				{
					bunny.speedX *= -1;
					bunny.position.x = maxX;
				}
				else if (bunny.position.x < minX)
				{
					bunny.speedX *= -1;
					bunny.position.x = minX;
				}

				if (bunny.position.y > maxY)
				{
					bunny.speedY *= -0.85;
					bunny.position.y = maxY;
					bunny.spin = (Math.random()-0.5) * 0.2
					if (Math.random() > 0.5)
					{
						bunny.speedY -= Math.random() * 6;
					}
				}
				else if (bunny.position.y < minY)
				{
					bunny.speedY = 0;
					bunny.position.y = minY;
				}
			}
		}
		app.render(app.stage);
		stats.end();
	});
}
else {
	// Traditional RAF
	requestAnimationFrame(update);
}

function update() {
	stats.begin();
	if (!singleBunny) {
		for (aBunny in myBunnies) {
			var bunny = myBunnies[aBunny];
			bunny.position.x += bunny.speedX;
			bunny.position.y += bunny.speedY;
			bunny.speedY += gravity;

			if (bunny.position.x > maxX)
			{
				bunny.speedX *= -1;
				bunny.position.x = maxX;
			}
			else if (bunny.position.x < minX)
			{
				bunny.speedX *= -1;
				bunny.position.x = minX;
			}

			if (bunny.position.y > maxY)
			{
				bunny.speedY *= -0.85;
				bunny.position.y = maxY;
				bunny.spin = (Math.random()-0.5) * 0.2
				if (Math.random() > 0.5)
				{
					bunny.speedY -= Math.random() * 6;
				}
			}
			else if (bunny.position.y < minY)
			{
				bunny.speedY = 0;
				bunny.position.y = minY;
			}
		}
	}

	app.render(app.stage);
	requestAnimationFrame(update);
	stats.end();
}

},{"./Math2":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9NYXRoMi5qcyIsInB1YmxpYy9qYXZhc2NyaXB0cy9zdGFydHBpeGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEtlbHZpbiBJc2hpZ28gb24gNC8xNS8xOC5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggS2VsdmluIElzaGlnb1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xudmFyIE1hdGgyID0ge307XG5cbk1hdGgyLnJhbmRvbSA9IGZ1bmN0aW9uKGZyb20sIHRvKVxue1xuXHRyZXR1cm4gTWF0aC5yYW5kb20oKSoodG8tZnJvbSkgKyBmcm9tO1xufVxuXG5NYXRoMi5tYXAgPSBmdW5jdGlvbih2YWwsIGlucHV0TWluLCBpbnB1dE1heCwgb3V0cHV0TWluLCBvdXRwdXRNYXgpXG57XG5cdFx0XHQvKlxuXHRcdFx0dmFyIGlucHV0UmFuZ2UgPSBpbnB1dE1heCAtIGlucHV0TWluXG5cblx0XHRcdHZhciBpbnB1dEZyYWN0aW9uID0gKHZhbCAtIGlucHV0TWluKS9pbnB1dFJhbmdlXG5cblx0XHRcdHZhciBvdXRwdXRSYW5nZSA9IG91dHB1dE1heCAtIG91dHB1dE1pblxuXG5cdFx0XHR2YXIgb3V0cHV0ID0gKG91dHB1dFJhbmdlICogaW5wdXRGcmFjdGlvbikgKyBvdXRwdXRNaW5cblxuXHRcdFx0cmV0dXJuIG91dHB1dFxuXHRcdFx0Ki9cblxuXHRyZXR1cm4gKChvdXRwdXRNYXggLSBvdXRwdXRNaW4pICogKCh2YWwgLSBpbnB1dE1pbikvKGlucHV0TWF4IC0gaW5wdXRNaW4pKSkgKyBvdXRwdXRNaW47XG59XG5cblxuTWF0aDIucmFuZG9tUGx1c01pbnVzID0gZnVuY3Rpb24oY2hhbmNlKVxue1xuXHRjaGFuY2UgPSBjaGFuY2UgPyBjaGFuY2UgOiAwLjU7XG5cdHJldHVybiAoTWF0aC5yYW5kb20oKSA+IGNoYW5jZSkgPyAtMSA6IDE7XG59XG5cbk1hdGgyLnJhbmRvbUludCA9IGZ1bmN0aW9uKGZyb20sIHRvKVxue1xuXHR0byArPSAxO1xuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0by1mcm9tKSArIGZyb20pO1xufVxuXG5cblxuTWF0aDIucmFuZG9tQm9vbCA9IGZ1bmN0aW9uKGNoYW5jZSlcbntcblx0Y2hhbmNlID0gY2hhbmNlID8gY2hhbmNlIDogMC41O1xuXHRyZXR1cm4gKE1hdGgucmFuZG9tKCkgPCBjaGFuY2UpID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgS2VsdmluIElzaGlnbyBvbiA0LzE0LzE4LlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxOCBLZWx2aW4gSXNoaWdvXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG52YXIgTWF0aDIgPSByZXF1aXJlKCcuL01hdGgyJyk7XG52YXIgd2lkdGggPSAxOTIwO1xudmFyIGhlaWdodCA9IDEwODA7XG5cbnZhciBncmF2aXR5ID0gMC41Ly8xLjUgO1xudmFyIG1heFggPSB3aWR0aDtcbnZhciBtaW5YID0gMDtcbnZhciBtYXhZID0gaGVpZ2h0O1xudmFyIG1pblkgPSAwO1xudmFyIG51bVNwcml0ZXMgPSAyNTtcbnZhciBzdGF0cztcblxuLy8gU2V0IHVwIGZvciBtdWx0aXBsZSBpbWFnZXMgdG8gbWFrZSBzdXJlIHdlIGFyZSBoYW5kbGluZyBtdWx0aXBsZSB0ZXh0dXJlcy5cbnZhciBpbWFnZXMgPSBbJ2RlbWVudGlhLmpwZycsICdkb3JhZW1vbi5wbmcnLCAncGlrYWNodS5wbmcnLCAndG9nZWRlbWFydS0xNjkuanBnJ107XG52YXIgY3VycmVudEltYWdlID0gMTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudEltYWdlKCkge1xuXHRpZiAoY3VycmVudEltYWdlID49IGltYWdlcy5sZW5ndGgpIHtcblx0XHRjdXJyZW50SW1hZ2UgPSAwO1xuXHR9XG5cdHZhciBjdXJyZW50SW1hZ2VTdHJpbmcgPSAnaW1hZ2VzLycgKyBpbWFnZXNbY3VycmVudEltYWdlXTtcblx0Y3VycmVudEltYWdlKys7XG5cdGNvbnNvbGUubG9nKCdjdXJyZW50SW1hZ2VTdHJpbmc6ICcgKyBjdXJyZW50SW1hZ2VTdHJpbmcpO1xuXHRyZXR1cm4gY3VycmVudEltYWdlU3RyaW5nO1xufVxuXG5mdW5jdGlvbiByYW5kb21TZXRCdW5ueShteUJ1bm55KSB7XG5cdG15QnVubnkueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFwcC5zY3JlZW4ud2lkdGgpO1xuXHRteUJ1bm55LnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcHAuc2NyZWVuLmhlaWdodCk7XG59O1xuLy8gUElYSSBpcyBnbG9iYWwgYXMgbG9uZyBhcyBJIGluY2x1ZGUgcGl4aS5qcyBvciBwaXhpLm1pbi5qcyBwaHlzaWNhbGx5IGluIHdpdGggdGhlIGNvZGVcbi8vIEhhZCB0aGlzIHByb2JsZW0gd2l0aCBlYXJsaWVyIHVzYWdlIGFzIHdlbGwuXG4vLyB3aXRoIHBpeGkgdjQueCB0aGUgUElYSS5BcHBsaWNhdGlvbiBjcmVhdGVzIGEgcm9vdCBzdGFnZSBhbmQgYSByZW5kZXJlclxudmFyIGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKDE5MjAsIDEwODAsIHtiYWNrZ3JvdW5kQ29sb3IgOiAweDEwOTliYn0pO1xuY29uc29sZS5sb2coJ3ZpZXc6ICcgKyBhcHAudmlldyk7XG4vLyBEb24ndCBrbm93IHdoYXQgdGhpcyBpcyBidXQgdGhlIGZhc3QgYnVubnltYXJrIHVzZXMgaXQuXG5hcHAudmlldy5zdHlsZVtcInRyYW5zZm9ybVwiXSA9IFwidHJhbnNsYXRleigwKVwiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcblxuYXBwLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4vLyBDYW5ub3QgdXNlIFBhcnRpY2xlcyB3aXRob3V0IGEgbG90IG9mIGRpZmZpY3VsdHkuICBUaGV5IG9ubHkgc3VwcG9ydCBvbmUgdGV4dHVyZS5cbi8vIFdlIHdvdWxkIGhhdmUgbWFueSB3aXRoIHNsaWRlcnMgYW5kIGdyaWRzLlxudmFyIHN0YWdlID0gbmV3IFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lcigpO1xuLy8gdmFyIHN0YWdlID0gbmV3IFBJWEkucGFydGljbGVzLlBhcnRpY2xlQ29udGFpbmVyKDEwMDAwLCB7XG4vLyBcdHNjYWxlOiBmYWxzZSxcbi8vIFx0cG9zaXRpb246IHRydWUsXG4vLyBcdHJvdGF0aW9uOiBmYWxzZSxcbi8vIFx0dXZzOiBmYWxzZSxcbi8vIFx0YWxwaGE6IHRydWVcbi8vIH0pO1xuYXBwLnN0YWdlLmFkZENoaWxkKHN0YWdlKTtcblxuZnVuY3Rpb24gcmFuZG9tSW50KGZyb20sIHRvKSB7XG5cdHRvICs9IDE7XG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHRvLWZyb20pICsgZnJvbSk7XG59XG5cbi8vIGNyZWF0ZSBhIG5ldyBTcHJpdGUgZnJvbSBhbiBpbWFnZSBwYXRoXG52YXIgZG9yYWVtb24gPSBuZXcgUElYSS5TcHJpdGUuZnJvbUltYWdlKCdpbWFnZXMvZG9yYWVtb24ucG5nJyk7XG52YXIgZGVtZW50aWEgPSBuZXcgUElYSS5TcHJpdGUuZnJvbUltYWdlKCdpbWFnZXMvZGVtZW50aWEuanBnJyk7XG52YXIgbXlCdW5uaWVzID0gW107XG5cbi8vIGNlbnRlciB0aGUgc3ByaXRlJ3MgYW5jaG9yIHBvaW50XG5kZW1lbnRpYS5hbmNob3Iuc2V0KDAuNSk7XG5kb3JhZW1vbi5hbmNob3Iuc2V0KDAuNSk7XG5cbnZhciBzaW5nbGVCdW5ueSA9IGZhbHNlO1xuaWYgKCFzaW5nbGVCdW5ueSkge1xuXHRmb3IgKGk9MDsgaTxudW1TcHJpdGVzOyArK2kpIHtcblx0XHQvLyB2YXIgYnVubnkgPSBQSVhJLlNwcml0ZS5mcm9tSW1hZ2UoJ2ltYWdlcy9yYWJiaXR2M19zdG9ybXRyb29wZXIucG5nJyk7XG5cdFx0Ly8gdmFyIG4gPSBnZXRDdXJyZW50SW1hZ2UoKTtcblx0XHQvLyBjb25zb2xlLmxvZygnZ2V0Q3VycmVudEltYWdlOiAnICsgbik7XG5cdFx0Ly8gdmFyIGJ1bm55ID0gUElYSS5TcHJpdGUuZnJvbUltYWdlKCdpbWFnZXMvZG9yYWVtb24ucG5nJyk7XG5cdFx0dmFyIGIgPSBuZXcgUElYSS5TcHJpdGUuZnJvbUltYWdlKGdldEN1cnJlbnRJbWFnZSgpKTtcblx0XHRiLnNwZWVkWCA9IE1hdGgucmFuZG9tKCkgKiAxMDtcblx0XHRiLnNwZWVkWSA9IChNYXRoLnJhbmRvbSgpICogMTApIC0gNTtcblx0XHRiLmFuY2hvci55ID0gMTtcblx0XHRteUJ1bm5pZXMucHVzaChiKTtcblx0XHRiLnNjYWxlLnNldCgwLjUgKyBNYXRoLnJhbmRvbSgpKjAuNSk7XG5cblx0XHRiLnJvdGF0aW9uID0gKE1hdGgucmFuZG9tKCktMC41KVxuXG5cdFx0Ly9idW5ueS5yb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkgLSAwLjU7XG5cdFx0dmFyIHJhbmRvbSA9IHJhbmRvbUludCgwLCBzdGFnZS5jaGlsZHJlbi5sZW5ndGgtMik7XG5cdFx0c3RhZ2UuYWRkQ2hpbGQoYik7XG5cdH1cbn1cbi8vIG1vdmUgdGhlIHNwcml0ZSB0byB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW5cbmRlbWVudGlhLnggPSBhcHAuc2NyZWVuLndpZHRoIC8gMjtcbmRlbWVudGlhLnkgPSBhcHAuc2NyZWVuLmhlaWdodCAvIDI7XG5kb3JhZW1vbi54ID0gYXBwLnNjcmVlbi53aWR0aCAvIDQ7XG5kb3JhZW1vbi55ID0gYXBwLnNjcmVlbi5oZWlnaHQgLyA0O1xuXG5zdGFnZS5hZGRDaGlsZChkb3JhZW1vbik7XG5zdGFnZS5hZGRDaGlsZChkZW1lbnRpYSk7XG5zdGF0cyA9IG5ldyBTdGF0cygpO1xuY29uc29sZS5sb2coXCJzdGF0czogXCIgKyBzdGF0cyk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBzdGF0cy5kb21FbGVtZW50ICk7XG5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSBcIjBweFwiO1xuXG52YXIgdXNlVGlja2VyID0gZmFsc2U7XG5cbmlmICh1c2VUaWNrZXIpIHtcblx0Ly8gTGlzdGVuIGZvciBhbmltYXRlIHVwZGF0ZVxuXHRhcHAudGlja2VyLmFkZChmdW5jdGlvbihkZWx0YSkge1xuXHRcdHN0YXRzLmJlZ2luKCk7XG5cdFx0aWYgKCFzaW5nbGVCdW5ueSkge1xuXHRcdFx0Zm9yIChhQnVubnkgaW4gbXlCdW5uaWVzKSB7XG5cdFx0XHRcdHZhciBidW5ueSA9IG15QnVubmllc1thQnVubnldO1xuXHRcdFx0XHRidW5ueS5wb3NpdGlvbi54ICs9IGJ1bm55LnNwZWVkWDtcblx0XHRcdFx0YnVubnkucG9zaXRpb24ueSArPSBidW5ueS5zcGVlZFk7XG5cdFx0XHRcdGJ1bm55LnNwZWVkWSArPSBncmF2aXR5O1xuXG5cdFx0XHRcdGlmIChidW5ueS5wb3NpdGlvbi54ID4gbWF4WClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJ1bm55LnNwZWVkWCAqPSAtMTtcblx0XHRcdFx0XHRidW5ueS5wb3NpdGlvbi54ID0gbWF4WDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChidW5ueS5wb3NpdGlvbi54IDwgbWluWClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJ1bm55LnNwZWVkWCAqPSAtMTtcblx0XHRcdFx0XHRidW5ueS5wb3NpdGlvbi54ID0gbWluWDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChidW5ueS5wb3NpdGlvbi55ID4gbWF4WSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJ1bm55LnNwZWVkWSAqPSAtMC44NTtcblx0XHRcdFx0XHRidW5ueS5wb3NpdGlvbi55ID0gbWF4WTtcblx0XHRcdFx0XHRidW5ueS5zcGluID0gKE1hdGgucmFuZG9tKCktMC41KSAqIDAuMlxuXHRcdFx0XHRcdGlmIChNYXRoLnJhbmRvbSgpID4gMC41KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGJ1bm55LnNwZWVkWSAtPSBNYXRoLnJhbmRvbSgpICogNjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoYnVubnkucG9zaXRpb24ueSA8IG1pblkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRidW5ueS5zcGVlZFkgPSAwO1xuXHRcdFx0XHRcdGJ1bm55LnBvc2l0aW9uLnkgPSBtaW5ZO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFwcC5yZW5kZXIoYXBwLnN0YWdlKTtcblx0XHRzdGF0cy5lbmQoKTtcblx0fSk7XG59XG5lbHNlIHtcblx0Ly8gVHJhZGl0aW9uYWwgUkFGXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG5cdHN0YXRzLmJlZ2luKCk7XG5cdGlmICghc2luZ2xlQnVubnkpIHtcblx0XHRmb3IgKGFCdW5ueSBpbiBteUJ1bm5pZXMpIHtcblx0XHRcdHZhciBidW5ueSA9IG15QnVubmllc1thQnVubnldO1xuXHRcdFx0YnVubnkucG9zaXRpb24ueCArPSBidW5ueS5zcGVlZFg7XG5cdFx0XHRidW5ueS5wb3NpdGlvbi55ICs9IGJ1bm55LnNwZWVkWTtcblx0XHRcdGJ1bm55LnNwZWVkWSArPSBncmF2aXR5O1xuXG5cdFx0XHRpZiAoYnVubnkucG9zaXRpb24ueCA+IG1heFgpXG5cdFx0XHR7XG5cdFx0XHRcdGJ1bm55LnNwZWVkWCAqPSAtMTtcblx0XHRcdFx0YnVubnkucG9zaXRpb24ueCA9IG1heFg7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChidW5ueS5wb3NpdGlvbi54IDwgbWluWClcblx0XHRcdHtcblx0XHRcdFx0YnVubnkuc3BlZWRYICo9IC0xO1xuXHRcdFx0XHRidW5ueS5wb3NpdGlvbi54ID0gbWluWDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGJ1bm55LnBvc2l0aW9uLnkgPiBtYXhZKVxuXHRcdFx0e1xuXHRcdFx0XHRidW5ueS5zcGVlZFkgKj0gLTAuODU7XG5cdFx0XHRcdGJ1bm55LnBvc2l0aW9uLnkgPSBtYXhZO1xuXHRcdFx0XHRidW5ueS5zcGluID0gKE1hdGgucmFuZG9tKCktMC41KSAqIDAuMlxuXHRcdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJ1bm55LnNwZWVkWSAtPSBNYXRoLnJhbmRvbSgpICogNjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoYnVubnkucG9zaXRpb24ueSA8IG1pblkpXG5cdFx0XHR7XG5cdFx0XHRcdGJ1bm55LnNwZWVkWSA9IDA7XG5cdFx0XHRcdGJ1bm55LnBvc2l0aW9uLnkgPSBtaW5ZO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFwcC5yZW5kZXIoYXBwLnN0YWdlKTtcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG5cdHN0YXRzLmVuZCgpO1xufVxuIl19
