import { Strategy as LocalStrategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import User from "../../models/user";
import passport from "passport";

export const initializeLocalStrategy = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    // Find user by email
                    const user = await User.findOne({ email });
                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }

                    // Verify password
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, { message: 'Incorrect password' });
                    }

                    // Authentication successful
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};
