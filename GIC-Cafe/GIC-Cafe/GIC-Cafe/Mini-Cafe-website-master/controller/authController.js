const bcrypt = require("bcryptjs");
const User = require("../models/users");

exports.signIn = (req, res) => {
  res.render("signin", { error: false });
};
exports.signUp = (req, res) => {
  res.render("signup",{error:false});
};
exports.dashboard = (req, res) => {
  res.render("Homepage");
};
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username is exist
  User.find({ username: username })
    .then((result) => {
      if (result) {
        // if user exist, check given password with the encrypted password
        bcrypt.compare(
          password,
          result[0].password,
          function (err, passwordIsMatch) {
            if (passwordIsMatch) {
              // if password is correct, return success, with cookie save
              console.log("Here is user result", result);
              res.cookie("username", username, { expire: 3600 * 1000 });
              res.cookie("userID", result[0]._id, { expire: 3600 * 1000 });
              res.cookie("logged-time", new Date().toISOString(), {
                expire: 3600 * 1000,
              });
              res.redirect("/");
            } else {
              // else return fail
              res.render("signin", {
                error: true,
                message: "Password incorrect",
              });
            }
          }
        );
      } else {
      }
    })
    .catch((err) => {
      console.log(
        res.render("signin", {
          error: true,
          message: "User does not exist! Please Register",
        })
      );
    });
};
exports.register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const date = new Date();
  const salt = bcrypt.genSaltSync(10);
  User.find({ username: username })
    .then((result) => {
      console.log(result);
      if (result.length > 0){
        res.render("signup", { error: true, message: "User already existed!" });
      } else {
        const user = new User({
          username: username,
          password: bcrypt.hashSync(password, salt),
          registerAt: date.toISOString(),
        })
          .save()
          .then((result) => {
            res.redirect("/signin");
          })
          .catch((err) => {
            res.render("signup", { message: "Signup fail, try again" });
          });
      }
    }
  )
}
  // const userExisted = User.exists({ username: req.body.username });
  // console.log(userExisted);

  // if (!userExisted) {
  //   const user = new User({
  //     username: username,
  //     password: bcrypt.hashSync(password, salt),
  //     registerAt: date.toISOString(),
  //   })
  //     .save()
  //     .then((result) => {
  //       res.redirect("/signin");
  //     })
  //     .catch((err) => {
  //       res.render("signup", { message: "Signup fail, try again" });
  //     });
  // } else {
  //   res.render("signup", { error: true, message: "User already existed!" });
  // }
/*exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username is exist
  User.find({ username: username })
    .then((result) => {
      if (result) {
        // if user exist, check given password with the encrypted password
        bcrypt.compare(
          password,
          result[0].password,
          function (err, passwordIsMatch) {
            if (passwordIsMatch) {
              // if password is correct, return success, with cookie save
              console.log("Here is user result", result);
              res.cookie("username", username, { expire: 3600 * 1000 });
              res.cookie("userID", result[0]._id, { expire: 3600 * 1000 });
              res.cookie("logged-time", new Date().toISOString(), {
                expire: 3600 * 1000,
              });
              res.redirect("/");
            } else {
              // else return fail
              res.render("signin", {
                error: true,
                message: "Password incorrect",
              });
            }
          }
        );
      } else {
      }
    })
    .catch((err) => {
      console.log(
        res.render("signin", {
          error: true,
          message: "User does not exist! Please Register",
        })
      );
    });
};
/*exports.register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const date = new Date();
  const salt = bcrypt.genSaltSync(10);

  // Check if username is exist
  User.exists({ username: username })
    .then((result) => {
      if (!result) {
        // if user not exist, user can register
        const user = new User({
          username: username,
          password: bcrypt.hashSync(password, salt),
          registerAt: date.toISOString()})
          res.render("signin", {
            error: true,
            message: "User has created"
            .save()
          });
          console.log(username);
      } else {
              // else return fail
              res.render("signup", {
                error: true,
                message: "User already Exist!",
              });
            }
          }
        )
        .catch((err) => {
         console.log(
        res.render("signup", {
          error: true,
          message: "User does already exist! ",
        })
      );
    });
};*/
