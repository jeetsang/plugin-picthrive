import PostmarkService from '../services/PostmarkService';
import config from "config";
import axios from "axios";

const WebhookController = {
    processWebhook: async (req, res) => {
        const {eventName, data} = req.body;
        switch (eventName) {
            case 'installation.create':
                PostmarkService.sendInstallEmail(data);
                break;
            case 'installation.delete':
                PostmarkService.sendUninstallEmail(data);
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
