
let inc = 0.01;
let scl = 20;
let cols, rows; let zoff = 0;

let particles = [];
let numOfParticles = 300;

let flowField;

let red;
let green;
let blue;
let alpha;
let weight;
let speed;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    red = random(255);
    green = random(255);
    blue = random(255);
    alpha = 255;
    weight = 2;
    speed = 0.3;

    sliderR = createSlider(0, 255, red, 0);
    sliderR.position(20, height - 290);
    sliderR.style('width', '150px');
    sliderR.style('color', '#ff0000');


    sliderG = createSlider(0, 255, green, 0);
    sliderG.position(20, height - 250);
    sliderG.style('width', '150px');

    sliderB = createSlider(0, 255, blue, 0);
    sliderB.position(20, height - 210);
    sliderB.style('width', '150px');

    sliderA = createSlider(0, 255, alpha, 0);
    sliderA.position(20, height - 170);
    sliderA.style('width', '150px');

    sliderW = createSlider(1, 5, weight, 0);
    sliderW.position(20, height - 130);
    sliderW.style('width', '150px');

    sliderS = createSlider(0.1, 3, speed, 0);
    sliderS.position(20, height - 90);
    sliderS.style('width', '150px');


    let redText = createDiv('Red');
    redText.style('font-size', '10px');
    redText.style('color', '#FFFFFF');
    redText.style("font-family", "'Montserrat', sans-serif");
    redText.style("font-weight", "lighter");
    redText.position(25, height - 305);

    let greenText = createDiv('Green');
    greenText.style('font-size', '10px');
    greenText.style('color', '#FFFFFF');
    greenText.style("font-family", "'Montserrat', sans-serif");
    greenText.style("font-weight", "lighter");
    greenText.position(25, height - 265);

    let blueText = createDiv('Blue');
    blueText.style('font-size', '10px');
    blueText.style('color', '#FFFFFF');
    blueText.style("font-family", "'Montserrat', sans-serif");
    blueText.style("font-weight", "lighter");
    blueText.position(25, height - 225);


    let alphaText = createDiv('Transparency');
    alphaText.style('font-size', '10px');
    alphaText.style('color', '#FFFFFF');
    alphaText.style("font-family", "'Montserrat', sans-serif");
    alphaText.style("font-weight", "lighter");
    alphaText.position(25, height - 185);

    let thickText = createDiv('Thickness');
    thickText.style('font-size', '10px');
    thickText.style('color', '#FFFFFF');
    thickText.style("font-family", "'Montserrat', sans-serif");
    thickText.style("font-weight", "lighter");
    thickText.position(25, height - 145);

    let speedText = createDiv('Speed');
    speedText.style('font-size', '10px');
    speedText.style('color', '#FFFFFF');
    speedText.style("font-family", "'Montserrat', sans-serif");
    speedText.style("font-weight", "lighter");
    speedText.position(25, height - 105);




    let col = color(25, 23, 200, 50);

    saveButton = createButton('Save as .jpg');
    saveButton.position(23, height - 60);
    saveButton.mousePressed(saveCanvasAsImg);
    saveButton.style("font-family", "'Montserrat', sans-serif");
    saveButton.style("font-weight", "lighter");
    saveButton.style('font-size', '10px');
    saveButton.style("color", "#ffffff");
    saveButton.style("background-color", col);


    randomButton = createButton('Randomize');
    randomButton.position(105, height - 60);
    randomButton.mousePressed(refreshPage);
    randomButton.style("font-family", "'Montserrat', sans-serif");
    randomButton.style("font-weight", "lighter");
    randomButton.style('font-size', '10px');
    randomButton.style("color", "#ffffff");
    randomButton.style("background-color", col);

    cols = floor(width / scl);
    rows = floor(height / scl);

    flowField = new Array(rows * cols);

    createArrayOfParticles();

}

function draw() {

    red = sliderR.value();
    sliderR.changed(() => {
        createArrayOfParticles();
    });

    green = sliderG.value();
    sliderG.changed(() => {
        createArrayOfParticles();
    });

    blue = sliderB.value();
    sliderB.changed(() => {
        createArrayOfParticles();
    });

    alpha = sliderA.value();
    sliderA.changed(() => {
        createArrayOfParticles();
    });

    weight = sliderW.value();
    sliderW.changed(() => {
        createArrayOfParticles();
    });

    speed = sliderS.value();
    sliderS.changed(() => {
        createArrayOfParticles();
    });

    
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let angle = noise(xoff, yoff, zoff) * TWO_PI;

            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowField[index] = v;
            xoff += inc;
        }
        yoff += inc;

        //zoff += 0.001;
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].show();
        particles[i].update();
        particles[i].edges();
      
    }
}

function saveCanvasAsImg() {
    save('flowField_' + Date.now() + '.jpg');
}


function createArrayOfParticles() {
    background(0);
    for (let i = 0; i <= numOfParticles; i++) {
        particles[i] = new Particle(red, green, blue, alpha, weight, speed);
    }

    redraw();
}

function refreshPage(){
    window.location.reload();
} 
