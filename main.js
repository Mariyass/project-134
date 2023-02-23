var alarm;
var status="";
var objects=[];

function preload(){
    alarm=loadSound("alert.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   
}

function modelLoaded(){
    console.log("Model Loaded")
    status=true
    // objectDetector.detect(img,gotResult)
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML=" Status: Detecting objects";
}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results;
    }
}
function draw(){
    image(video,0,0,380,380)

    if(status!=""){
        objectDetector.detect(video,gotResult);

        for(var i=0;i<objects.length;i++){
            document.getElementById("number_of_objects").innerHTML="number of objects detected are; "+objects.length;
            
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML="status : baby detected";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML="status : baby not detected";
                alarm.play();  
            }

        }
        if(objects.length<0){
            document.getElementById("status").innerHTML="status : baby not detected";
            alarm.play();
        }
    }
    
}