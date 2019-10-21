import * as Sentry from '@sentry/browser';

function init() {
    Sentry.init({
        dsn: "https://4bb8fc0a46b2476b98e4f8f3b04ef464@sentry.io/1788616",
        release: "my-project-name@0.1.0"
    });
}

function log(error) {
    Sentry.captureException(new Error("Something broke"));
}

export default {
    init,
    log
}