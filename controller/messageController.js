const Messages = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.status(200).json({ msg: "Message added sucessfully" });
    return res
      .status(412)
      .json({ msg: "Faild to add message to the database" });
  } catch (err) {
    next(err);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.status(200).json(projectedMessages);
  } catch (err) {
    next(err);
  }
};
