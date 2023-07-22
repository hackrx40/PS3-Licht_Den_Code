const User = require("../models/user.model");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { Blob } = require("buffer");

const BASE_URL = "https://8a2d-35-230-62-233.ngrok-free.app";

const signup = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.headers;
    const imageFileName = req.file ? req.file.filename : null;
    console.log(imageFileName);
    const filePath = path.join(
      "E:/Bajaj/server_backup/faceImages",
      imageFileName
    );
    try {
      const formData = new FormData();
      const fileData = fs.readFileSync(filePath);
      const fileBlob = new Blob([fileData]);

      formData.append("img", fileBlob, "image.jpg");

      const response = await axios.post(`${BASE_URL}/face-detect/`, formData, {
        headers: formData.getHeaders
          ? formData.getHeaders()
          : formData.getHeaders,
      });

      console.log(response.data);
      if (response) {
        const prediction = response.data.prediction;
        if (prediction === "Done!!!") {
          // Image verification succeeded, save the user details
          let newUser = new User({
            email,
            password,
            first_name,
            last_name,
            face: imageFileName,
          });
          await newUser.save();

          res.status(201).json({
            message: "User created!",
          });
        } else {
          throw new Error(prediction);
        }
      } else {
        throw new Error("Image verification failed");
      }
    } catch (error) {
      console.error("Error processing file:", error.message);
      res.status(400).json({
        message: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  console.log(req.headers);
  try {
    const user = await User.findByCredentials(
      req.headers.email,
      req.headers.password
    );
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }
    const testName = req.file ? req.file.filename : null;
    const testImage = path.join(
      "E:/Bajaj/server_backup/faceImages",
      testName
    );
    const knownName = user.face;
    const knownImage = path.join(
      "E:/Bajaj/server_backup/faceImages",
      knownName
    );
    try {
      const formData = new FormData();
      const knownImageData = fs.readFileSync(knownImage);
      const knownImageBlob = new Blob([knownImageData]);
      formData.append("known_face", knownImageBlob, "known_face.jpg");

      const testImageData = fs.readFileSync(testImage);
      const testImageBlob = new Blob([testImageData]);
      formData.append("test_face", testImageBlob, "test_face.jpg");

      const response = await axios.post(`${BASE_URL}/face-match/`, formData, {
        headers: formData.getHeaders
          ? formData.getHeaders()
          : formData.getHeaders,
      });

      console.log(response.data);
      if (response.data.prediction) {
        var isLoggedIn = false;
        const token = await user.generateAuthToken();
        /*         var isFirstHitToSend = isFirstHit;
        if (isFirstHit) {
          console.log("This is the first hit of the login endpoint!");
          isFirstHit = false;
        } */
        if (user.tokens.length === 1) {
          isLoggedIn = true;
        }
        res.status(200).json({
          message: "Successfully logged in!",
          isLoggedIn,
          user,
          token,
        });
      } else {
        throw new Error("Image matching failed");
      }
    } catch (error) {
      console.error("Error matching faces:", error.message);
      res.status(400).json({
        message: error.message,
      });
    } finally {
      // Remove the temporary test image file
      if (testName) {
        fs.unlinkSync(testImage);
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const logout = async (req,res) => {
	try {
		const token = req.token;
        const currentUser = req.user;

        currentUser.tokens = currentUser.tokens.filter((usertoken) => {
            return usertoken.token !== token;
        });

        await currentUser.save();

        res.status(200).json({
            message: 'Logged Out Successfully'
        });
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
}

module.exports = {
  signup,
  login,
  logout
};
