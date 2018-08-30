
class getStreamers {
  constructor(name, checker, vidid, json, viewerCount) {
    this.name = name;
    this.checker = checker;
    this.vidid = vidid;
    this.json = json;
    this.viewerCount = viewerCount;
  }
  getData() {
    fetch(`fetches/${this.name}.json`)
    .then((res) => res.json())
    .then(data => {
        this.json = data;
        this.dataThink();
})
}
  dataThink() {
    if (!this.checker && !this.json.pageInfo.totalResults == 0) {
      this.checker = true;
      this.vidid = this.json.items[0].id.videoId;
      updater(this.name);
      addVideo(this.name, this.vidid);
      this.getStats()
      organizeCards();
    } else if (this.checker && this.json.pageInfo.totalResults == 0){
      this.checker = false;
      remover(this.name)
    }  else if (this.checker && !this.json.pageInfo.totalResults == 0) {
      this.getStats();
    }
  }
  getStats() {
    fetch (`../fetches/${this.name}stats.json`)
    .then((res) => res.json())
    .then((data) => {
      this.viewerCount = data.items[0].liveStreamingDetails.concurrentViewers;
      const viddiv = document.querySelector(`.${this.name} .number`)
      if (this.viewerCount == undefined) {
        this.viewerCount = 'Offline';
      } else {
      viddiv.innerHTML = `<span>${this.viewerCount} viewers</span>`;
    }
    })
  }
}

let ice = new getStreamers('ice', checker = false);
let tsa = new getStreamers('tsa', checker = false);
let destiny = new getStreamers('destiny', checker = false);
let hyphonix = new getStreamers('hyphonix', checker = false);
let mix = new getStreamers('mix', checker = false);

init();
setInterval(init, 60000)

function init() {
mix.getData();
ice.getData();
tsa.getData();
hyphonix.getData();
destiny.getData();
}

const pics = document.querySelectorAll('.pic');

function updater(astring) {
const dataset = document.querySelectorAll('.carder');
dataset.forEach(item => {
  if (item.classList.value.includes(astring)) {
  item.classList.add('live');
  item.children[1].classList.add('active');
}
})
}

function remover(stringer) {
  const dataset = document.querySelectorAll('.carder');
  dataset.forEach(item => {
    if (item.classList.value.includes(stringer)) {
    item.children[1].classList.remove('active');
    item.classList.remove('live');
    item.querySelector('.pic').removeEventListener('click', addVideo);
  }
  })
}


const links = document.querySelectorAll('.pic');
const video = document.querySelector('.stream');
const chat = document.querySelector('.chat');
function addVideo(theName, vidNumb) {
  const namediv = document.querySelector(`.${theName} img`);
  namediv.addEventListener('click', () => {
    video.src = `https://www.youtube.com/embed/${vidNumb}`;
    chat.src = `https://www.youtube.com/live_chat?v=${vidNumb}&embed_domain=localhost`;
  })
}

function organizeCards() {
  const moon1 = [...document.querySelectorAll('[data-who]')];
  const thediv = document.querySelector('.orgme');
  const newray = moon1.sort((a, b) => a.classList.length < b.classList.length ? 1 : -1);
  thediv.innerHTML = '';
  thediv.append(...newray);
}
