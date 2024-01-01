import passport from "passport";
// import local from "passport-local";
import { usersManager } from "../dao/models/User.js";
import { isValidPassword } from "../utils/hashing.js";
import GitHubStrategy from "passport-github2";
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./config.js";

// const LocalStrategy = local.Strategy;
// const initializePassport = () => {
//   passport.use(
//     "login",
//     new LocalStrategy(
//       { usernameField: "email" },
//       async (username, password, done) => {
//         try {
//           const user = await usersManager.findOne({ email: username });
//           // Log statements for debugging
//           // console.log("Entered Password:", password);
//           // console.log(user);
//           if (!user) {
//             console.log("User does not exist");
//             return done(null, false, { message: "User does not exist" });
//           }
//           if (!isValidPassword(password, user.password)) {
//             // console.log("Invalid Password");
//             return done(null, false);
//           }
//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
// };

const initializePassport = () => {
  passport.use(
    'github',
    // @ts-ignore
    new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID, // Replace with your GitHub client ID
      clientSecret: GITHUB_CLIENT_SECRET, // Replace with your GitHub client secret
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const user = await usersManager.findOne({ email: profile._json.email });

        if (!user) {
          let newUser = {
            first_name: profile._json.name,
            last_name: '', //Ask user for last name once logged in (not included in github profile)
            email: profile._json.email,
            age: '', //Ask user once logged in
            password: '', //Ask user once logged in
          };

          let result = await usersManager.create(newUser);
          done(null, result);
        } else {
          done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
};


passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default initializePassport;
