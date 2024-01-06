import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import Progress from '@ui/Progress';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {categories} from '@utils/audioCategories';
import colors from '@utils/colors';
import {mapRange} from '@utils/math';
import {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {DocumentPickerResponse, types} from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import client from 'src/api/client';
import * as yup from 'yup';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined,
};

const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is missing!'),
  category: yup.string().oneOf(categories, 'Category is missing!'),
  about: yup.string().trim().required('About is missing!'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing!'),
    name: yup.string().required('Audio file is missing!'),
    type: yup.string().required('Audio file is missing!'),
    size: yup.number().required('Audio file is missing!'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

interface Props {}

const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const handleUpload = async () => {
    setBusy(true);
    try {
      // Validating the Fields before uploading
      const finalData = await audioInfoSchema.validate(audioInfo);
      console.log('finalData: ', finalData);
      const formData = new FormData();

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });
      // Check if there is a Poster file
      if (finalData.poster.uri)
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

      console.log('token: ', token);

      const {data} = await client.post('/audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data;',
        },
        onUploadProgress(progressEvent) {
          console.log(progressEvent.total);
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 1,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });

          if (uploaded >= 100) {
            setAudioInfo({...defaultForm});
          }

          setUploadProgress(Math.floor(uploaded));
        },
      });

      console.log('data: ', data);
    } catch (error) {
      if (error instanceof yup.ValidationError)
        console.log('Validation error: ', error.message);
      else console.log(error.response.data);
    }
    setBusy(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle={'Select Poster'}
          options={{type: [types.images]}}
          onSelect={poster => {
            setAudioInfo({...audioInfo, poster});
          }}
        />
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle={'Select Audio'}
          style={{marginLeft: 20}}
          options={{type: [types.audio]}}
          onSelect={file => {
            setAudioInfo({...audioInfo, file});
          }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => {
            setAudioInfo({...audioInfo, title: text});
          }}
          value={audioInfo.title}
        />

        <Pressable
          onPress={() => {
            setShowCategoryModal(true);
          }}
          style={styles.categorySelector}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
          onChangeText={text => {
            setAudioInfo({...audioInfo, about: text});
          }}
          value={audioInfo.about}
        />

        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => setShowCategoryModal(false)}
          title="Category"
          data={categories}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => setAudioInfo({...audioInfo, category: item})}
        />

        <View style={{marginVertical: 10}}>
          {busy ? <Progress progress={uploadProgress} /> : null}
        </View>

        <AppButton
          busy={busy}
          borderRadius={10}
          title="Submit"
          onPress={handleUpload}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,

    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;
