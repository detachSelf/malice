import 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // Replace `any` with your actual user object type if known
        }
    }
}
