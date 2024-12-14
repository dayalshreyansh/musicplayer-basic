const playButton=document.getElementById("play");
const pauseButton=document.getElementById("pause");
const backButton=document.getElementById("back");
const forwardBottoen=document.getElementById("forward");
const playlistSongs=document.getElementById("playlist");
const allSongs = [
    {
      id: 0,
      title: "Dwan Of Change",
      artist: "Roman Senyk",
      duration: "1:57",
      src: "songs/dawnofchange.mp3",
    },
    {
      id: 1,
      title: "Slow Life",
      artist: "Benjamin Lazzarus",
      duration: "3:57",
      src: "songs/slowlife.mp3",
    },
    {
      id: 2,
      title: "Hope",
      artist: "Hugo Dujardin",
      duration: "1:52",
      src: "songs/hope.mp3",
    },
    {
      id: 3,
      title: "Motion",
      artist: "Theatre Of Delays",
      duration: "3:35",
      src: "songs/motion.mp3",
    },
    {
      id: 4,
      title: "Fireside Chat",
      artist: "Yunior Arronte",
      duration: "3:51",
      src: "songs/firesidechat.mp3",
    },
    {
      id: 5,
      title: "Echo of Sadness",
      artist: "Turnique",
      duration: "2:19",
      src: "songs/echoofsadness.mp3",
    },
    {
      id: 6,
      title: "Melancholy Lull",
      artist: "Vital",
      duration: "2:15",
      src: "songs/melancholylull.mp3",
    },
    {
      id: 7,
      title: "Sleepless",
      artist: "Diffie Bosman",
      duration: "2:33",
      src: "songs/sleepless.mp3",
    },
    {
      id: 8,
      title: "On Repeat",
      artist: " Marcus P.",
      duration: "2:16",
      src: "songs/onrepeat.mp3",
    },
    {
      id: 9,
      title: "Chasing That Feeling",
      artist: "Quincy Larson",
      duration: "2:43",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
  ];
  
const audio=new Audio();
let userData={
    songs: [...allSongs],
    currentSong:null,
    songCurrentTime:0,
};

const playSong=(id)=>{
    const song = userData?.songs.find((song)=>song.id===id);
    audio.src=song.src;
    audio.title=song.title;
    if(userData?.currentSong===null || userData?.currentSong.id !== song.id){
        audio.currentTime=0;
    }
    else{
      audio.currentTime= userData?.songCurrentTime;
    }
    removeHighlightCurrentSong();
    userData.currentSong = song;
    playButton.classList.add("playing")
    highlightCurrentSong();
    audio.play();

};
const play=()=>{
  if(userData?.currentSong!==null)
  {
    playButton.classList.add("playing")
    audio.play();
  }
  

}
const getCurrentSongIndex=()=>{
   return userData?.songs.indexOf(userData?.currentSong)
}
const next=()=>{
  removeHighlightCurrentSong();
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
}}
const previous=()=>{
  removeHighlightCurrentSong();
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex - 1];

    playSong(nextSong.id);
}}
const pauseSong = () => {
    userData.songCurrentTime=audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
};

const renderSongs = (array) =>{
    const songHTML = array.map((song)=>{
        return `
        <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
        `
    }).join("");
    playlistSongs.innerHTML= songHTML;
}
const sortSongs = () => {
    userData?.songs.sort((a,b) => {
      if (a.title < b.title) {
        return -1;
      }
  
      if (a.title > b.title) {
        return 1;
      }
  
      return 0;
    });
  
    return userData?.songs;
};
const highlightCurrentSong=()=>{
  const id=document.getElementById(`song-${userData?.currentSong.id}`);
  id.classList.add("highlight");
}
const removeHighlightCurrentSong=()=>{
  if(userData?.currentSong!==null){
    const id=document.getElementById(`song-${userData?.currentSong.id}`);
    id.classList.remove("highlight");
  }
}
const deleteSong=(id)=>{
  const song = userData?.songs.find((song)=>song.id===id);
  const index=userData?.songs.indexOf(song);
  const remove=userData?.songs.splice(index,1);
  renderSongs(sortSongs());
}
renderSongs(sortSongs());
pauseButton.addEventListener("click",pauseSong);
playButton.addEventListener("click",play);
forwardBottoen.addEventListener("click",next);
backButton.addEventListener("click",previous);
