import { Request, Response } from "express";
import { redisClient } from '../redis';

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

export const getData = (req: Request, res: Response) => {
    try {
        redisClient.get("data", function (error: any, results: string) {
            if(error) throw error;
            res.send(JSON.parse(results));
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const postData = (req: Request, res: Response) => {
    try {
        const title = req.body.title;
        const text = req.body.text;
        redisClient.get("data", function(error: any, results: string) {
            if(error) throw error;
            let data: any[] = JSON.parse(results);
            if (Array.isArray(data)) {
                data.push({
                    title: title,
                    text: text,
                });
            } else {
                data = [{
                    title: title,
                    text: text,
                }];
            }
            redisClient
                .multi()
                .set("data", JSON.stringify(data))
                .exec((error: any, results: any[]) => {
                    if(error) {
                        throw error;
                    } else {
                        return res.send('200');
                    }
                });
        });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};