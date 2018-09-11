import axios from 'axios';
import PostmarkService from '../../services/PostmarkService';
import WebhookController from '../../controllers/WebhookController';
import config from "config";

describe('WebhookController', () => {
    describe('processWebhook', () => {
        let req, res;
        beforeEach(() => {
            req = {
                body: {
                    eventName: "",
                    payload: ""
                }
            };

            res = {
                status: () => {
                },
                send: () => {
                }
            };
            spyOn(res, 'status').and.returnValue(res);
            spyOn(res, 'send');
        });

        afterEach(() => {
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalled();
        });

        it('should send email to picThrive on installation.create event', async () => {
            spyOn(PostmarkService, 'sendInstallEmail');
            req.body.eventName = "installation.create";

            await WebhookController.processWebhook(req, res);

            expect(PostmarkService.sendInstallEmail).toHaveBeenCalledWith(req.body.payload);
        });

        it('should send email to picThrive on installation.delete event', async () => {
            spyOn(PostmarkService, 'sendUninstallEmail');
            req.body.eventName = "installation.delete";

            await WebhookController.processWebhook(req, res);

            expect(PostmarkService.sendUninstallEmail).toHaveBeenCalledWith(req.body.payload);
        });

        it('should post order.create event to picThrive', async () => {
            spyOn(axios, 'post');
            req.body.eventName = "order.create";

            await WebhookController.processWebhook(req, res);

            expect(axios.post).toHaveBeenCalledWith(config.get('picthrive.url'), req.body);
        });

        it('should post order.create event to picThrive', async () => {
            spyOn(axios, 'post');
            req.body.eventName = "order.update";

            await WebhookController.processWebhook(req, res);

            expect(axios.post).toHaveBeenCalledWith(config.get('picthrive.url'), req.body);
        });
    });
});
