import axios from "axios";
import Logger from '../Logger';
import createError from 'http-errors';
import config from 'config';
import EmailTemplateService from '../services/EmailTemplateService';

const handleXolaError = (e, message) => {
    Logger.error(message, {message: e.message, status: e.statusCode});
    throw createError(500);
};

const getSellerPublicInfo = async function(sellerId) {
    let url = `${config.get("xola.url")}/api/sellers/${sellerId}`;
    return axios.get(url);
};

const sendEmail = async (emailData) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Postmark-Server-Token": config.get('postmark.serverToken')
    };

    try {
        let url = config.get("postmark.url") + "/email";
        axios.post(url, emailData, {headers: headers});

    } catch (e) {
        handleXolaError(e, 'Error posting email to postmark');
    }
};

const PostmarkService = {
    sendInstallEmail: async (payload) => {
        const {data: seller} = await getSellerPublicInfo(payload.seller);
        const emailData = EmailTemplateService.installEmailTemplate(
            seller,
            config.get('postmark.email.from'),
            config.get('postmark.email.to'),
            config.get('postmark.email.replyTo')
        );
        sendEmail(emailData);
    },
    sendUninstallEmail: async (payload) => {
        const {data: seller} = await getSellerPublicInfo(payload.seller);
        const emailData = EmailTemplateService.uninstallEmailTemplate(
            seller,
            config.get('postmark.email.from'),
            config.get('postmark.email.to'),
            config.get('postmark.email.replyTo')
        );
        sendEmail(emailData);
    }
};

export default PostmarkService;
