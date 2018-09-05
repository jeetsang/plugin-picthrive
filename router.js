import express from 'express';
import WebhookController from './controllers/WebhookController';

const router = express.Router();

function wrapAsync(fn) {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
}

router.post('/webhooks', wrapAsync(WebhookController.processWebhook));

export default router;
