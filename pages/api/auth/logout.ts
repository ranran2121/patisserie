import { NextApiRequest, NextApiResponse } from "next";

async function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(process.env.BASE_URL ? process.env.BASE_URL : "/");
}

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await handleLogout(req, res);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
