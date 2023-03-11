const Post = require("../.././models/Post");
const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const { question, imageLink } = req.body;
        let userid = req.user.id;
        let newpost;
        newpost = await new Post({
            imageLink,
            question: question,
            owner: userid,
            isAdmin: false,
        });
        console.log("newpost! :non admin");
        await newpost.save();
        return res.send({ success: true, data: "added post" });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
