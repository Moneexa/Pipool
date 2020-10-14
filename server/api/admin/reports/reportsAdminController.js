var reportsModel = require('../../common/reports/reportsModel');
module.exports = {

    show: async function (req, res) {
        var reports = await reportsModel.find().populate([{path:'author', model:'Channel'},{path:'campaign', model:'Campaign'}]);
         
        if (!reports) {
            return res.status(404).send("nothing found")
        }
        console.log(reports)
        return res.status(200).send(reports)
    }
}
