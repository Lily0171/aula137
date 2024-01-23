status = "";
video = "";
object = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start() {
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
    console.log("O Modelo foi Carregado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objeto Detectado";
            document.getElementById("quantidade").innerHTML = "Quantidade de Objetos Detectados " + object.length;
            fill(r, g, b);
            porcentagen = floor(objeto[i].confidence * 100);
            text(objeto[i].label + " " + porcentagen + "%", objeto[i].x + 15, objeto[1].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objeto[i].x, objeto[i].y, objeto[i].width, objeto[i].height);
        }
    }
}