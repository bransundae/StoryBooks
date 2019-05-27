if (process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: `mongodb+srv://nullfinder:${encodeURIComponent('Th3sund@33xp')}@cluster0-hhols.gcp.mongodb.net/test?retryWrites=true`
    }
} else {
    module.exports = {
        mongoURI: "mongodb://localhost/storybooks-dev"
    }
}