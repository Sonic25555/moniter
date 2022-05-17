status = "";
object=[];
song="";
function preload(){
    song=loadSound("ringing_old_phone.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;

    }
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label=="person"){
                document.getElementById("baby").innerHTML="Baby Found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("baby").innerHTML="Baby Not Found";
                console.log("play");
                song.play();
            }
        }
        if(object.length==0){
            document.getElementById("baby").innerHTML="Baby Not Found";
            console.log("play");
            song.play();
        }
    }
}