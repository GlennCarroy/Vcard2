//Inspiration: https://www.youtube.com/watch?v=raXW5J1Te7Y

//initial setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;


//Variables 
const Colors = [
	"#8DBBE5",
	"#273440",
	"#4E687F",
	"#BF433E",
];


//Event Listeners
addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//A chaque refresh, on reprend toute la fenêtre + on envoit la fonction init qui crée les cercles
	init();
});


// Utility function
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max-min+1) + min);
}

function randomColor(Colors) {
	return Colors[Math.floor(Math.random() * Colors.length)];
}


// Objects (qui seront générer ailleurs)
function Particle(x , y , radius , color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	//Pour créer le mouvement circulaire.
	this.radians = Math.random() * Math.PI*2; //On génère alératoirement sur la limite du rayon du cercle
	this.velocity = 0.002;
	this.distanceFromCenter = randomIntFromRange(150, innerWidth); // "randomInt" est là pour varier l'éloigement sur l'axe des x de chaque cercle généré.


	this.update = () => {
		//move points over time
		this.radians += this.velocity;
		this.x = (innerWidth /2) + Math.cos(this.radians) * this.distanceFromCenter; 
		this.y = (innerHeight / 2) + Math.sin(this.radians) * this.distanceFromCenter;
		// --> le '*100' (qui a été remplacé par randomint) permettait de bouger de façon plus large
		//plutôt qu'entre 0 et 1.
		
		this.draw();
	}

	this.draw = () => {
		//forme à générer
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
}

// Generation on screen
let particles;
function init() {
	particles = []

	for (i = 0; i < 1000; i++) {
		//Lui dire quoi dessiner ici. Ca n'apparaîtra pas à l'écran car on doit "l'animer pour ça"
		const radius = (Math.random()*5)+1;
		particles.push(new Particle( innerWidth/2 , innerHeight/2 , radius, randomColor(Colors)));
	};
}

// Animation loop
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = "rgba(255,255,255,1)"
	c.fillRect(0,0, canvas.width, canvas.height);
	//--> Pour éviter les traînées des formes
	// --> ici avec fill rect et le fillstyle, on permet
	//de redessiner un rectangle transparent qui se redessine à chaque
	//rafraichissement --> opacity = trail
	
	particles.forEach(Particle => {
		Particle.update();
	});
}

init();
animate();