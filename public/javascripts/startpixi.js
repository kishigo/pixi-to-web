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
