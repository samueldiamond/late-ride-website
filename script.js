document.addEventListener("DOMContentLoaded", function() {
    // Define tracks array with exact paths as they appear in the filesystem
    const heavenTracks = [
        {
            title: "1. heaven",
            file: encodeURI("audio/RIDE001 - open credit - heaven/RIDE001_open-credit_heaven_01_heaven.mp3")
        },
        {
            title: "2. guided",
            file: encodeURI("audio/RIDE001 - open credit - heaven/RIDE001_open-credit_heaven_02_guided.mp3")
        },
        {
            title: "3. shadow",
            file: encodeURI("audio/RIDE001 - open credit - heaven/RIDE001_open-credit_heaven_03_shadow.mp3")
        },
        {
            title: "4. jammy",
            file: encodeURI("audio/RIDE001 - open credit - heaven/RIDE001_open-credit_heaven_04_jammy.mp3")
        }
    ];

    const playButtons = document.querySelectorAll(".play-button");
    const accordions = document.querySelectorAll(".accordion");
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.item');

    playButtons.forEach(button => {
        button.addEventListener("click", function() {
            const panel = this.nextElementSibling;
            const iframe = panel.querySelector("iframe");
            
            if (panel.style.display === "none" || panel.style.display === "") {
                panel.style.display = "block";
                iframe.style.display = "block";
            } else {
                panel.style.display = "none";
                iframe.style.display = "none";
            }
        });
    });

    accordions.forEach(accordion => {
        accordion.addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    });

    // Show all items initially
    items.forEach(item => item.classList.add('show'));

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            items.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.add('show');
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                    }
                }
            });
        });
    });

    const player = document.getElementById('heaven-player');
    const playBtn = document.querySelector('.custom-player .play');
    const prevBtn = document.querySelector('.custom-player .prev-track');
    const nextBtn = document.querySelector('.custom-player .next-track');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const currentTrackSpan = document.querySelector('.current-track');
    const timeSpan = document.querySelector('.time');
    
    let currentTrackIndex = 0;

    function loadTrack(index) {
        console.log('Loading track:', heavenTracks[index].title);
        player.src = heavenTracks[index].file;
        currentTrackSpan.textContent = heavenTracks[index].title;
        player.load();
        return player.play().catch(error => {
            console.error('Error playing track:', error);
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    playBtn.addEventListener('click', () => {
        if (player.paused) {
            player.play();
            playBtn.textContent = '❚❚';
        } else {
            player.pause();
            playBtn.textContent = '▶';
        }
    });

    prevBtn.addEventListener('click', async () => {
        currentTrackIndex = (currentTrackIndex - 1 + heavenTracks.length) % heavenTracks.length;
        await loadTrack(currentTrackIndex);
        playBtn.textContent = '❚❚';
    });

    nextBtn.addEventListener('click', async () => {
        currentTrackIndex = (currentTrackIndex + 1) % heavenTracks.length;
        await loadTrack(currentTrackIndex);
        playBtn.textContent = '❚❚';
    });

    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        player.currentTime = player.duration * percent;
    });

    player.addEventListener('timeupdate', () => {
        const percent = (player.currentTime / player.duration) * 100;
        progress.style.width = percent + '%';
        timeSpan.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;
    });

    player.addEventListener('ended', async () => {
        currentTrackIndex = (currentTrackIndex + 1) % heavenTracks.length;
        await loadTrack(currentTrackIndex);
        playBtn.textContent = '❚❚';
    });

    // Load first track
    loadTrack(0);
});
