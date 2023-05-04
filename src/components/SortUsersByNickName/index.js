export const sortUsersByNickName = (users) => {
    let newUsers = [...users];
    newUsers.sort((a,b) => a.nickname.localeCompare(b.nickname))
    return newUsers;
}