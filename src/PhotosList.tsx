import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Shimmering } from './Shimmering';
import { useFetchCollection, useSearchPhotos } from './state/queries';
import { Photo } from 'pexels';
import { useNavigation } from '@react-navigation/native';
import { useIsFetching } from 'react-query';

const photosRes = {
  page: 1,
  per_page: 1,
  photos: [
    {
      avg_color: '#8AABD8',
      height: 2432,
      id: 8455348,
      liked: false,
      photographer: 'Hanna Auramenka',
      photographer_id: 2546624,
      photographer_url: 'https://www.pexels.com/@hannaauramenka',
      src: {
        landscape:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        large:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        large2x:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&h=350',
        original:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg',
        portrait:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        small:
          'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&h=130',
        tiny: 'https://images.pexels.com/photos/8455348/pexels-photo-8455348.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      url: 'https://www.pexels.com/photo/white-birds-flying-under-blue-sky-8455348/',
      width: 3648,
    },
    {
      id: 2880507,
      width: 4000,
      height: 6000,
      url: 'https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/',
      photographer: 'Deden Dicky Ramdhani',
      photographer_url: 'https://www.pexels.com/@drdeden88',
      photographer_id: 1378810,
      avg_color: '#7E7F7B',
      src: {
        original:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg',
        large2x:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
    },
    {
      id: 2880507,
      width: 4000,
      height: 6000,
      url: 'https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/',
      photographer: 'Deden Dicky Ramdhani',
      photographer_url: 'https://www.pexels.com/@drdeden88',
      photographer_id: 1378810,
      avg_color: '#7E7F7B',
      src: {
        original:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg',
        large2x:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
    },
    {
      id: 2880507,
      width: 4000,
      height: 6000,
      url: 'https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/',
      photographer: 'Deden Dicky Ramdhani',
      photographer_url: 'https://www.pexels.com/@drdeden88',
      photographer_id: 1378810,
      avg_color: '#7E7F7B',
      src: {
        original:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg',
        large2x:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
    },
    {
      id: 2880507,
      width: 4000,
      height: 6000,
      url: 'https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/',
      photographer: 'Deden Dicky Ramdhani',
      photographer_url: 'https://www.pexels.com/@drdeden88',
      photographer_id: 1378810,
      avg_color: '#7E7F7B',
      src: {
        original:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg',
        large2x:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
    },
    {
      id: 2880507,
      width: 4000,
      height: 6000,
      url: 'https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/',
      photographer: 'Deden Dicky Ramdhani',
      photographer_url: 'https://www.pexels.com/@drdeden88',
      photographer_id: 1378810,
      avg_color: '#7E7F7B',
      src: {
        original:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg',
        large2x:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
    },
  ],
  next_page: 'https://api.pexels.com/v1/curated/?page=2&per_page=1',
};

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const IMAGE_WIDTH = WIDTH * 0.4;
const IMAGE_HEIGHT = HEIGHT * 0.3;

export function PhotosList() {
  const navigation = useNavigation();
  const backgroundFetching = useIsFetching();
  navigation.setOptions({
    headerTitle: () =>
      backgroundFetching ? <ActivityIndicator /> : <Text>Collection</Text>,
  });

  const [state, setState] = useState({
    currentPage: 1,
    collectionId: '',
  });

  const {
    hasError,
    isFetchingCollection,
    data: collectionRes,
  } = useFetchCollection(5);
  const {
    isFetching: isFetchingPhotos,
    error,
    isError,
    data: photosRes,
  } = useSearchPhotos(state.collectionId, state.currentPage, {
    id: state.collectionId,
  });
  // } = { isFetching: false, isError: null, error: null };

  if (isFetchingPhotos || isFetchingCollection) {
    return (
      <View style={styles.center}>
        <Shimmering wrapperStyle={{ width: WIDTH, height: HEIGHT }} />
      </View>
    );
  }

  if (isError || hasError) {
    return (
      <View style={styles.center}>
        <Text>Error: {JSON.stringify(error)}</Text>
      </View>
    );
  }

  const navigateToPhoto = (selectedPhoto: Photo) => {
    // @ts-ignore
    navigation.navigate('Photo', { selectedPhoto });
  };

  const _renderCollectionItem = ({ item }: any) => (
    <View style={{ marginVertical: 10 }} key={item.id}>
      <Text style={styles.txt}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.wrapper}
        style={styles.wrapper}
        key={item.id}
      >
        {!isFetchingPhotos &&
          photosRes?.photos.map((photo: any) => (
            <TouchableOpacity
              key={photo.id}
              style={styles.margin4}
              onPress={() => navigateToPhoto(photo)}
            >
              <Image source={{ uri: photo.src?.tiny }} style={styles.image} />
              <Text style={{ position: 'absolute', top: 10, right: 10 }}>
                {photo.liked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          ))}
        {isFetchingPhotos && (
          <>
            <View style={styles.margin4}>
              <Shimmering wrapperStyle={styles.shimmering} />
            </View>
            <View style={styles.margin4}>
              <Shimmering wrapperStyle={styles.shimmering} />
            </View>
            <View style={styles.margin4}>
              <Shimmering wrapperStyle={styles.shimmering} />
            </View>
          </>
        )}
      </ScrollView>
      {!isFetchingPhotos && (
        <View style={{ flexDirection: 'row' }}>
          {item.photos_count > 0 && (
            <Text style={{ marginHorizontal: 10 }}>
              📸: {item.photos_count}
            </Text>
          )}
          {item.videos_count > 0 && (
            <Text style={{ marginHorizontal: 10 }}>
              🎥: {item.videos_count}
            </Text>
          )}
          <TouchableOpacity
            onPress={() =>
              setState({
                currentPage: state.currentPage + 1,
                collectionId: item.id,
              })
            }
            style={{ marginLeft: 'auto', marginRight: 10 }}
          >
            <Text style={{ color: '#74BDCB' }}>Show more</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.wrapper}
      data={collectionRes?.collections}
      renderItem={_renderCollectionItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    backgroundColor: '#FFFFF8',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
  txt: {
    fontSize: 21,
    textTransform: 'capitalize',
    paddingLeft: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'normal',
    fontWeight: '300',
    paddingLeft: 10,
  },
  margin4: {
    margin: 4,
  },
  shimmering: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    backgroundColor: '#E8ECF3',
    height: 1,
    width: '96%',
    alignSelf: 'center',
  },
});
