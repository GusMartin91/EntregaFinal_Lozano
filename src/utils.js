import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall = (estrategia) => function (req, res, next) {
    passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }
        if (!user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({
                error: `${info.message ? info.message : info.toString()}`,
                detalle: `${info.detalle ? info.detalle : "-"}`
            })
        }

        req.user = user
        return next()
    })(req, res, next);
}

