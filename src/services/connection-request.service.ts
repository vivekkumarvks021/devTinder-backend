import ConnectionRequest from "../models/connection-request.model.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/app-error.js";

import type {
  ReviewConnectionRequestParams,
  SendConnectionRequestParams,
} from "../validations/connection-request.validation.js";

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

export async function sendConnectionRequest(
  fromUserId: string,
  input: SendConnectionRequestParams,
) {
  const { status, toUserId } = input;

  if (fromUserId === toUserId) {
    throw new AppError(400, "You cannot send a connection request to yourself");
  }

  const targetUserExists = await User.exists({
    _id: toUserId,
  });

  if (!targetUserExists) {
    throw new AppError(404, "Target user not found");
  }

  const existingRequest = await ConnectionRequest.findOne({
    $or: [
      {
        fromUserId,
        toUserId,
      },
      {
        fromUserId: toUserId,
        toUserId: fromUserId,
      },
    ],
  });

  if (existingRequest) {
    throw new AppError(
      409,
      "A connection interaction already exists between these users",
    );
  }

  try {
    return await ConnectionRequest.create({
      fromUserId,
      toUserId,
      status,
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError(409, "Connection request already exists");
    }

    throw error;
  }
}

export async function reviewConnectionRequest(
  loggedInUserId: string,
  input: ReviewConnectionRequestParams,
) {
  const { requestId, status } = input;

  const updatedRequest = await ConnectionRequest.findOneAndUpdate(
    {
      _id: requestId,

      // Sirf receiver review kar sakta hai
      toUserId: loggedInUserId,

      // Sirf pending interest review hoga
      status: "interested",
    },
    {
      $set: {
        status,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!updatedRequest) {
    throw new AppError(
      404,
      "Connection request not found or not eligible for review",
    );
  }

  return updatedRequest;
}

const USER_SAFE_FIELDS = "firstName lastName age gender about photoUrl skills";

// Pending requests received by logged-in user
export async function getPendingRequests(userId: string) {
  return ConnectionRequest.find({
    toUserId: userId,
    status: "interested",
  }).populate("fromUserId", USER_SAFE_FIELDS);
}

// Accepted connections of logged-in user
export async function getUserConnections(userId: string) {
  const connections = await ConnectionRequest.find({
    status: "accepted",

    $or: [
      {
        fromUserId: userId,
      },
      {
        toUserId: userId,
      },
    ],
  })
    .populate("fromUserId", USER_SAFE_FIELDS)
    .populate("toUserId", USER_SAFE_FIELDS);

  return connections.map((connection) => {
    const fromUser = connection.fromUserId as unknown as {
      _id: { toString(): string };
    };

    const isSender = fromUser._id.toString() === userId.toString();

    return isSender ? connection.toUserId : connection.fromUserId;
  });
}
