const errorHandler = (err, req, res, next) => {
    console.log(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        erro: true,
        message: err.message || "Internal server error"
    })
}

module.exports = errorHandler;