const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("location", "Location is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      website,
      location,
      bio,
      stravaurl,
      youtube,
      facebook,
      twitter,
      instagram
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (stravaurl) profileFields.stravaurl = stravaurl;
    if (youtube) profileFields.youtube = youtube;
    if (facebook) profileFields.facebook = facebook;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;

    // build a social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @ route          Put api/profile/racingResume
// @ description    Add profile racing resume
// @ access         Private

router.put(
  "/racingResume",
  [
    auth,
    [
      check("eventName", "Event name is required")
        .not()
        .isEmpty(),
      check("description", "Event description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventDistance, eventName, location, date, description } = req.body;

    const newResume = {
      eventDistance,
      eventName,
      location,
      date,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.racingResume.unshift(newResume);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ route          Delete api/profile/racingResume/:racingResume_id
// @ description    Delete a racingResume from profile
// @ access         Private

// router.delete("/racingResume/:racingResume_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     // get remove index
//     const removeIndex = profile.racingResume
//       .map(item => item.id)
//       .indexOf(req.params.racingResume_id);

//     profile.racingResume.splice(removeIndex, 1);
//     await profile.save();

//     res.json(profile);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });
//  ******************Interchangeable? ^>
router.delete("/racingResume/:racingResume_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const raceIds = foundProfile.racingResume.map(race => race._id.toString());

    const removeIndex = raceIds.indexOf(req.params.race_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      console.log("raceIds", raceIds);
      console.log("typeof raceIds", typeof raceIds);
      console.log("req.params", req.params);
      console.log("removed", raceIds.indexOf(req.params.race_id));
      foundProfile.racingResume.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @ route          Put api/profile/favoriteRoutes
// @ description    Add profile racing resume
// @ access         Private

router.put(
  "/favoriteRoutes",
  [
    auth,
    [
      check("routeName", "Route Name is required")
        .not()
        .isEmpty(),
      check("distance", "Distance is required")
        .not()
        .isEmpty(),
      check("difficultyRating", "Difficulty Rating is required")
        .not()
        .isEmpty(),
      check("link", "Link is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { routeName, distance, difficultyRating, link } = req.body;

    const newRoute = {
      routeName,
      distance,
      difficultyRating,
      link
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.favoriteRoutes.unshift(newRoute);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ route          Delete api/profile/favoriteRoutes/:favRoute_id
// @ description    Delete a favoriteRoutes from profile
// @ access         Private
router.delete("/favoriteRoutes/:favRoute_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.favoriteRoutes
      .map(item => item.id)
      .indexOf(req.params.favRoute_id);

    profile.favoriteRoutes.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
