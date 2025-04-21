// Function to fetch current season anime data from MAL
async function fetchMALData() {
    const response = await fetch("https://api.jikan.moe/v4/seasons/now");
    const data = await response.json();
    return data.data; // Return the anime data
}

// Function to fetch anime data from AniList using GraphQL
async function fetchAniListData(malID) {
    const query = `
            query ($malID: Int) {
                Media(idMal: $malID, type: ANIME) {
                    id
                    title {
                        romaji
                    }
                    coverImage {
                          large
                    }
                    averageScore
                    popularity
                    favourites
                }
            }`;

    const variables = { malID: malID }; // Define query variables

    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }), // Send request body with query and variables
    });
    const data = await response.json();
    return data.data.Media; // Return the media data from AniList
}

// Function to create a row of anime data
function createAnimeRow(anime, malRating, anilistRating, malPopularity, anilistPopularity, malFavorites, anilistFavourites) {
    const row = document.createElement("div");
    row.className = "anime-row"; // Create container for anime row

    const cover = document.createElement("img");
    cover.src = anime.coverImage.large;
    cover.alt = anime.title.romaji;
    cover.className = "anime-cover"; // Display anime cover image

    const info = document.createElement("div");
    info.className = "anime-info";

    const title = document.createElement("h2");
    title.textContent = anime.title.romaji; // Display anime title

    const ratingsBar = document.createElement("div");
    ratingsBar.className = "rating-bar"; // Create ratings bar

    // Create MAL rating bar
    const malBar = document.createElement("div");
    malBar.className = "subbar mal-rating";
    malBar.style.width = `${malRating}%`;

    const malBarText = document.createElement("span");
    malBarText.textContent = `MAL: ${malRating}`;
    malBar.appendChild(malBarText);

    // Create AniList rating bar
    const anilistBar = document.createElement("div");
    anilistBar.className = "subbar anilist-rating";
    anilistBar.style.width = `${anilistRating}%`;

    const anilistBarText = document.createElement("span");
    anilistBarText.textContent = `AniList: ${anilistRating}`;
    anilistBar.appendChild(anilistBarText);

    // Create popularity text section
    const popularityText = document.createElement("div");
    popularityText.className = "popularity-text";

    const malPopularityText = document.createElement("p");
    malPopularityText.textContent = `MAL Popularity: ${malPopularity}`;

    const anilistPopularityText = document.createElement("p");
    anilistPopularityText.textContent = `AniList Popularity: ${anilistPopularity}`;

    // Create favourites text section
    const favouritesText = document.createElement("div");
    favouritesText.className = "favourites-text";

    const malFavoritesText = document.createElement("p");
    malFavoritesText.textContent = `MAL Favorites: ${malFavorites}`;

    const anilistFavouritesText = document.createElement("p");
    anilistFavouritesText.textContent = `AniList Favourites: ${anilistFavourites}`;

    // Append elements to their respective containers
    popularityText.appendChild(malPopularityText);
    popularityText.appendChild(anilistPopularityText);

    favouritesText.appendChild(malFavoritesText);
    favouritesText.appendChild(anilistFavouritesText)

    ratingsBar.appendChild(malBar);
    ratingsBar.appendChild(anilistBar);

    info.appendChild(title);
    info.appendChild(ratingsBar);
    info.appendChild(popularityText);
    info.appendChild(favouritesText);

    row.appendChild(cover);
    row.appendChild(info);

    return row; // Return the completed row element
}

// Initialize function to fetch and display anime data
async function init() {
    const animeList = document.getElementById("anime-list");
    let malData = await fetchMALData();



    for (const anime of malData) {
        try {
            const anilistData = await fetchAniListData(anime.mal_id);
            if (anilistData) {
                const malRating = Math.floor(anime.score * 10) || 0;
                const malPopularity = anime.popularity;
                const malFavorites = anime.favorites;
                const anilistRating = anilistData.averageScore || 0;
                const anilistPopularity = anilistData.popularity;
                const anilistFavourites = anilistData.favourites;
                const row = createAnimeRow(anilistData, malRating, anilistRating, malPopularity, anilistPopularity, malFavorites, anilistFavourites);
                animeList.appendChild(row); // Append row to the anime list
            }
        } catch (error) {
            console.error(`Error fetching data for ${anime.title}:`, error);
        }

        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
}

// Call the init function to start the process
init();

// Event listener for first GIF with sound
document.addEventListener('DOMContentLoaded', () => {
    const gif = document.querySelector('.dance2');
    const sound = document.getElementById('chikadance');
    
    let isPlaying = false;
    let clickTimer = null;

    gif.addEventListener('click', () => {
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
            // Double-click detected, restart the audio
            sound.currentTime = 0;
            sound.play();
            isPlaying = true;
        } else {
            // Single click detected
            clickTimer = setTimeout(() => {
                if (isPlaying) {
                    sound.pause(); // Pause the audio
                    isPlaying = false;
                } else {
                    sound.play(); // Play the audio
                    isPlaying = true;
                }
                clickTimer = null; // Reset clickTimer
            }, 300); // Time window for double-click detection (300 ms)
        }
    });
});

// Event listener for second GIF with sound
document.addEventListener('DOMContentLoaded', () => {
    const gif = document.querySelector('.dance');
    const sound = document.getElementById('9mm');
    
    let isPlaying = false;
    let clickTimer = null;

    gif.addEventListener('click', () => {
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
            // Double-click detected, restart the audio
            sound.currentTime = 0;
            sound.play();
            isPlaying = true;
        } else {
            // Single click detected
            clickTimer = setTimeout(() => {
                if (isPlaying) {
                    sound.pause(); // Pause the audio
                    isPlaying = false;
                } else {
                    sound.play(); // Play the audio
                    isPlaying = true;
                }
                clickTimer = null; // Reset clickTimer
            }, 300); // Time window for double-click detection (300 ms)
        }
    });
});
