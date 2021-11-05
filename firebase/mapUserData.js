export const mapUserData = (user) => {
    const {uid, email, xa, displayName, phontoUrl } = user
    return {
        id: uid,
        email,
        // token: xa,
        // name: displayName,
        // profilePic: phontoUrl
    }
}