import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from "../../models/user";

export const initializeGoogleStrategy = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile,accessToken)
                try {
                    let user = await User.findOne({ googleId: profile.id });
                    if (!user) {
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails ? profile.emails[0].value : '',
                            googleId: profile.id,
                        });
                    }
                    done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
