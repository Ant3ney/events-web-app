module.exports = (process) => {
    process.on('SIGINT', function() {
        process.exit(1);
    });
}