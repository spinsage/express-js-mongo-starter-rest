
const catchAll = async (req, res) => {
    const notFoundResponse = {
        errCode: 404,
        errMessage: 'Invalid Operation'
    }

    res.status(404).json(notFoundResponse);
}

module.exports = catchAll;
