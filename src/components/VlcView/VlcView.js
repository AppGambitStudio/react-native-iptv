import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Pressable, View, Text, TextInput} from 'react-native';
import styles from './style';
// import {setLogin} from '../../redux/reducers/Auth/authReducer';
// import {useDispatch} from 'react-redux';
import {VLCPlayer} from 'react-native-vlc-media-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SinglePickerDialog from '../SinglePickerDialog';

const Login = props => {
  // const dispatch = useDispatch();
  // const login = () => {
  //   dispatch(setLogin(true));
  // };
  const vlcRef = useRef();

  const [vlcTextTrack, setVlcTextTrack] = useState({id: -1, name: ''});
  const [vlcTextTracks, setVlcTextTracks] = useState([]);
  const [showVlcTextTrack, setShowVlcTextTrack] = useState(false);
  const [userDisableCC, setUserDisableCC] = useState(false);
  const [vlcAudioTrack, setVlcAudioTrack] = useState({id: -1, name: ''});
  const [vlcAudioTracks, setVlcAudioTracks] = useState([]);
  const [showVlcAudioTrack, setShowVlcAudioTrack] = useState(false);
  const [userDisableAudio, setUserDisableAudio] = useState(false);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [url, setUrl] = useState(
    '',
    // 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    // 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  );
  const [text, setText] = useState(
    url,
    // 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  );
  useEffect(() => {
    // console.log(vlcRef.current);
  });
  const toTime = seconds => {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <View style={styles.bgWhite}>
          <TextInput
            placeholder="URL"
            onEndEditing={value => {
              setUrl(text);
            }}
            value={text}
            onChangeText={value => setText(value)}
          />
        </View>
        <View style={styles.container}>
          {/* {url.length > 0 && ( */}
          <VLCPlayer
            style={styles.meetView}
            ref={vlcRef}
            volume={100}
            textTrack={vlcTextTrack ? vlcTextTrack.id : -1}
            audioTrack={vlcAudioTrack ? vlcAudioTrack.id : -1}
            // onBuffering={() => console.log('onBuffering')}
            // onPlaying={() => console.log('onPlaying')}
            source={{
              initType: 2,
              hwDecoderEnabled: 1,
              hwDecoderForced: 1,
              uri: url,
              initOptions: [
                '--rtsp-tcp',
                '--network-caching=150',
                '--rtsp-caching=150',
                '--no-stats',
                '--tcp-caching=150',
                '--realrtsp-caching=150',
                '--live-caching=150',
              ],
            }}
            onLoad={event => {
              console.log('VLC onLoad: ', event);
              if (event.textTracks) {
                const selectedItem = event.textTracks.filter(
                  i => i.name === vlcTextTrack.name,
                );
                setVlcTextTracks(event.textTracks);
                setVlcTextTrack(
                  userDisableCC
                    ? {id: -1, name: ''}
                    : selectedItem.length === 0
                    ? event.textTracks[0].id === -1 &&
                      event.textTracks.length > 1
                      ? event.textTracks[1]
                      : event.textTracks[0]
                    : selectedItem[0],
                );
              }
              if (event.audioTracks) {
                const selectedItem = event.audioTracks.filter(
                  i => i.name === vlcAudioTrack.name,
                );
                setVlcAudioTracks(event.audioTracks);
                setVlcAudioTrack(
                  userDisableAudio
                    ? {id: -1, name: ''}
                    : selectedItem.length === 0
                    ? event.audioTracks[0].id === -1 &&
                      event.audioTracks.length > 1
                      ? event.audioTracks[1]
                      : event.audioTracks[0]
                    : selectedItem[0],
                );
              }
            }}
            onPlaying={data => {
              console.log('onPlaying : ', data);
              setPaused(false);
              if (data.currentTime) {
                setCurrentTime(data.currentTime);
              }
            }}
            onError={error => {
              console.log('VLC onError: ', error);
            }}
            onProgress={data => {
              console.log('onProgress : ', data);
              setCurrentTime(data.currentTime);
            }}
            onPaused={data => {
              console.log('onPaused : ', data);
              setPaused(true);
              if (data.currentTime) {
                setCurrentTime(data.currentTime);
              }
            }}
            onStopped={data => {
              console.log('onStopped : ', data);
              setPaused(true);
            }}
            onBuffering={data => {
              console.log('onBuffering : ', data);
            }}
            onEnded={data => {
              console.log('onEnded : ', data);
            }}
            // autoAspectRatio={true}
            resizeMode="contain"
            isLive={true}
            autoReloadLive={true}
            paused={paused}
            repeat={true}
          />
          {/* )} */}
        </View>
        <View>
          <View style={styles.viewBtn}>
            <View style={styles.container}>
              <Text style={styles.cTime}>{toTime(currentTime / 1000)}</Text>
            </View>
            <View style={styles.playBtn}>
              <Pressable
                style={styles.btn}
                onPress={() => {
                  setPaused(!paused);
                }}>
                <MaterialIcons
                  name={paused ? 'play-circle-outline' : 'pause-circle-outline'}
                  size={35}
                  color="#fff"
                />
              </Pressable>
            </View>
            <View style={styles.trackBtns}>
              {vlcTextTracks && vlcTextTracks.length > 0 ? (
                <Pressable
                  style={styles.btn}
                  onPress={() => {
                    setShowVlcTextTrack(true);
                  }}>
                  <MaterialIcons
                    name="closed-caption-off"
                    size={35}
                    color="#fff"
                  />
                </Pressable>
              ) : (
                <View />
              )}
              {vlcAudioTracks && vlcAudioTracks.length > 0 ? (
                <Pressable
                  style={styles.btn}
                  onPress={() => {
                    setShowVlcAudioTrack(true);
                  }}>
                  <MaterialIcons name="audiotrack" size={35} color="#fff" />
                </Pressable>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
        {showVlcTextTrack && (
          <SinglePickerDialog
            focus
            title={'Subtitles'}
            items={vlcTextTracks.map((row, index) => ({
              value: row.id,
              label: row.name,
            }))}
            visible={showVlcTextTrack}
            selectedItem={{
              value: vlcTextTrack ? vlcTextTrack.id : -1,
              label: '',
            }}
            onCancel={() => setShowVlcTextTrack(false)}
            onOk={result => {
              console.log('selected CC :', result);
              setShowVlcTextTrack(false);
              setUserDisableCC(result.selectedItem.value === -1);
              setVlcTextTrack({
                name: result.selectedItem.label,
                id: result.selectedItem.value,
              });
            }}
          />
        )}
        {showVlcAudioTrack && (
          <SinglePickerDialog
            focus
            title={'Audio'}
            items={vlcAudioTracks.map((row, index) => ({
              value: row.id,
              label: row.name,
            }))}
            visible={showVlcAudioTrack}
            selectedItem={{
              value: vlcAudioTrack ? vlcAudioTrack.id : -1,
              label: '',
            }}
            onCancel={() => setShowVlcAudioTrack(false)}
            onOk={result => {
              console.log('selected CC :', result);
              setShowVlcAudioTrack(false);
              setUserDisableAudio(result.selectedItem.value === -1);
              setVlcAudioTrack({
                name: result.selectedItem.label,
                id: result.selectedItem.value,
              });
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;
