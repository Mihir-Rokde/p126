song="";
song1="";
song1status="";
song2status="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
song=loadSound("music.mp3");
song1=loadSound("sui.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotPoses);
}
function modelloaded(){
    console.log("modelloaded");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+",leftWristY="+leftWristY);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+",rightWristY="+rightWristY);
}
}
function draw(){
    image(video,0,0,600,500);
song1status=song.isPlaying();
song2status=song1.isPlaying();
fill("blue");
stroke("black");

if(scorerightwrist>0.2)
{
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(song1status==false){
        song.play();
        document.getElementById("song").innerHTML="playing - playing sui-CR7";
    }
}
if(scoreleftwrist>0.2)
{
    circle(leftWristX,leftWristY,20);
    song.stop();
    if(song2status==false){
        song1.play();
        document.getElementById("song").innerHTML="playing - playing music";
    }
}
    }
   

function play(){
song.play();

}
