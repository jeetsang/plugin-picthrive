const EmailTemplateService = {
    installEmailTemplate: (seller, from, to, replyTo) => {
        let htmlBody = `<p>Hello PicThrive,</p>
            <p> 
            A seller on Xola has <strong>turned on</strong> the PicThrive integration. Yay!
            </p>
            <p>
            <strong>Name:</strong> ${seller.name}<br>
            <strong>Email:</strong> ${seller.email}<br>
            <strong>Seller ID:</strong> ${seller.id}
            </p>
            <p>
            Xola will now start firing webhooks for any new and modified orders for this seller.
            </p>
            <p>
            If this seller is already a PicThrive customer, please ensure that their seller ID is associated<br>
            with their account so that the webhooks are successfully processed.
            </p>
            <p>
            
            </p>
            If this seller is not a PicThrive customer, please reach out to them.
            <p>
            Thanks!<br>
            Team Xola
            </p>`;
        let subject = `A seller on Xola has turned on the PicThrive integration`;
        return {
            "From": from,
            "To": to,
            "Subject": subject,
            "HtmlBody": htmlBody,
            "ReplyTo": replyTo
        };
    },
    uninstallEmailTemplate: (seller, from, to, replyTo) => {
        let htmlBody = `<p>Hello PicThrive,</p>
            <p> 
            A seller on Xola has <strong>turned off</strong> the PicThrive integration.
            </p>
            <p>
            <strong>Name:</strong> ${seller.name}<br>
            <strong>Email:</strong> ${seller.email}<br>
            <strong>Seller ID:</strong> ${seller.id}
            </p>
            <p>
            Xola will stop firing webhooks for any subsequent orders for this seller.
            </p>
            <p>
            Thanks!<br>
            Team Xola
            </p>`;
        let subject = `A seller on Xola has turned off the PicThrive integration.`;
        return {
            "From": from,
            "To": to,
            "Subject": subject,
            "HtmlBody": htmlBody,
            "ReplyTo": replyTo
        };
    }
};

export default EmailTemplateService;
