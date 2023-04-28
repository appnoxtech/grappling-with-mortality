import {Text, StyleSheet, View, TouchableOpacity, Alert, Image} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import * as ImagePicker from 'react-native-image-picker';
import LoadIcon from '../LoadIcons';
import {ImagePickerProps} from '../../../interfaces/components/inputs/ImagePickerProps';
import {ImageUploadService} from '../../../services/common/ImageUploadService';
import { useDispatch } from 'react-redux';
import { UpdateNewBookDetails } from '../../../redux/reducers/authorReducer';

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  iconFamily,
  iconName,
  iconSize,
  iconStyle,
  iconColor,
  label,
  error,
  value,
  setValue,
  id,
}) => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState('');
  const handlePickerPress = async () => {
    await ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      const image = response.assets;
      if (image?.length) {
        const data = new FormData();
        data.append('file', {
          uri: image[0].uri,
          type: image[0].type,
          name: image[0].fileName,
        });
        console.log('image Data', data);
        handleImageUpdload(data);
      }
    });
  };

  const handleImageUpdload = async (image: any) => {
    try {
      const res = await ImageUploadService(image);
      console.log('res', res.data);
      const {data} = res.data;
      console.log('data', data);
      
      const imageUrl = data.baseUrl + data.imagePath;
      dispatch(UpdateNewBookDetails({key: id, value: imageUrl}))
      setImgUrl(imageUrl);
    } catch (error: any) {
      Alert.alert('Error', error.response.data.msg);
    }
  };

  return (
    <View>
      {value ? (
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: value}} alt='book' />
        </View>
      ) : (
        <TouchableOpacity
          onPress={handlePickerPress}
          style={[styles.container, {borderColor: error ? 'red' : 'rgba(128,128,128,0.5)'}]}>
          <LoadIcon
            iconFamily={iconFamily}
            iconName={iconName}
            size={iconSize}
            color={iconColor}
            style={iconStyle}
          />
          <Text style={styles.textLabel}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: responsiveScreenHeight(2),
    borderWidth: 2,
    width: responsiveScreenWidth(50),
    borderStyle: 'dashed',
    minHeight: responsiveScreenHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(2),
  },
  textLabel: {
    fontSize: responsiveFontSize(2.5),
    color: 'rgba(128,128,128,0.4)',
    fontWeight: '500',
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: responsiveScreenHeight(2),
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(50),
    borderRadius: responsiveScreenWidth(2),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
