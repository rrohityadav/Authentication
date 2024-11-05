// config/passportConfig.ts
import passport from 'passport';
import { initializeLocalStrategy } from './localStrategy';
import { initializeGoogleStrategy } from './googleStrategy';
import User from "../../models/user";

export const initializePassport = () => {
    initializeLocalStrategy();
    initializeGoogleStrategy();

    passport.serializeUser((user: any, done) => done(null, user.id));
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
