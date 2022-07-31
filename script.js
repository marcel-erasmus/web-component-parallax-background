const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let speed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '/assets/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = '/assets/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = '/assets/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = '/assets/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = '/assets/layer-5.png';

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = speed * this.speedModifier;
    }

    update() {
        this.speed = speed * this.speedModifier;

        if (this.x <= -this.width) {
            this.x = 0;
        }

        this.x = this.x - this.speed;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const layers = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    layers.forEach(layer => {
        layer.update();
        layer.draw();
    })

    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    const slider = document.getElementById('slider');
    slider.value = speed;

    slider.addEventListener('change', (e) => {
        speed = e.target.value;
    })

    animate();
})
