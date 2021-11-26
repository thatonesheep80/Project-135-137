video = "";
input_var = "";
objects = [];
status = "";

function preload()
{
    video = createCapture(VIDEO);
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);
}

function start()
{
   objectDetector = ml5.objectDetector("cocossd", modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
   input_var = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw()
{
     if(status != "")
    {
    image(video, 0, 0, 480, 380);
    objectDetector.detect(gotResult)

        for(i = 0; i < objects.length; i++) 
        {
            if(objects[i].label == input_var)
            {
            document.getElementById("status").innerHTML = input_var + " Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are - "+ objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
            }
        }
    }
}