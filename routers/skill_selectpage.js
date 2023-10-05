const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const skill_selectpage_controller = require("../Controllers/skill_selectpage_controller");
const schedulepage = require("../Controllers/schedulepage_controller");
const Questionpaper = require("../models/questiondb");
const Login=require("../Controllers/Login_controller");
///skill select page

/**
 * Author: Baranidharan S
 * Usage:
 */

//To show the Questions Based on the Skills Selected
router.post("/questionfind", skill_selectpage_controller.question_byskills);

// Adding skills to the db
router.post("/skillnames", skill_selectpage_controller.post_skills);

//To store ManagerName to the db

router.post("/mnames", skill_selectpage_controller.post_managernames);

// Displaying Skill names
router.get("/getskill", skill_selectpage_controller.get_skills);

//To post the aws Question to db
router.post("/awsquestion", skill_selectpage_controller.post_awsquestion);

// To post java questions to the db
router.post("/javaquestion", skill_selectpage_controller.post_javaquestion);


router.post("/java_8_question", skill_selectpage_controller.post_java_8_question);

router.post("/GraphQL_question", skill_selectpage_controller.post_GraphQL_question);

router.post("/Nodejs_question", skill_selectpage_controller.post_Nodejs_question);

router.post("/SpringBoot_question", skill_selectpage_controller.post_SpringBoot_question);


//To store the selected questions to the db
router.post("/questions", skill_selectpage_controller.storequestions);

//To find the Latest Version
router.post("/latest-version", skill_selectpage_controller.latest_version);

//27thSeptember Login decrypt and role based permissions.

router.post("/authenticate",Login.authenticate);

router.post("/forgotpassword",Login.forgotpassword);

/**
 * Author: Sapnashree Saravanan
 * Usage:
 */

////schedule page

//Displaying manager name

router.get("/getmanagername", skill_selectpage_controller.get_managername);

//If Manager name is selected the create button will be enabled

router.post("/select-manager", schedulepage.create_button_enable);

//To store the entire row in db
router.post("/add-manager", schedulepage.post_table_content);

//To search mangername and skills to get the previously entered filename and managername

router.post("/search", schedulepage.searchManager);

//To get the already stored questons Filename and ManagerName

router.get("/existinguser", schedulepage.existing_user_data);

/**
 * Author: Kabilan
 * Usage:
 */

// To get the data after clicking view icon by filename
router.post("/viewdata", schedulepage.view_question_paper);

//to fetch the single filename
router.get("/view_fetchData", schedulepage.view_fetch);

//edit questions

router.post("/edit_questions", schedulepage.edit_questions);

/**
 * Author: Aishwarya
 * Usage:
 */

//edit icon
router.get("/getselectedSkill_Question", schedulepage.getselectedSkill_Question);

//To store the candidate list

router.post("/add-candidate", schedulepage.Candidatepage);


//To get the existing candidate list

router.get("/existingcandidate", schedulepage.existing_candidate_list);

//26.9.2023 post signup page

router.post("/postsignup", Login.signup);

router.post("/signin",Login.signin)

module.exports = router;
