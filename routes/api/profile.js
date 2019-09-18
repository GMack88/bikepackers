const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @ route          GET api/profile/me
// @ description    get current user's profile
// @ access         Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "This user has no profile" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @ route          POST api/profile
// @ description    Create or update user's profile
// @ access         Private
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
      disciplines,
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
    if (disciplines) {
      profileFields.disciplines = disciplines
        .split(",")
        .map(discipline => discipline.trim());
    }

    // build a social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //   update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //   create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ route          Get api/profile
// @ description    Get all profiles
// @ access         Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @ route          Get api/profile/user/:user_id
// @ description    Get profile by user ID
// @ access         Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});
// @ route          Delete api/profile
// @ description    GDelete profile user and posts
// @ access         Private

router.delete("/", auth, async (req, res) => {
  try {
    //   @todo - remove users posts

    //   remove profile

    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "Account deleted" });
  } catch (error) {
    console.error(error.message);
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
router.delete("/racingResume/:racingResume_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.racingResume
      .map(item => item.id)
      .indexOf(req.params.racingResume_id);

    profile.racingResume.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
