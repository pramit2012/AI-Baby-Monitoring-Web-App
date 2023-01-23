status = "";
sound = ""
img = ""
objects = [];
function preload() {
    sound = loadSound("emergency-alarm-with-reverb-29431.mp3");
    img = loadImage("baby.jpg");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;

}
function draw() {
    image(video, 0, 0, 380, 380);
    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "NUmber of objects detected are: " + objects.length;
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);      
          text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(img == "person") {
        document.getElementById("status").innerHTML = "Status: Baby is Detected";
        sound.stop();
    }
    else if(img != "person") {
        document.getElementById("status").innerHTML = "Status: Baby is not Detected";
        sound.play();
    }
    else if(objects.length > 0) {
        document.getElementById("status").innerHTML = "Status: Baby is not Detected";
        sound.play();
    }
}