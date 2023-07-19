import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import {
  createSweet,
  deleteSweetById,
  updateSweet,
} from "../../lib/sweets_crud";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json("unauthorized");
  }

  switch (req.method) {
    case "POST":
      return create(req, res);
    case "PUT":
      return update(req, res);
    case "DELETE":
      return deleteSweet(req, res);

    default:
      return res.status(405).json({
        message: `HTTP method ${req.method ?? "unknown"} not allowed`,
      });
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await createSweet(req.body.data);

    return res.status(201).json("success");
  } catch (err) {
    console.error("Error in creating new sweet", err);
    return res
      .status(503)
      .json(
        "Our server is not able to process the request at the moment, please try again later!"
      );
  }
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await updateSweet(req.body.data);
    return res.status(201).json("success");
  } catch (err) {
    console.error("Error in updating a sweet", err);
    return res
      .status(503)
      .json(
        "Our server is not able to process the request at the moment, please try again later!"
      );
  }
};

const deleteSweet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body.id) {
      await deleteSweetById(req.body.id);
    } else {
      for (let sweet of req.body.staleSweets) {
        await deleteSweetById(sweet.id);
      }
    }
    return res.status(201).json("success");
  } catch (err) {
    console.error("Error in deleting a sweet", err);
    return res
      .status(503)
      .json(
        "Our server is not able to process the request at the moment, please try again later!"
      );
  }
};
