import axios from 'axios';
import config from "config";
import PostmarkService from '../../services/PostmarkService';
import EmailTemplateService from '../../services/EmailTemplateService';
import Chance from 'chance';

const chance = new Chance();

describe('PostmarkService', () => {
    let payload, seller, options;
    beforeEach(() => {
        seller = {id: "sellerId", name: "bruce wayne", email: "bruce@wayne.com"};
        payload = {
            seller: seller.id
        };

        options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Postmark-Server-Token": config.get('postmark.serverToken')
            }
        };

        spyOn(axios, 'get').and.returnValue({
            data: seller
        });
        spyOn(axios, 'post');
    });

    describe('sendInstallEmail', () => {
        it('should send email to picThrive for installation', async () => {
            let emailTemplate = chance.word();
            spyOn(EmailTemplateService, 'installEmailTemplate').and.returnValue(emailTemplate);

            await PostmarkService.sendInstallEmail(payload);

            expect(axios.get).toHaveBeenCalledWith(`${config.get("xola.url")}/api/sellers/${seller.id}`);
            let postmarkUrl = config.get("postmark.url") + "/email";
            expect(EmailTemplateService.installEmailTemplate).toHaveBeenCalledWith(
                seller,
                config.get('postmark.email.from'),
                config.get('postmark.email.to'),
                config.get('postmark.email.replyTo')
            );
            expect(axios.post).toHaveBeenCalledWith(postmarkUrl, emailTemplate, options);
        });
    });

    describe('sendUninstallEmail', () => {
        it('should send email to picThrive for uninstallation', async () => {
            let emailTemplate = chance.word();
            spyOn(EmailTemplateService, 'uninstallEmailTemplate').and.returnValue(emailTemplate);

            await PostmarkService.sendUninstallEmail(payload);

            expect(axios.get).toHaveBeenCalledWith(`${config.get("xola.url")}/api/sellers/${seller.id}`);
            let postmarkUrl = config.get("postmark.url") + "/email";
            expect(EmailTemplateService.uninstallEmailTemplate).toHaveBeenCalledWith(
                seller,
                config.get('postmark.email.from'),
                config.get('postmark.email.to'),
                config.get('postmark.email.replyTo')
            );
            expect(axios.post).toHaveBeenCalledWith(postmarkUrl, emailTemplate, options);
        });
    });
});
