const btnAdd = document.querySelector('.btnAdd');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');

btnAdd.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

modal.addEventListener('click', (event) => {
    if (!modalContent.contains(event.target)){
        modal.classList.add('hidden');
    }
});

const saveVideo = document.querySelector('.saveVideo');
const videoList = document.querySelector('.videoList');

const inputLink = document.querySelector('.inputLink');
const inputTitle = document.querySelector('.inputTitle');
const inputDate = document.querySelector('.inputDate');
const inputReview = document.querySelector('.inputReview');
const watchedList = document.querySelector('.watchedList');

function getYouTubeEmbedUrl(url) {
    try {
        const parsedUrl = new URL(url);
        let videoId = '';

        if (parsedUrl.hostname.includes('youtu.be')) {
            videoId = parsedUrl.pathname.slice(1).split('?')[0];
        } else if (
            parsedUrl.hostname.includes('youtube.com') &&
            parsedUrl.pathname === '/watch'
        ) {
            videoId = parsedUrl.searchParams.get('v');
        } else if (
            parsedUrl.hostname.includes('youtube.com') &&
            parsedUrl.pathname.startsWith('/shorts/')
        ) {
            videoId = parsedUrl.pathname.split('/shorts/')[1].split('?')[0];
        } else if (
            parsedUrl.hostname.includes('youtube.com') &&
            parsedUrl.pathname.startsWith('/embed/')
        ) {
            videoId = parsedUrl.pathname.split('/embed/')[1].split('?')[0];
        }

        if (!videoId) {
            return '';
        }

        return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
        return '';
    }
}

saveVideo.addEventListener('click', () => {
    const link = inputLink.value.trim();
    const title = inputTitle.value.trim();
    const date = inputDate.value.trim();
    const review = inputReview.value.trim();

    if(!link || !title || !date || !review){
        alert('Заполните все поля');
        return;
    }

    const embedUrl = getYouTubeEmbedUrl(link);

    const li = document.createElement('li');
    li.classList.add('videoItem');

    li.innerHTML = `
    
    <div class="videoHeader">
        <h3>${title}</h3>
        <div class="actions">
            <button class = "deleteBtn">🗑</button>
            <button class = "watchBtn">👁</button>
        </div>
    </div>

    <div class="videoMeta">Date: ${date}</div>

    <iframe
    width="100%"
    height="200"
    src="${embedUrl}"
    title="${title}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
    </iframe>

    <p class="videoReview">${review}</p>
    `;
    const deleteBtn = li.querySelector('.deleteBtn');
    const watchBtn = li.querySelector('.watchBtn');

    deleteBtn.addEventListener('click', () => {
        if(confirm('Delete this video?')){
            li.remove();
        }
    });

    watchBtn.addEventListener('click', () =>{
        watchedList.prepend(li);
        watchBtn.remove();
    });



    videoList.prepend(li);

    inputLink.value='';
    inputTitle.value='';
    inputDate.value='';
    inputReview.value='';

    modal.classList.add('hidden');
});


