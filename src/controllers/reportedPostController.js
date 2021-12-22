const ReportedPost = require('../models/reportedPost');
const _ = require('lodash');

module.exports = {
    reportedPostById: (req, res, next, id) => {
        ReportedPost.findById(id).exec((err, reportedPost) => {
            if (err || !reportedPost) {
                return res.status(400).json({
                    error: 'Reported Post does not exist',
                });
            }
            req.reportedPost = reportedPost;
            next();
        });
    },
    read: (req, res) => {
        return res.json(req.reportedPost);
    },
    create: (req, res) => {
        const reportedPost = new ReportedPost(req.body);
        reportedPost.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json({ data });
        });
    },
    update: (req, res) => {
        let reportedPost = req.reportedPost;
        reportedPost = _.extend(reportedPost, req.body);
        reportedPost.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(data);
        });
    },
    remove: (req, res) => {
        const reportedPost = req.reportedPost;
        reportedPost.remove((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json({ message: 'Vaccination deleted successfully' });
        });
    },
    list: (req, res) => {
        ReportedPost.find()
            .sort('-createdAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
                res.json(data);
            });
    },
};