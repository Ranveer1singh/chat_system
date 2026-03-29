import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../utility/appError";

type ErrorResponse = {
    success: false;
    message: string;
    details?: unknown;
    // stack?: string;
};

type ZodLikeIssue = {
    path: Array<string | number>;
    message: string;
};

const isZodLikeError = (error: unknown): error is { issues: ZodLikeIssue[] } => {
    return Boolean(
        error &&
        typeof error === "object" &&
        "issues" in error &&
        Array.isArray((error as { issues?: unknown }).issues)
    );
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
    next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    const isProduction = process.env.NODE_ENV === "production";
    let statusCode = 500;
    let message = "Internal server error";
    let details: unknown;

    if (isZodLikeError(error)) {
        statusCode = 400;
        message = "Validation failed";
        details = error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
    } else if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        details = error.details;
    } else if (error instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "Database validation failed";
        details = Object.values(error.errors).map((issue) => issue.message);
    } else if (error instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${error.path}`;
    } else if ((error as { code?: number }).code === 11000) {
        statusCode = 409;
        message = "Duplicate value found";
        details = (error as { keyValue?: unknown }).keyValue;
    } else if (error instanceof Error) {
        message = error.message || message;
    }

    const response: ErrorResponse = {
        success: false,
        message,
    };

    if (details !== undefined) {
        response.details = details;
    }

    // if (!isProduction && error instanceof Error) {
    //     response.stack = error.stack;
    // }

    res.status(statusCode).json(response);
};
