import {AudioData} from './audio';

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
  Profile: undefined;
  ProfileSettings: undefined;
  UpdateAudio: {audio: AudioData};
  Verification: {userInfo: NewUserResponse};
};

export type HomeNavigatorStackParamList = {
  PublicProfile: {profileId: string};
  Profile: undefined;
  Home: undefined;
};

export type PublicProfileTabParamsList = {
  PublicUploads: {profileId: string};
  PublicPlaylist: {profileId: string};
};
