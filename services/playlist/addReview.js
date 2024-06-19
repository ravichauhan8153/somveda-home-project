import dbService from "../../utilities/dbService";
const ObjectId = require("mongodb").ObjectID;
export const addReview = async (entry) => {
  let {
    body: { songId, review },
  } = entry;

  try {
    let { _id } = await dbService.findOneRecord("PlaylistModel", {
      id: songId,
    });

    if (!_id) {
      throw new Error("Song not found!");
    }
    
    let addReview = await dbService.findOneAndUpdateRecord(
      "PlaylistModel",
      { _id: ObjectId(_id) },
      { review: review }
    );

    return `${review} star review added`;

    return { playlistData, totalSong };
  } catch (error) {}
};
