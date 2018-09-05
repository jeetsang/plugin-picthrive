import PostmarkService from '../services/PostmarkService';
import config from "config";
import axios from "axios";

const WebhookController = {
    processWebhook: async (req, res) => {
        const {eventName, payload} = req.body;
        switch (eventName) {
            case 'installation.create':
                PostmarkService.sendInstallEmail(payload);
                break;
            case 'installation.delete':
                PostmarkService.sendUninstallEmail(payload);
                break;
            case 'order.create' :
            case 'order.update':
                axios.post(config.get('picthrive.url'), req.body);
                break;
        }
        return res.status(200).send();
    }
};
export default WebhookController;
