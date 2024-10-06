/**
 * Extracts a username from the given email by removing special characters.
 * 
 * @param email - The email address to extract the username from
 * @returns The simplified username
 */
export const getUsernameFromEmail=(email: string): string =>{
    // Get the part before '@' and remove non-alphanumeric characters
    return email.split('@')[0].replace(/\W/g, '');
}


