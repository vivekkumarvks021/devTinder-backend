import { model, Schema, Types, type HydratedDocument } from "mongoose";

export const CONNECTION_STATUSES = [
  "interested",
  "ignored",
  "accepted",
  "rejected",
] as const;

export type ConnectionStatus = (typeof CONNECTION_STATUSES)[number];

export interface IConnectionRequest {
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  status: ConnectionStatus;
}

export type ConnectionRequestDocument = HydratedDocument<IConnectionRequest>;

const connectionRequestSchema = new Schema<IConnectionRequest>(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: CONNECTION_STATUSES,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ConnectionRequest = model<IConnectionRequest>(
  "ConnectionRequest",
  connectionRequestSchema,
);

export default ConnectionRequest;
