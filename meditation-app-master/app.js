const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timedisplay = document.querySelector('.time-display');
    const timeselect = document.querySelectorAll('.time-select button');
    //Get the length of outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Duration
    let fakeduration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick Different Sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkplaying(song);
        });
    });

    //Play Sound
    play.addEventListener('click', () => {
        checkplaying(song);
    });


    //Select Sound
    timeselect.forEach(option => {
        option.addEventListener('click', function () {
            fakeduration = this.getAttribute("data-time");
            timedisplay.textContent = `${Math.floor(fakeduration / 60)}:0${Math.floor(fakeduration % 60)}`;
        });
    });
    //Function To stop and play sounds
    const checkplaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //Updating Time of song
    song.ontimeupdate = () => {
        let currenttime = song.currentTime;
        let elapsed = fakeduration - currenttime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);


        //Animating The Circle
        let progress = outlineLength - (currenttime / fakeduration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animating Timer Text
if (seconds<10) {
    timedisplay.textContent = `${minutes}:0${seconds}`;
}
else{
    timedisplay.textContent = `${minutes}:${seconds}`;
}

        //Stoping Time
        if (currenttime >= fakeduration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();