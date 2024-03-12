const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");

// testimonials
// subskills

const profileDetailsSchema = new Schema(
  {
      skills: {
          type: [String],
          required: true
      },
      subskills: {
          type: [String],
          required: true
      },
      bio: {
          type: String,
          required: true
      },
      portFolio: {
          type: [{
              name: {
                  type: String,
                  required: true
              },
              duration: {
                  type: String,
                  required: true
              },
              price: {
                  type: Number,
                  required: true
              },
              description: {
                  type: Number,
                  required: true
              },
              externalLinks: {
                  type
                      : [String],
                  required: true
              },
              testimonials: {
                  type: [String],
                  required: true
              }
          }],
          required: true
      }
  },
  { timestamps: true }
);

const ProfileDetailsModel = mongoose.model("profileDetails", profileDetailsSchema);

module.exports = {
  ProfileDetailsModel,
  profileDetailsSchema
};
