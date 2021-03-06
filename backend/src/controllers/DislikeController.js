const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!loggedDev)
            return res.status(400).json({ error: 'Dev logged not exists' });

        if (!targetDev)
            return res.status(400).json({ error: 'Dev target not exists' });

       
        if (loggedDev.likes.includes(targetDev._id)) {
            return res.status(404).json({ error: 'Dislike already exist' });
        }

        loggedDev.dislikes.push(targetDev._id); //salvando no vetor de likes
        await loggedDev.save();


        return res.json({ loggedDev });
    }
}