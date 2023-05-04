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
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {useDispatch, useSelector} from 'react-redux';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../../assests/Styles/GlobalTheme';
import LoadIcon from '../../LoadIcons';
import {store} from '../../../../interfaces/reducer/state';
import { UpdateSelectedAudioBook } from '../../../../redux/reducers/audioEbookReducer';

const PlayerControls = () => {
  const [trackTitle, setTrackTitle] = useState<string>();
  const dispatch = useDispatch();
  const {selectedBookDetails} = useSelector((state: store) => state.author);
  const [state, setState] = useState<State>();
  const {selectedAudioBook} = useSelector((store: store) => store.audio);
  const progress = useProgress();

  useEffect(() => {
    TrackPlayerSetup();
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
     if(trackTitle !== selectedAudioBook._id){
        const audioList = selectedBookDetails.audio;
        const index = audioList.findIndex((item) => item._id === trackTitle);
        if(index !== -1){
            const data = {...audioList[index], index};
            dispatch(UpdateSelectedAudioBook(data));
        }
     }
  }, [trackTitle]);
  

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
          maximumTrackTintColor={'rgba(0,0,0,0.3)'}
          thumbTintColor={colorPrimary}
          value={progress.position}
        />
      </View>
      <View style={styles.playerControls}>
        <LoadIcon
          iconFamily="AntDesign"
          iconName="stepbackward"
          style={{}}
          size={responsiveFontSize(5)}
          color={colorSecondary}
        />
        <TouchableOpacity onPress={togglePlayer}>
          <LoadIcon
            iconFamily="FontAwesome"
            iconName={state === State.Paused ? 'play' : 'pause'}
            style={{}}
            size={responsiveFontSize(6)}
            color={colorSecondary}
          />
        </TouchableOpacity>
        <LoadIcon
          iconFamily="AntDesign"
          iconName="stepbackward"
          style={{transform: [{rotateY: '180deg'}]}}
          size={responsiveFontSize(5)}
          color={colorSecondary}
        />
      </View>
    </>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  progrsBarSection: {
    marginTop: responsiveScreenHeight(2.5),
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
