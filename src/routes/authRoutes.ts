import  express from 'express';
import {hello, login, register} from "../controllers/authentication.Controller";
import {authMiddleware, authorize} from "../middlewares/authMiddleware";
import {Request,Response} from "express";
import passport from "passport";
import {generateToken} from "../utils/token";
import {TokenPayload} from "../common/interface";

const router = express.Router();
router.get('/hello',hello)
router.post('/register', register);
router.post('/simple/login', login);
router.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate('local', { session: false }, (err: any, user: TokenPayload, info: { message: string; }) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!user) return res.status(401).json({ message: info?.message || 'Authentication failed' });

        // Generate JWT on successful authentication
        const token = generateToken({ id: user.id, email: user.email,username:user.username, role: user.role });
        res.json({ message: 'Logged in successfully', token });
    })(req, res, next);
});

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
        const user = req.user as any;
        const token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        res.json({ message: 'Logged in successfully with Google', token });
    }
);



router.get('/admin', authMiddleware, authorize(['admin']), (req:Request, res:Response) => {
    res.json({ message: 'Welcome, Admin!' });
});

export default router;
