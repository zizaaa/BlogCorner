export const convertTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return date.toLocaleDateString(undefined, options);
};