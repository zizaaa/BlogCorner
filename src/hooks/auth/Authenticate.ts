import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    // Add other fields from your token as needed
}

const isAuthenticated = (): boolean => {
    const token = Cookies.get('token');

    if (!token) {
        return false;
    }

    try {
        // Decode the token
        const decodedToken = jwtDecode<DecodedToken>(token);

        // Check if the token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
            console.log('Token has expired');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
};

export default isAuthenticated;