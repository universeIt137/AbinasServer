let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken"); // Use default import
let httpResponse = require("../../utils/httpResponse.js");
let authServices = require("../../services/ngo/auth.service.js");
let User = require("../../models/ngo/User.js");

const httpStatus = require("http-status");
const errorResponse = require("../../utils/errorResnponse.js");
const { createToken } = require("../../utils/jwthelper.js");

// ----------------- token genarate -------------------------

// Registering a user
const signUp = async function (req, res) {
  try {
    const newUser = await authServices.createUserService(req.body);
    let tempUser; // Declare tempUser letiable here

    if (newUser) {
      let userJwtData = {
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        id: newUser._id,
      };

      const accessToken = createToken(
        userJwtData,
        "universesoft2022@accesstokensecret@12345",
        "1d"
      );

      const refreshToken = createToken(
        userJwtData,
        "universesoft2022@accesstokensecret@12345",
        "365d"
      );
      res.cookie("tokenExp", "1", {
        sameSite: "strict",
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      });

      res.cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
        expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
      });
      tempUser = Object.assign({}, newUser.toJSON(), {
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
      delete tempUser.password;

      res
        .status(200)
        .json(httpResponse("success", tempUser, "Successfully sign up"));
    } else {
      res.status(201).json(httpResponse("failed", {}, "err"));
    }
  } catch (err) {
    res.status(400).json(httpResponse("error", {}, err.message));
  }
};

const loginUser = async function (req, res) {
  try {
    const phone = req.body.phone;
    const password = req.body.password;
    const user = await User.findOne({ phone: phone });

    if (user) {
      // check if password is correct
      const auth = await bcrypt.compare(password, user.password);

      if (auth) {
        const userJwtData = {
          name: user.name,
          role: user.role,
          phone: user.phone,

          id: user._id,
        };

        const accessToken = createToken(
          userJwtData,
          "universesoft2022@accesstokensecret@12345",
          "1d"
        );

        const refreshToken = createToken(
          userJwtData,
          "universesoft2022@accesstokensecret@12345",
          "365d"
        );
        res.cookie("tokenExp", "1", {
          sameSite: "strict",
          secure: true,
          path: "/",
          expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        });

        res.cookie("token", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/",
          expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          path: "/",
          expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
        });
        const tempUser = Object.assign({}, user.toJSON(), {
          refreshToken: refreshToken,
          accessToken: accessToken,
        });
        delete tempUser.password;

        res
          .status(200)
          .json(httpResponse("sucess", tempUser, "Successfully logged in"));
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .json(httpResponse("failed", {}, "Incorrect password"));
      }
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json(
          httpResponse("failed", {}, "Employee with this phone does not exist")
        );
    }
  } catch (err) {
    res.status(400).json(httpResponse("error", err.message, {}));
  }
};

const getAllUsers = async function (req, res) {
  try {
    let users = await authServices.getAllUsersService();
    res
      .status(200)
      .json(httpResponse("sucess", "Successfully logged in", users));
  } catch (error) {
    res.status(401).json(httpResponse("fail", error.message, {}));
  }
};

const logoutUser = async function (req, res) {
  try {
    res.clearCookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    res.clearCookie("refreshToken", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    res.clearCookie("tokenExp", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });

    res.clearCookie("username", "", {
      path: "/",
    });
    res.clearCookie("userId", "", {
      path: "/",
    });

    res.clearCookie("role", "", {
      path: "/",
    });

    res
      .status(200)
      .json(httpResponse("success", {}, "Successfully logged out."));
  } catch (e) {
    res.status(401).json(httpResponse("fail", {}, "Logout Failed"));
  }
};

const refreshToken = async (req, res) => {
  const token = req.body.refreshToken ?? req.cookies.refreshToken;

  try {
    const result = await authServices.refreshToken(token);

    const { accessToken, refreshToken } = result;
    res.cookie("tokenExp", "1", {
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    });
    res.cookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
    });

    res
      .status(200)
      .json(httpResponse("success", result, "Successfully login...."));
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .json(
        httpResponse(
          "failed",
          {},
          "something went wrong! please try again with valid token"
        )
      );
  }
};

module.exports = {
  signUp,
  loginUser,
  getAllUsers,
  logoutUser,
  refreshToken,
};
