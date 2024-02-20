const host = "http://localhost:3500"
export const signUpRoute = `${host}/api/users/signUp`
export const loginRoute = `${host}/api/users/login`
export const updateUserRoute = `${host}/api/users/update-user?id=id`
export const deleteUserRoute = `${host}/api/users/delete-user`
export const getAllUsersRoute = `${host}/api/users/get-all-users`
export const getUserByIdRoute = `${host}/api/users/get-user-by-id?id=id`
export const logoutRoute = `${host}/api/users/logout`
export const getAllRolesRoute = `${host}/api/roles/get-all-roles`
export const createRoleRoute = `${host}/api/roles/create-role`
export const deleteRoleRoute = `${host}/api/roles/delete-role?id=id`
export const createUserRoleRoute = `${host}/api/users_roles/create-user-role`
export const getAllUserRoleRoute = `${host}/api/users_roles/get-all-users-roles`