export const generateAvatar = (username: string) => {
    return `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;
}