import jwt from "jsonwebtoken";
export interface Payload {
    userId: string;
    tenantId: string;
    hotelId: string;
}

export const generateAccessToken = (userId: string,tenantId:string,hotelId:string): string => {
    const payload: Payload = { userId,tenantId,hotelId};
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '20m',
    });
    return accessToken;
};

export const generateRefreshToken = (userId: string,tenantId:string,hotelId:string): string => {
    const payload: Payload = { userId, tenantId,hotelId} ;
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: '7d',
    });

    return refreshToken;
};