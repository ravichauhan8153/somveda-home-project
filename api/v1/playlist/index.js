import { Router } from "express";
import commonResolver from "../../../utilities/commonResolver";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = new Router();

//=================== Schema ===================
import { getPlayListSchema } from "./getPlaylist";
import { addReviewSchema } from "./addReview";

//=================== Services ===================
import { getPlaylist } from "../../../services/playlist/getPlaylist";
import { uploadFile } from "../../../services/playlist/uploadFile";
import { addReview } from "../../../services/playlist/addReview";

//=================== Route ===================

router.post(
  "/getPlaylist",
  commonResolver.bind({
    modelService: getPlaylist,
    isRequestValidateRequired: true,
    schemaValidate: getPlayListSchema,
  })
);

router.post(
  "/addReview",
  commonResolver.bind({
    modelService: addReview,
    isRequestValidateRequired: true,
    schemaValidate: addReviewSchema,
  })
);

router.post("/uploadFile",upload.any(), uploadFile);

export default router;
