const mongoose = require('mongoose');

// Define the Comment Schema
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 1,
    },
    commentedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Prevents creation of separate IDs for each comment
);

// Define the Blog Post Schema
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    likes: {
      type: [String], // Stores usernames of users who liked the post
      default: [],
    },
    comments: {
      type: [commentSchema], // Embeds multiple comments as subdocuments
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt fields
  }
);

// Create and export the Blog Post model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
