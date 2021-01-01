const Comment = require('../models/comment');

const checkCommentOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const comment = await Comment.findById(req.params.commentId).exec();
        if (comment.user.id.equals(req.user._id)) {
            next();
        }
        else {
            req.flash("error", "User is not the owner of this comment.");
            res.redirect('back');
        }
    }
    else {
        req.flash("error", "Sign in to acccess more features.");
        res.redirect('/login');
    }
}

module.exports = checkCommentOwner;