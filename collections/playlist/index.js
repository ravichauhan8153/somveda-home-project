import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },

  danceability: { type: Number },
  energy: { type: Number },
  key: { type: Number },
  loudness: { type: Number },
  mode: { type: Number },
  acousticness: { type: Number },
  instrumentalness: { type: Number },
  liveness: { type: Number },
  valence: { type: Number },
  tempo: { type: Number },
  duration_ms: { type: Number },
  time_signature: { type: Number },
  num_bars: { type: Number },
  num_sections: { type: Number },
  num_segments: { type: Number },
  class: { type: Number },
  review: { type: Number },

  isDeleted: { type: Boolean, default: false },
  deletedAt: Number,
});

playlistSchema.index({
  _id: 1,
  title: 1,
});

export default mongoose.model("Playlist", playlistSchema);
