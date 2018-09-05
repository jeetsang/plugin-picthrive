import app from './app';
import config from 'config';
const PORT = config.get('app.port');


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
