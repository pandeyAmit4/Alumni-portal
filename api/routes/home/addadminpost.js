const Post = require("../../models/Post");
const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        console.log("adminpsot");
        const { question, imageLink } = req.body;
        let userid = req.user.id;
        console.log("kkokweg");
        let newpost;
        newpost = await new Post({
            imageLink,
            question: question,
            owner: userid,
            isAdmin: true, //this means adminpost ,admins post can also have isadmin false so that time admin is normal user from feed tab
        });
        await newpost.save();
        return res.send({ success: true, data: "added post : admin" });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
