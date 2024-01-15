import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {AudioData, History, Playlist} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {updateNotification} from 'src/store/notification';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();

  return useQuery(['latest-uploads'], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/profile/recommended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: () => fetchRecommended(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();

  const {data} = await client('/playlist/by-profile');
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: () => fetchPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const FetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: () => FetchUploadsByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/favorite');
  return data.audios;
};

export const useFetchFavorite = () => {
  const dispatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: () => fetchFavorites(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchHistories = async (): Promise<History[]> => {
  const client = await getClient();

  const {data} = await client('/history');
  return data.histories;
};

export const useFetchHistories = () => {
  const dispatch = useDispatch();
  return useQuery(['histories'], {
    queryFn: () => fetchHistories(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecentlyPlayed = async (): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/history/recently-played');
  return data.audios;
};

export const useFetchRecentlyPlayed = () => {
  const dispatch = useDispatch();
  return useQuery(['recently-played'], {
    queryFn: () => fetchRecentlyPlayed(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchRecommendedPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();

  const {data} = await client('/profile/auto-generated-playlist');
  return data.playlist;
};

export const useFetchRecommendedPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended-playlist'], {
    queryFn: () => fetchRecommendedPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};

const fetchIsFavorite = async (id: string): Promise<boolean> => {
  const client = await getClient();

  const {data} = await client('/favorite/is-fav?audioId=' + id);
  return data.result;
};

export const useFetchIsFavorite = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['favorite', id], {
    queryFn: () => fetchIsFavorite(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicProfile = async (id: string): Promise<PublicProfile> => {
  const client = await getClient();

  const {data} = await client('/profile/info/' + id);
  return data.profile;
};

export const useFetchPublicProfile = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['profile', id], {
    queryFn: () => fetchPublicProfile(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicUploads = async (id: string): Promise<AudioData[]> => {
  const client = await getClient();

  const {data} = await client('/profile/uploads/' + id);
  return data.audios;
};

export const useFetchPublicUploads = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['uploads', id], {
    queryFn: () => fetchPublicUploads(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};

const fetchPublicPlaylist = async (id: string): Promise<Playlist[]> => {
  const client = await getClient();

  const {data} = await client('/profile/playlist/' + id);
  return data.playlist;
};

export const useFetchPublicPlaylist = (id: string) => {
  const dispatch = useDispatch();
  return useQuery(['playlist', id], {
    queryFn: () => fetchPublicPlaylist(id),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
    enabled: id ? true : false,
  });
};
