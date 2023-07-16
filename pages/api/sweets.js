import { getSession, getServerSession } from "next-auth/react";
import { createSweet } from "../../lib/sweets_crud";

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log("SEE", session);
  /* if (!session) {
    return res.status(401).json("unauthorized");
  } */

  switch (req.method) {
    case "POST":
      return create(req, res);

    default:
      return res.status(405).json({
        message: `HTTP method ${req.method ?? "unknown"} not allowed`,
      });
  }
}

const create = async (req, res) => {
  try {
    const newSweet = await createSweet(req.body);
    return res.status(201).json(newSweet);
  } catch (err) {
    console.error("Error in saving new profile", err);
    return res
      .status(503)
      .json(
        "Our server is not able to process the request at the moment, please try again later!"
      );
  }
};
