import dbService from "../../utilities/dbService";
import { pagenationFn } from "../../utilities/pagination";

export const getPlaylist = async (entry) => {
  let {
    body: { page, limit, searchText, sortBy, sortMode },
  } = entry;

  try {
    let filter = {};
    const { docLimit, noOfDocSkip } = pagenationFn({
      page,
      limit,
    });

    if (searchText) {
      filter = {
        title: { $regex: new RegExp(searchText, "i") },
      };
    }

    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortMode;
    } else {
      sort = { _id: -1 };
    }

    let aggregate = [
      {
        $match: filter,
      },
      { $sort: sort },
      { $skip: noOfDocSkip },
      { $limit: docLimit },
      {
        $project: {
          _id: 1,
          id: 1,
          title: 1,
          danceability: 1,
          energy: 1,
          mode: 1,
          acousticness: 1,
          tempo: 1,
          duration_ms: 1,
          num_sections: 1,
          num_segments: 1,
          review: 1,
        },
      },
    ];

    const playlistData = await dbService.aggregateData(
      "PlaylistModel",
      aggregate
    );

    let totalSong = await dbService.recordsCount("PlaylistModel", filter);

    return { playlistData, totalSong };
  } catch (error) {}
};
