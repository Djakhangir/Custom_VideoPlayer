            
            //-------------------------Get Our Elements------------------------------// 


        //Selecting the elements from HTML and classes to use
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.slider');
const fullScreen = player.querySelector('.fullscreen');


            //--------------------------Build Our Functions-----------------------------//

            
function togglePlay() {         //function to make video play/pause
    const method = video.paused ? 'play': 'pause';
    video[method]();    // or another way of the code above
//     if(video.paused) { // there is a .paused property inside the video, there is not play property 
// video.play();
//     }  else {
//         video.pause();
//     }
}
    function updateButton(){ // we didn't linked this function to the button, we simply listen to the event to update icon
        const icon = this.paused ? '►' : '❚ ❚';
        toggle.textContent = icon;
}

function skip() { // to define how much the video has to skip, and the convenient thing to do it through data-skip 
    // property because you can put even the photo of urslf and it'll skip to the end when you click the photo or smthn
video.currentTime += parseFloat(this.dataset.skip); // we call currentTime and add it to dataset of the skip function 
//which is data-skip which is string that is why use parseFloat
}
    function rangeUpdate(){ //To handle the sliders when moved to slowdown video and volume slider
        video[this.name]=this.value; //value of the property with the certain name i.e. volume
    //console.log(this.name);
    //console.log(this.value);
}

function progressChanges(){
    const percent = (video.currentTime/video.duration) * 100; //duration is the property of the video tag, 
                                                                                //multiply by 100 to make 0.5 to 50%;
    progressBar.style.flexBasis = `${percent}%` // pick to change the style property flexBasis andadd the percent sign...
                    //percent is the percent we defined above through template literals
}

function scrub(e){ // this function helps us to use control slider of the current time and make math to see how much time left and we have seen so far
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration; // offset is explained in canvas practise... 
    //offsetWidth gives us the value of the width of the bar which is position relative
    video.currentTime=scrubTime
}

function toggleFullScreen(){
    if(video.requestFullscreen) {
        video.requestFullscreen();
    } else {
        toggleFullScreen=true;
    }
}


            //-----------------------Hook Up The Event Listeners-------------------------//


video.addEventListener('click', togglePlay); //onclick of the screen video will start
video.addEventListener('play', updateButton); // listens to the video instead of the button due to different plugins people use 
video.addEventListener('pause', updateButton); //when it plays it helps to change the text content of the button play/pause by 
//use of the updtaeButton function above...
toggle.addEventListener('click', togglePlay); // onclick of the play/pause button will play/pause
skipButtons.forEach(button =>button.addEventListener('click', skip)); // loop through the skipButton element and 
//take all button and add the evenet on click and trigger the skip function on click...
ranges.forEach(range => range.addEventListener('change', rangeUpdate)); // to loop and add event on value change oin a slider
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));// to loop and add the event on mousemove and trigger the function
video.addEventListener('timeupdate', progressChanges);// To listen to the video to emit the time to update and 
                                                        // when it happens we run the progressChange function

let mousedown = false;   // define mousedown as false to not allow scrub when mouse is up                                                 
progress.addEventListener('click', scrub); // to add event to call the function when we slide through the progress of the video
progress.addEventListener('mousemove', (e)=>mousedown && scrub(e));  // to listen to the mousemove
                                        // if mousedown is true then scrub if false then no scrub
progress.addEventListener('mousedown',() => mousedown =true); // to listen for the mousedown and 
progress.addEventListener('mouseup',() => mousedown =false); //up event to make scrub move the video progress too
fullScreen.addEventListener('click', toggleFullScreen, false);
