const return404 = res => {
    // If we already sent the request (simultaneous async fetch), then we just noop.
    if (res && res.finished) {
        return;
    }

    if (res) {
        res.writeHead(404);
        res.end();
    } else {
        // This action really is a last recourse fallback. In theory, we user wouldn't be routed
        // to a 404 page by the FE side router.
        global.window.location.replace('/404');
    }
};

export default return404;
