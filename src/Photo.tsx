import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IPhoto } from './PhotoModal';

export function Photo() {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const selectedPhoto = route?.params?.selectedPhoto as IPhoto;

  navigation.setOptions({
    title: selectedPhoto.photographer,
    headerStyle: {
      backgroundColor: selectedPhoto?.avg_color,
    },
    headerTintColor: '#fff',
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selectedPhoto?.avg_color ?? 'red' },
      ]}
    >
      {!loading ? (
        <Image
          style={styles.image}
          source={{
            uri: selectedPhoto.src.large,
          }}
        />
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
  },
});
