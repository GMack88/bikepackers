const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  //   company
  website: {
    type: String
  },
  location: {
    type: String
  },
  //   formerly status
  disciplines: {
    type: [String],
    required: true
  },
  //   skills
  bio: {
    type: String
  },
  //   formerly githubusername
  stravaurl: {
    type: String
  },
  //   formerly experience
  racingResume: [
    {
      eventDistance: {
        type: String,
        required: true
      },
      eventName: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      date: {
        type: Date,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  favoriteRoutes: [
    {
      routeName: {
        type: String
      },
      distance: {
        type: String
      },
      difficultyRating: {
        type: String
      },
      link: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    strava: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
