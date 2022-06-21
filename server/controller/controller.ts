import places from '../models/schema';
import { Request, Response } from 'express';
import s3 from '../s3';
import db from '../models/db';

const getPlaces = async (req: Request, res: Response) => {
  try {
    const placesList = await places.find();
    res.status(200);
    res.send(placesList);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postPlaces = async (req: Request, res: Response) => {
  try {
    let result = await places.create({
      _source: {
        subtitle: req.body.subtitle,
        location: {
          lat: req.body.location.lat,
          lon: req.body.location.lon,
        },
        filters: {
          rating: req.body.rating,
          review: req.body.review,
        },
        thumbnail: req.body.thumbnail,
      },
    });
    res.status(201);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const postImages = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const file = req.file.buffer;
      const result = await s3.uploadFile(file);
      res.status(200);
      res.send(result.Location);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const removeAllTestData = async (req: Request, res: Response) => {
  try {
    //we check if the db is the one that we use for the test
    if ((db.key as string).includes('test')) {
      await places.deleteMany({});
      res.status(200);
      res.send();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Something went wrong!');
  }
};

export default { getPlaces, postPlaces, postImages, removeAllTestData };
