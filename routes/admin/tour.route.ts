import { Router } from "express";
const router: Router = Router();
import multer, { memoryStorage } from "multer";

import * as controller from "../../controllers/admin/tour.controller";
import { uploadMulti } from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.array("images", 10),
  uploadMulti,
  controller.createPost,
);

export default router;
