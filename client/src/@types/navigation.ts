interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  LostPassword: undefined;
  Verification: {userInfo: NewUserResponse};
};

export type ProfileNavigatorStackParamList = {
  profile: undefined;
  ProfileSettings: undefined;
  Verification: {userInfo: NewUserResponse};
};

export type HomeNavigatorStackParamList = {
  PublicProfile: {profileId: string};
  Home: undefined;
};

export type PublicProfileTabParamsList = {
  PublicUploads: {profileId: string};
  PublicPlaylist: {profileId: string};
};
