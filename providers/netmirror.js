class NetMirrorProvider {
    constructor() {
        this.baseUrl = "https://netmirror.studio";
    }

    async search(query) {
        // Sends search request to NetMirror
        const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        return data.results.map(item => ({
            id: item.id,
            title: item.title,
            poster: item.poster
        }));
    }

    async getDetail(id) {
        // Retrieves movie details and episode/stream ID
        const response = await fetch(`${this.baseUrl}/movie/${id}`);
        const data = await response.json();
        
        return {
            id: data.id,
            title: data.title,
            episodes: [{ id: data.streamId, title: "Play Movie" }]
        };
    }

    async getStreams(episodeId) {
        // Returns the extracted video stream link
        const response = await fetch(`${this.baseUrl}/api/stream/${episodeId}`);
        const data = await response.json();
        
        return [
            {
                url: data.url,
                quality: "1080p"
            }
        ];
    }
}
