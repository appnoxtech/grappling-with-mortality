import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import TrackPlayer, {
  State,
  useProgress,
  useTrackPlayerEvents,
  Event,
  usePlaybackState,
} from 'react-native-track-player';
import Lottie from 'lottie-react-native';
import Slider from '@react-native-community/slider';
import {useDispatch, useSelector} from 'react-redux';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../../assests/Styles/GlobalTheme';
import LoadIcon from '../../LoadIcons';
import {store} from '../../../../interfaces/reducer/state';
import {UpdateSelectedAudioBook} from '../../../../redux/reducers/audioEbookReducer';
import LoadingScreen from '../../../../screens/common/LoadingScreen';
import {SetIsLoadingState} from '../../../../redux/reducers/commonReducer';

const PlayerControls = () => {
  const [trackTitle, setTrackTitle] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {selectedBookDetails} = useSelector((state: store) => state.author);
  const [state, setState] = useState<State>();
  const {selectedAudioBook} = useSelector((store: store) => store.audio);
  const progress = useProgress();
  const crrState = usePlaybackState();
  const path = '../../../../../assests/animations/Loading.json';

  useEffect(() => {
    TrackPlayerSetup();
    return () => {TrackPlayer.pause();}
  }, []);

  const TrackPlayerSetup = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(
        selectedBookDetails.audio.map(item => {
          return {
            url: item.audioLink,
            title: item._id,
          };
        }),
      );
      TrackPlayer.skip(selectedAudioBook.index);
      TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
        console.log('Event.RemoteSeek', event);
        TrackPlayer.seekTo(event.position);
      });
      await togglePlayer();
      await setCurrentState();
      setState(state);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const togglePlayer = async () => {
    try {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        TrackPlayer.pause();
        await setCurrentState();
      } else {
        TrackPlayer.play();
        await setCurrentState();
      }
    } catch (error) {
      console.log('Eror', error);
    }
  };

  const setCurrentState = async () => {
    try {
      const state = await TrackPlayer.getState();
      setState(state);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const getCurrentPosition = () => {
    if (progress.position < 10) {
      return `00:0${progress.position.toFixed(0)}`;
    } else {
      return `00:${progress.position.toFixed(0)}`;
    }
  };

  const getTimeLeft = () => {
    const diff = progress.duration - progress.position;
    if (diff < 10) {
      return `-00:0${diff.toFixed(0)}`;
    } else {
      return `-00:${diff.toFixed(0)}`;
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title} = track || {};
      setTrackTitle(title);
    }
  });

  useEffect(() => {
    if (trackTitle !== selectedAudioBook._id) {
      const audioList = selectedBookDetails.audio;
      const index = audioList.findIndex(item => item._id === trackTitle);
      if (index !== -1) {
        const data = {...audioList[index], index};
        dispatch(UpdateSelectedAudioBook(data));
      }
    }
  }, [trackTitle]);

  const handleNext = () => {
    if (selectedAudioBook.index === selectedBookDetails.audio.length - 1) {
      return;
    } else {
      const audioList = selectedBookDetails.audio;
      const index = audioList.findIndex(item => item._id === trackTitle);
      if (index !== -1) {
        const newIndex = index + 1;
        const data = {...audioList[newIndex], index: newIndex};
        dispatch(UpdateSelectedAudioBook(data));
        TrackPlayer.skip(newIndex);
        setCurrentState();
      }
    }
  };

  const handlePrevious = () => {
    if (selectedAudioBook.index) {
      const audioList = selectedBookDetails.audio;
      const index = audioList.findIndex(item => item._id === trackTitle);
      if (index !== -1) {
        const newIndex = index - 1;
        const data = {...audioList[newIndex], index: newIndex};
        dispatch(UpdateSelectedAudioBook(data));
        TrackPlayer.skip(newIndex);
        setCurrentState();
      }
    }
  };

  const colorDisable = 'rgba(0,0,0,0.3)';

  useEffect(() => {
     if(crrState === State.Buffering || crrState === State.Connecting || crrState === State.None) {
      setIsLoading(true);
     }else {
      setIsLoading(false);
     }
  }, [crrState]);

  useEffect(() => {
    TrackPlayer.skip(selectedAudioBook.index);
  }, []);
  
  return (
    <>
      <View style={styles.progrsBarSection}>
        <View style={styles.timerContainer}>
          <Text style={styles.startTimer}>{getCurrentPosition()}</Text>
          <Text style={styles.stopTimer}>{getTimeLeft()}</Text>
        </View>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={progress.duration}
          minimumTrackTintColor={colorSecondary}
          maximumTrackTintColor={colorDisable}
          thumbTintColor={colorPrimary}
          value={progress.position}
        />
      </View>
      <View style={styles.playerControls}>
        <TouchableOpacity onPress={handlePrevious}>
          <LoadIcon
            iconFamily="AntDesign"
            iconName="stepbackward"
            style={{}}
            size={responsiveFontSize(5)}
            color={
              selectedAudioBook.index === 0 ? colorDisable : colorSecondary
            }
          />
        </TouchableOpacity>
        {isLoading ? (
          <View style={styles.animationContainer}>
            <Lottie
            resizeMode='cover'
            style={styles.animationStyle}
            source={require(path)}
            autoPlay
            loop
          />
          </View>
        ) : (
          <TouchableOpacity style={styles.animationContainer} onPress={togglePlayer}>
            <LoadIcon
              iconFamily="FontAwesome"
              iconName={crrState === State.Paused || crrState === State.Ready  ? 'play' : 'pause'}
              style={{}}
              size={responsiveFontSize(6)}
              color={colorSecondary}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNext}>
          <LoadIcon
            iconFamily="AntDesign"
            iconName="stepbackward"
            style={{transform: [{rotateY: '180deg'}]}}
            size={responsiveFontSize(5)}
            color={
              selectedAudioBook.index === selectedBookDetails.audio.length - 1
                ? colorDisable
                : colorSecondary
            }
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  progrsBarSection: {
    marginTop: responsiveScreenHeight(2.5),
  },
  animationContainer: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenWidth(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  animationStyle: {
    
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveScreenHeight(0.5),
  },
  playerControls: {
    marginTop: responsiveScreenHeight(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  smallControlBtn: {
    width: responsiveScreenWidth(12),
    height: responsiveScreenWidth(12),
    borderRadius: responsiveScreenWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorSecondary,
  },
  pausePlayControlBtn: {
    width: responsiveScreenWidth(18),
    height: responsiveScreenWidth(18),
    borderRadius: responsiveScreenWidth(9),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorSecondary,
  },
  startTimer: {
    fontSize: responsiveFontSize(2),
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'left',
  },
  stopTimer: {
    fontSize: responsiveFontSize(2),
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'right',
  },
});
