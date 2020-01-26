
import { Request, Response } from "express";
import { redisClient } from '../redis'

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err: string) {
    console.log('Something went wrong ' + err);
});


export const getLogs = (req: Request, res: Response) => {
    try {
        redisClient.get("logs", function (error: any, results: string) {
            if(error) throw error;
            res.send(JSON.parse(results));
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export const postLog = (req: Request, res: Response) => {
    try {
        const event = req.body.event;
        const eventDate = req.body.eventDate;

        redisClient.get("logs", function(error: any, results: string) {
            if(error) throw error;
            let data: any[] = JSON.parse(results);
            if (Array.isArray(data)) {
                data.push({
                    event,
                    eventDate,
                });
            } else {
                data = [{
                    event,
                    eventDate,
                }];
            }
            redisClient
                .multi()
                .set("logs", JSON.stringify(data))
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