import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: { width: '100%', height: 300 },
  arrowContainer: {
    position: 'absolute',
    width: 27,
    height: 27,
    padding: 7,
    backgroundColor: '#f4f73e',
    borderRadius: 50,
    top: 15,
    left: 15,
  },
  arrow: {
    width: '100%',
    height: '100%',
  },
  textContainer: { paddingBottom: 15, paddingHorizontal: 20 },
  name: {
    color: '#f5f2fc',
    fontSize: 35,
    fontWeight: '700',
    marginBottom: -2,
  },
  origin: { color: '#767980', fontSize: 20, fontWeight: '700' },
  container: {
    marginTop: 20,
  },
  heading: {
    fontWeight: '700',
    fontSize: 15,
    color: '#d4d0e0',
    marginBottom: 5,
  },
  text: { fontWeight: '500', fontSize: 13, color: '#767980' },
  flex: { flexDirection: 'row', alignItems: 'center' },
  mr: { marginHorizontal: 10 },
});
