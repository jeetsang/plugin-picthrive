const EmailTemplateService = {
    installEmailTemplate: (seller, from, to, replyTo) => {
        let htmlBody = `<p>Hi Keith,</p>
            <p>
            Our mutual client has enabled PicThrive.<br>
            Details:<br>
            Client name: ${seller.name}<br>
            Email: ${seller.email}<br>
            Seller ID: ${seller.id}
            </p>
            <p>
            If they already have an account with PicThrive, please ignore this request. If they do not have an account with PicThrive please create the account.<br>
            The configuration for sending event details from Xola has already been completed.
            </p>
            <p>
            Thank you,<br>
            Xola
            </p>`;
        let subject = `${seller.name} enabled PicThrive on Xola`;
        return {
            "From": from,
            "To": to,
            "Subject": subject,
            "HtmlBody": htmlBody,
            "ReplyTo": replyTo
        };
    },
    uninstallEmailTemplate: (seller, from, to, replyTo) => {
        let htmlBody = `<p>Hi Keith,</p>
            <p>
            Our mutual client has disabled PicThrive.<br>
            Details:<br>
            Client name: ${seller.name}<br>
            Email: ${seller.email}<br>
            Seller ID: ${seller.id}
            </p>
            <p>
            Xola has unregistered the webhooks.
            </p>
            <p>
            Thank you,<br>
            Xola
            </p>`;
        let subject = `${seller.name} disabled PicThrive on Xola`;
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
