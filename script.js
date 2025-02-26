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
        button.addEventListener('click', function() {
            const releaseItem = this.closest('.release');
            const panel = releaseItem.querySelector('.panel');
            
            // Toggle accordion
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
            
            // Handle custom player if it exists
            const customPlayer = panel.querySelector('.custom-player');
            if (customPlayer) {
                const audio = panel.querySelector('audio');
                if (!audio) {
                    console.error('Audio element not found');
                    return;
                }

                const playBtn = customPlayer.querySelector('.play');
                const prevBtn = customPlayer.querySelector('.prev-track');
                const nextBtn = customPlayer.querySelector('.next-track');
                const progress = customPlayer.querySelector('.progress');
                const progressBar = customPlayer.querySelector('.progress-bar');
                const currentTrack = customPlayer.querySelector('.current-track');
                const timeDisplay = customPlayer.querySelector('.time');
                const mainPlayButton = this;  // Store reference to main play button
                
                const updatePlayButtonStates = (isPlaying) => {
                    const playIcon = isPlaying ? '❚❚' : '▶';
                    const playText = isPlaying ? '❚❚ playing' : '▶ play';
                    playBtn.textContent = playIcon;
                    mainPlayButton.textContent = playText;
                };
                
                // Initialize player if not already done
                if (!audio.initialized) {
                    let currentTrackIndex = 0;
                    const sources = Array.from(audio.getElementsByTagName('source'));
                    
                    if (sources.length === 0) {
                        console.error('No audio sources found');
                        return;
                    }

                    const updateTrackInfo = () => {
                        const trackName = sources[currentTrackIndex].src.split('/').pop().split('.')[0];
                        currentTrack.textContent = `${currentTrackIndex + 1}. ${trackName.split('_').pop()}`;
                    };

                    // Set initial audio source
                    audio.src = sources[0].src;
                    
                    // Main play button in custom player
                    playBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (audio.paused) {
                            audio.play().then(() => {
                                updatePlayButtonStates(true);
                            }).catch(e => console.error('Error playing audio:', e));
                        } else {
                            audio.pause();
                            updatePlayButtonStates(false);
                        }
                    });

                    prevBtn.addEventListener('click', () => {
                        currentTrackIndex = (currentTrackIndex - 1 + sources.length) % sources.length;
                        audio.src = sources[currentTrackIndex].src;
                        updateTrackInfo();
                        audio.play().then(() => {
                            updatePlayButtonStates(true);
                        });
                    });
                    
                    nextBtn.addEventListener('click', () => {
                        currentTrackIndex = (currentTrackIndex + 1) % sources.length;
                        audio.src = sources[currentTrackIndex].src;
                        updateTrackInfo();
                        audio.play().then(() => {
                            updatePlayButtonStates(true);
                        });
                    });
                    
                    audio.addEventListener('ended', () => {
                        currentTrackIndex = (currentTrackIndex + 1) % sources.length;
                        audio.src = sources[currentTrackIndex].src;
                        updateTrackInfo();
                        audio.play().then(() => {
                            updatePlayButtonStates(true);
                        });
                    });

                    audio.addEventListener('pause', () => {
                        updatePlayButtonStates(false);
                    });

                    audio.addEventListener('play', () => {
                        updatePlayButtonStates(true);
                    });
                    
                    updateTrackInfo();
                    audio.initialized = true;
                }

                // Store the updatePlayButtonStates function on the audio element
                audio.updatePlayButtonStates = updatePlayButtonStates;

                // Handle the initial play button click
                if (audio.paused) {
                    audio.play().then(() => {
                        updatePlayButtonStates(true);
                    }).catch(e => console.error('Error playing audio:', e));
                } else {
                    audio.pause();
                    updatePlayButtonStates(false);
                }
            } else {
                // Handle iframe embeds
                const iframe = panel.querySelector('iframe');
                if (iframe) {
                    iframe.style.display = iframe.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });

    // Add click handler for all play buttons in the custom player
    document.querySelectorAll('.custom-player .play').forEach(playBtn => {
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const customPlayer = this.closest('.custom-player');
            const audio = customPlayer.querySelector('audio');
            const mainPlayButton = this.closest('.release').querySelector('.play-button');

            if (audio.paused) {
                audio.play().then(() => {
                    audio.updatePlayButtonStates(true);
                }).catch(e => console.error('Error playing audio:', e));
            } else {
                audio.pause();
                audio.updatePlayButtonStates(false);
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
