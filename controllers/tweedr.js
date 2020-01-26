const sha256 = require('js-sha256')
const SALT = "mr poopy butt hole"

module.exports = (db) => {



  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let registerPage = (request, response) => {
    response.render('register');
  };

  let registerUser = (req, res) => {

    const values = req.body

    db.tweedr.registerNewUser((err, result) => {
      res.render('login', result)
    }, values)
    //END registerUser
  }

  let loginPage = (req, res) => {
    res.render('login')
  }

  let loginUser = (req, res) => {

    const values = req.body

    db.tweedr.loginUser((err, result, tweets) => {

      if (typeof result === "object"){
        const data = {
          tweets: tweets
        }
        res.cookie("user_id", result.id)
        res.cookie("loggedIn", sha256(SALT+result.id))
        res.render('index', data)

      } else {
        res.clearCookie("user_id")
        res.clearCookie("loggedIn")
        res.send(result)
      }
    }, values)
    //END loginUser
  }

  let mainPage = (req, res) => {
      db.tweedr.showTweets((err, result) => {
        const data = {
          tweets: result
        }
        res.render('index', data)
      })
  }
  // db.pokemon.registerUser((error, user) => {
  //   response.render('register', { user });
  // });

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    registerPage: registerPage,
    registerUser: registerUser,
    loginPage: loginPage,
    loginUser: loginUser,
    mainPage: mainPage
  };

}
