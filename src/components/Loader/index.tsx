import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Loader = ({ text = 'LOADING BREADS' }: { text: string }) => {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const id = setInterval(
      () =>
        setContent(content =>
          content === `${text}...` ? text : `${content}.`,
        ),
      300,
    );

    return () => clearInterval(id);
  }, [text]);

  return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  loadingText: { color: '#f4f2fb', fontSize: 30, fontWeight: 'bold' },
});

export default Loader;
