const cache = {};
const CACHE_TTL = 60 * 1000;

function cacheware(req, res, next) {
    const key = req.originalUrl;
    const cached = cache[key];
    if (cached && Date.now() - cached.createdAt < CACHE_TTL) {
        res.set('X-Cache', 'HIT');
        return res.json(cached.data);
    }

    res.set('X-Cache', 'MISS');
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        cache[key] = {
            data: data,
            createdAt: Date.now()
        };
        return originalJson(data);
    };
    next();
}

module.exports = cacheware;