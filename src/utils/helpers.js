function formatGameData(game) {
    return {
        name: game.name,
        cover: game.background_image,
        screenshots: game.short_screenshots.map(screenshot => screenshot.image),
        genres: game.genres.map(genre => genre.name),
        releaseDate: game.released,
        metacriticScore: game.metacritic,
        description: game.description_raw,
        storeLinks: game.stores.map(store => ({
            name: store.store.name,
            url: store.url
        }))
    };
}

function formatGenres(genres) {
    return genres.slice(0, 2); // Limit to 2 genres
}

function formatPlatform(platform) {
    return platform.charAt(0).toUpperCase() + platform.slice(1); // Capitalize platform name
}

export { formatGameData, formatGenres, formatPlatform };