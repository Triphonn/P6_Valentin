const Sauce = require('../models/sauce');

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((element) => {
            // 0 likes - 0 dislikes | If any User likes
            if (
                !element.usersLiked.includes(req.body.userId) &&
                req.body.like === 1
            ) {
                // Updating sauceLikes in DB
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        // Adding UserID in SaucesLiked array (to prevent multiple likes from same users)
                        $push: { usersLiked: req.body.userId },
                    }
                )
                    // Result = 1 likes - 0 dislikes
                    .then(() => {
                        res.status(201).json({ message: 'Sauce Likée' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
            // 1 likes - 0 dislikes | If any User likes again (already liked sauce)
            if (
                element.usersLiked.includes(req.body.userId) &&
                req.body.like === 0
            ) {
                // Updating sauceLikes in DB
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        // Deleting UserID in SaucesLiked array
                        $pull: { usersLiked: req.body.userId },
                    }
                )
                    // Result = 0 likes - 0 dislikes
                    .then(() => {
                        res.status(201).json({ message: 'Like retiré' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
            // 0 likes - 1 dislikes | If any User dislikes
            if (
                !element.usersDisliked.includes(req.body.userId) &&
                req.body.like === -1
            ) {
                // Updating sauceDislikes in DB
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        // Adding UserID in SaucesLiked array (to prevent multiple likes from same users)
                        $push: { usersDisliked: req.body.userId },
                    }
                )
                    // Result = 0 likes - 1 dislikes
                    .then(() => {
                        res.status(201).json({ message: 'Sauce Dislikée' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
            // 0 likes - 0 dislikes | If any User dislikes again (already disliked sauce)
            if (
                element.usersDisliked.includes(req.body.userId) &&
                req.body.like === 0
            ) {
                // Updating sauceDislikes in DB
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        // Deleting UserID in SaucesLiked array
                        $pull: { usersDisliked: req.body.userId },
                    }
                )
                    // Result = 0 likes - 0 dislikes
                    .then(() => {
                        res.status(201).json({ message: 'Dislike Retiré' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(404).json({ error }));
};
