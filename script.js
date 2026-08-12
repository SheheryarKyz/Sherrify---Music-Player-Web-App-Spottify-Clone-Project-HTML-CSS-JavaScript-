let currentSong = new Audio();
let songs;
let currentFolder;
// convert seconds to minutes and secconds (0.00 -> 00:00)
function formatTime(seconds) {
  // Handle invalid values
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
}

async function getSongs(folder) {
  currentFolder = folder;
  let a = await fetch(`${window.location.origin}/${folder}/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");

  songs = [];

  for (let i = 0; i < as.length; i++) {
    let href = as[i].href;

    if (href.endsWith(".mp3")) {
      songs.push(decodeURIComponent(href.split(`/${folder}/`)[1]));
    }
  }

  //   Show all the songs in the playlist

  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  songUL.innerHTML = "";

  for (const song of songs) {
    songUL.innerHTML += `<li><img class="invert" src="music.svg" alt="" />
                <div class="info">
                  <div>${song}</div>
                  <div>Sherry</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="" />
                </div>

</li>`;
  }
  // Attach an event listener to each song

  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li"),
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      //   console.log(
      //     e.querySelector(".info").getElementsByTagName("div")[0].innerText,
      //   );
      playMusic(
        e
          .querySelector(".info")
          .getElementsByTagName("div")[0]
          .innerText.trim(),
      );
    });
  });
}

const playMusic = (track, pause = false) => {
  //   let audio = new Audio("/songs/" + track);
  currentSong.src = `${window.location.origin}/${currentFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  } else {
    play.src = "play.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
  let a = await fetch(`${window.location.origin}/songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let anchors = div.getElementsByTagName("a");

  let array = Array.from(anchors);

  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/songs/")) {
      let folder = e.href.split("/").slice(-2)[1];
      //   get the metadata of the folder
      let a = await fetch(
        `${window.location.origin}/songs/${folder}/info.json`,
      );
      let response = await a.json();
      //   console.log(response);
      document.querySelector(".card-container").innerHTML =
        document.querySelector(".card-container").innerHTML +
        `<div data-folder="${folder}" class="card">
              <div class="play">
                <?xml version="1.0" encoding="UTF-8"?>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <!-- Green Circle -->
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="#1ED760"
                    stroke="#1ED760"
                    stroke-width="2.5"
                  />

                  <!-- Play Triangle -->
                  <path
                    d="M20 16
           L20 32
           L32 24
           Z"
                    fill="#000000"
                  />
                </svg>
              </div>
              <img
                src="${window.location.origin}/songs/${folder}/cover.jpeg"
              />
              <h2>${response.title}</h2>
              <p>${response.description}</p>
            </div>`;
    }
  }
  // Load the playlist whenever card is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
    });
  });
}

async function main() {
  // Get the list of songs
  await getSongs("songs/fol2");
  //   console.log(songs);
  playMusic(songs[0], true);

  //   Display all albums on the page
  displayAlbums();

  //   Attach event listener to play, next and previous
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  // Listen for time update event
  currentSong.addEventListener("timeupdate", () => {
    //   console.log(currentSong.currentTime,currentSong.duration);
    document.querySelector(".songtime").innerHTML =
      `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //   Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left = percent + "%";

    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //Add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0%";
  });

  //Add an event listener for close
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  // Add event listener to prev

  previous.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(
      decodeURIComponent(currentSong.src.split("/").slice(-1)[0]),
    );

    if (index - 1 < 0) {
      playMusic(songs[songs.length - 1]);
    } else {
      playMusic(songs[index - 1]);
    }
  });

  // Add event listener to next

  next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(
      decodeURIComponent(currentSong.src.split("/").slice(-1)[0]),
    );

    if (index + 1 > songs.length - 1) {
      playMusic(songs[0]);
    } else {
      playMusic(songs[index + 1]);
    }
  });

  // Add an event to volume
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  // Add event listener to mute the track

  document.querySelector(".volume>img").addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = e.target.src.replace("volume.svg", "mute.svg");
      currentSong.volume = 0;
      document.querySelector(".range").getElementsByTagName("input")[0].value =
        0;
    } else {
      e.target.src = e.target.src.replace("mute.svg", "volume.svg");
      currentSong.volume = 0.1;
      document.querySelector(".range").getElementsByTagName("input")[0].value =
        10;
    }
  });

  // // Play the first song
  //   var audio = new Audio(songs[0]);
  //   audio.play();

  // // Show audio info
  //   audio.addEventListener("loadeddata", () => {
  //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
  //   });
}

main();
