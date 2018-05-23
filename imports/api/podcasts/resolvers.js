import axios from "axios";

export default {
  Query: {
    podcastsPreviews(obj, { genreId }) {
      return axios
        .get(
          `http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppodcasts/sf=143441/limit=100/genre=${genreId}/json`
        )
        .then(res => {
          return res.data.feed.entry;
        });
    }
  },
  PodcastPreview: {
    id: data => data["id"].attributes["im:id"],
    name: data => data["im:name"].label,
    artworkUrl: data => data["im:image"][0].label,
    itunesUrl: data => data["id"].label,
    summary: data => (data["summary"] ? data["summary"].label : null)
  }
};