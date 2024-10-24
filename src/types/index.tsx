
export interface User {
  _id: string
  email: string
  username:string
  fullName:string
  photo:string
}
export interface UserInfo {
  id:number,
  span_name: string,
  name: string,
  type:string
}

export interface CreateNewUser {
  full_name: string,
  username: string,
  email: string,
  password: string,
}

export interface LoginUser {
  username: string,
  password: string
}
// interface UserType {
//   fullName: string;
//   username: string;
//   photo: string;
//   bio?: string;
//   messages?: Message[];
// }

