import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  view: {
    flex: 1,
    backgroundColor: '#000',
  },
  loginBtn: {
    backgroundColor: '#1A1924',
    height: 50,
    width: 200,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
  },
  meetView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  subtitleBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  btn: {paddingHorizontal: 5},
  trackBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  playBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cTime: {
    color: '#fff',
    fontSize: 17,
    paddingHorizontal: 10,
  },
});

export default styles;
