import {Colors} from '@/constants/Colors';
import {BlurView} from 'expo-blur';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const theme = useColorScheme();
  const colors = Colors[theme ?? 'light'];

  /** ✅ 검색 함수 */
  const handleSearch = async () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
    handleCloseBlur();
  };

  /** ✅ 블러 제거 함수 */
  const handleCloseBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  /** ✅ 뒤로가기 버튼 핸들링 */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isFocused) {
          handleCloseBlur();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [isFocused]);

  /** ✅ 포커스 해제 시 블러 제거 */
  useEffect(() => {
    if (!isFocused) {
      handleCloseBlur();
    }
  }, [isFocused]);

  return (
    <>
      {isFocused && (
        <TouchableWithoutFeedback onPress={handleCloseBlur}>
          <BlurView
            intensity={50}
            tint={theme === 'dark' ? 'dark' : 'light'}
            style={styles.blurOverlay}
          />
        </TouchableWithoutFeedback>
      )}

      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: colors.lightGray, color: colors.text},
          ]}
          placeholder="Search location..."
          value={query}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
        />
        <TouchableOpacity
          style={[styles.searchButton, {backgroundColor: colors.buttonDefault}]}
          onPress={handleSearch}>
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 25,
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  searchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
});

export default SearchBar;
