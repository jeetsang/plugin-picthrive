import winston from 'winston';

const Logger = new winston.Logger({
    level: 'info',
    json: true,
});
Logger.add(winston.transports.Console);
Logger.stream = {
    write: message => {
        Logger.info(message);
    },
};
export default Logger;
