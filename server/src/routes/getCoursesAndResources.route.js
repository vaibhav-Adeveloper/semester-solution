import { Router } from "express";
import { getCoursesOnBasisOfBranch } from "../controllers/getCourse.controller.js";
import { getResourcesOnBasisOfBranchAndSemester } from "../controllers/getResource.controller.js";

const router = Router();

router.route("/courses").post(getCoursesOnBasisOfBranch);
router.route("/resources").post(getResourcesOnBasisOfBranchAndSemester);

export default router;