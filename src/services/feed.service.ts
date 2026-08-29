import ConnectionRequest from "../models/connection-request.model.js";
import User from "../models/user.model.js";

import type { FeedQuery } from "../validations/feed.validation.js";

export async function getDeveloperFeed(
  loggedInUserId: string,
  query: FeedQuery,
) {
  const { page, limit } = query;

  const skip = (page - 1) * limit;

  const interactions = await ConnectionRequest.find({
    $or: [
      {
        fromUserId: loggedInUserId,
      },
      {
        toUserId: loggedInUserId,
      },
    ],
  })
    .select("fromUserId toUserId")
    .lean();

  const excludedUserIds = new Set<string>([loggedInUserId]);

  interactions.forEach((interaction) => {
    excludedUserIds.add(interaction.fromUserId.toString());

    excludedUserIds.add(interaction.toUserId.toString());
  });

  const userFilter = {
    _id: {
      $nin: Array.from(excludedUserIds),
    },
  };

  const [users, totalUsers] = await Promise.all([
    User.find(userFilter)
      .select(
        [
          "firstName",
          "lastName",
          "age",
          "gender",
          "about",
          "photoUrl",
          "skills",
        ].join(" "),
      )
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(userFilter),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      hasNextPage: page * limit < totalUsers,
      hasPreviousPage: page > 1,
    },
  };
}
