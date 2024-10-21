import { User, Login, channelData, comment } from "../Model/User.model.js";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const channelIdUser = new mongoose.Types.ObjectId();
export async function createUser(req, res) {
  const {
    videoId,
    title,
    thumbnailUrl,
    description,
    channelId,
    uploader,
    views,
    likes,
    dislikes,
    uploadDate,
    comments,
  } = req.body;
  const processedComments = comments.map((comment) => ({
    ...comment,
    commentId: new mongoose.Types.ObjectId(), // Generate unique ObjectId for each comment
  }));

  // Format the current date to "YYYY-MM-DD"
  const uploadDateOnly = new Date().toISOString().split("T")[0];

  const user = new User({
    videoId: new mongoose.Types.ObjectId(),
    title: title,
    thumbnailUrl: thumbnailUrl,
    description: description,
    channelId: channelIdUser,
    uploader: uploader,
    views: views,
    likes: likes,
    dislikes: dislikes,
    uploadDate: uploadDateOnly,
    comments: processedComments,
  });
  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function fetchUser(req, res) {
  const user = await User.find();
  if (!user) {
    return res.status(404).json({ message: "No users found" });
  }
  try {
    res.status(201).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function fetchUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { title, thumbnailUrl, description, uploader, comments } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        title,
        thumbnailUrl,
        description,
        uploader,
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "User updated Successfully", updateUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not deleted" });
    }
    res.status(200).json({ message: "User deleted successfully", deleteUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function register(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Login({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).send("User registered");
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await Login.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ token, username: user.username });
  } else {
    res.status(401).send("Invalid credentials");
  }
}

export async function channel(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingChannel = await channelData.findOne({
      channelId: user.channelId,
    });
    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel already exists for this user" });
    }
    const { channelName, description, channelBanner, subscribers, videos } =
      req.body;
    const channel = new channelData({
      channelName: channelName,
      owner: user.uploader,
      description: description,
      channelBanner: channelBanner,
      subscribers: subscribers,
      videos: videos,
      channelId: user.channelId,
    });
    const newChannel = await channel.save();
    if (!newChannel) {
      return res.status(400).json({ message: "Channel not created" });
    }
    res
      .status(200)
      .json({ message: "Channel created successfully", channel: newChannel });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
}
export async function fetchChannel(req, res) {
  try {
    const channels = await channelData.find();
    if (!channels) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).send(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function fetchChannelById(req, res) {
  const { channelId } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(channelId);
    const user = await channelData.findOne({ channelId: objectId });
    if (!user) {
      return res.status(404).json({ message: "channel not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function fetchUserByChannelId(req, res) {
  const { channelId } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(channelId);
    const user = await User.findOne({ channelId: objectId });
    if (!user) {
      return res.status(404).json({ message: "channel id not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// Assuming you have a User model for videos

export async function fetchComments(req, res) {
  const { videoId } = req.params;

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find the comment within the video's comments array by commentId

    // Send the comment if found
    res.status(200).json(video.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function commentAdd(req, res) {
  const { videoId } = req.params;

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    const addComment = new comment({
      userId: req.body.userId,
      text: req.body.text,
    });
    video.comments.push(addComment);
    await video.save();
    // Find the comment within the video's comments array by commentId
    res.status(201).send(addComment);
    // Send the comment if found
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function commentEdit(req, res) {
  const { videoId, commentId } = req.params; // commentId should be passed as a parameter

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Convert commentId to ObjectId for comparison
    const comment = video.comments.find(
      (c) => c.commentId.toString() === commentId
    );

    // Send the comment if found
    if (!comment) {
      return res.status(404).json({ message: "Comment not found", comment });
    }

    // Update the comment's text
    comment.text = req.body.text; // Assuming the new text is sent in the request body

    // Save the updated video document
    await video.save();

    // Respond with the updated comment
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function commentDelete(req, res) {
  const { videoId, commentId } = req.params; // commentId should be passed as a parameter

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Convert commentId to ObjectId for comparison
    const comment = video.comments.find(
      (c) => c.commentId.toString() === commentId
    );

    if (comment === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the comments array
    video.comments.splice(comment, 1);

    // Save the updated video document
    await video.save();

    // Respond with a success message or the updated comments list
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
