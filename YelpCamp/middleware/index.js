let Campground = require("../models/campground");
let Comment = require("../models/comment");

let middlewareOjb = {};

middlewareOjb.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });        
    } else {
        console.log('YOU NEED TO BE LOGGED IN TO DO THAT!!!');
        res.redirect('back');
    }
};

middlewareOjb.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });        
    } else {
        console.log('YOU NEED TO BE LOGGED IN TO DO THAT!!!');
        res.redirect('back');
    }
};

middlewareOjb.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = middlewareOjb;