const { addMessage, getMessage } = require('../controller/messageController');

const router = require('express').Router();

router.post("/addmsg",addMessage);
router.post("/getmsg",getMessage);
module.exports = router;