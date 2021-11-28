import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Photo as IPhoto } from 'pexels';
import { useUpdatePhoto } from './state/mutations';
import SnackBar from 'react-native-snackbar';

export function Photo() {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { updatePhoto, photo, reset, error } = useUpdatePhoto();

  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto>();

  useLayoutEffect(() => {
    const photoParam = route?.params?.selectedPhoto as IPhoto;
    navigation.setOptions({
      title: photoParam.photographer,
      headerStyle: {
        backgroundColor: photoParam?.avg_color,
      },
      headerTintColor: '#fff',
    });

    if (photoParam) {
      setSelectedPhoto(photoParam);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (error) {
    SnackBar.show({
      text: `Error`,
      duration: SnackBar.LENGTH_INDEFINITE,
      textColor: '#F0F0F0',
      action: {
        text: 'RESET',
        onPress: reset,
      },
    });
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selectedPhoto?.avg_color ?? 'transparent' },
      ]}
    >
      {!loading ? (
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{
              uri: selectedPhoto?.src.large,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              updatePhoto({
                ...selectedPhoto,
                liked: true,
              } as any)
            }
            style={styles.fav}
          >
            <Text style={{ fontSize: 30 }}>{photo?.liked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={'large'} />
        </View>
      )}
    </View>
  );
}
const IMAGE_HEIGHT = Dimensions.get('screen').height * 0.8;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '98%',
    borderRadius: 5,
    height: IMAGE_HEIGHT,
    alignSelf: 'center',
  },
  fav: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 50,
    height: 50,
  },
});
