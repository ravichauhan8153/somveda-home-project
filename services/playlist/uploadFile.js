import Message from "../../utilities/messages";
import dbService from "../../utilities/dbService";
const fs = require("fs");
const _ = require("lodash");

export const uploadFile = async (req, res) => {
  try {
    const jsonData = JSON.parse(req.files[0].buffer.toString("utf8"));
    const keys = _.keys(jsonData.id);
    let data = _.map(keys, (key) => {
      return {
        id: jsonData.id[key],
        title: jsonData.title[key],
        danceability: jsonData.danceability[key],
        energy: jsonData.energy[key],
        key: jsonData.key[key],
        loudness: jsonData.loudness[key],
        mode: jsonData.mode[key],
        acousticness: jsonData.acousticness[key],
        instrumentalness: jsonData.instrumentalness[key],
        liveness: jsonData.liveness[key],
        valence: jsonData.valence[key],
        tempo: jsonData.tempo[key],
        duration_ms: jsonData.duration_ms[key],
        time_signature: jsonData.time_signature[key],
        num_bars: jsonData.num_bars[key],
        num_sections: jsonData.num_sections[key],
        num_segments: jsonData.num_segments[key],
        class: jsonData.class[key],
      };
    });
    const addPlaylist = await dbService.createManyRecords(
      "PlaylistModel",
      data
    );

    res.status(200).json({ status: 200, message: Message.success });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};
