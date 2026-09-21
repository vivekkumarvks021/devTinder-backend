import type { NextFunction, Request, Response } from "express";

import {
  getPendingRequests,
  getUserConnections,
  reviewConnectionRequest,
  sendConnectionRequest,
} from "../services/connection-request.service.js";

import { AppError } from "../utils/app-error.js";

import type {
  ReviewConnectionRequestParams,
  SendConnectionRequestParams,
} from "../validations/connection-request.validation.js";

export async function sendRequest(
  request: Request<SendConnectionRequestParams>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!request.user) {
      throw new AppError(401, "Authentication required");
    }

    const connectionRequest = await sendConnectionRequest(
      request.user._id.toString(),
      request.params,
    );

    response.status(201).json({
      success: true,
      message:
        request.params.status === "interested"
          ? "Interest sent successfully"
          : "Profile ignored successfully",
      data: {
        connectionRequest,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function reviewRequest(
  request: Request<ReviewConnectionRequestParams>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!request.user) {
      throw new AppError(401, "Authentication required");
    }

    const connectionRequest = await reviewConnectionRequest(
      request.user._id.toString(),
      request.params,
    );

    response.status(200).json({
      success: true,
      message:
        request.params.status === "accepted"
          ? "Connection request accepted successfully"
          : "Connection request rejected successfully",
      data: {
        connectionRequest,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getPendingRequestsController(
  request: Request,
  response: Response,
) {
  const loggedInUserId = String(request.user!._id);

  const requests = await getPendingRequests(loggedInUserId);

  response.status(200).json({
    success: true,
    message: "Pending connection requests fetched successfully",
    data: requests,
  });
}

export async function getUserConnectionsController(
  request: Request,
  response: Response,
) {
  const loggedInUserId = String(request.user!._id);

  const connections = await getUserConnections(loggedInUserId);

  response.status(200).json({
    success: true,
    message: "Connections fetched successfully",
    data: connections,
  });
}
