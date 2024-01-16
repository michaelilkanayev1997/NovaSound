import AudioForm from '@components/form/AudioForm';
import colors from '@utils/colors';
import {mapRange} from '@utils/math';
import {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {updateNotification} from 'src/store/notification';

interface Props {}

const Upload: FC<Props> = props => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = async (formData: FormData) => {
    setBusy(true);
    try {
      const client = await getClient({'Content-Type': 'multipart/form-data;'});

      const {data} = await client.post('/audio/create', formData, {
        onUploadProgress(progressEvent) {
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 1,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });

          // if (uploaded >= 100) {
          //   setAudioInfo({...defaultForm});
          // }

          setUploadProgress(Math.floor(uploaded));
        },
      });

      dispatch(
        updateNotification({
          message: 'Uploaded successfully !',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  return (
    <AudioForm onSubmit={handleUpload} busy={busy} progress={uploadProgress} />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Upload;
