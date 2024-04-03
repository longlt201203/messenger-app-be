import express from "express";
import { User } from "../db/entities/user.entity";

export type Request = express.Request & { user?: User };