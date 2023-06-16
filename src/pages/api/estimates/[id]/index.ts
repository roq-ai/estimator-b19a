import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { estimateValidationSchema } from 'validationSchema/estimates';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.estimate
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEstimateById();
    case 'PUT':
      return updateEstimateById();
    case 'DELETE':
      return deleteEstimateById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEstimateById() {
    const data = await prisma.estimate.findFirst(convertQueryToPrismaUtil(req.query, 'estimate'));
    return res.status(200).json(data);
  }

  async function updateEstimateById() {
    await estimateValidationSchema.validate(req.body);
    const data = await prisma.estimate.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEstimateById() {
    const data = await prisma.estimate.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
