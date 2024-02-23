import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { useMovieSearch } from './hooks/useMovieSearch';

const App = () => {
  const [query, setQuery] = useState('');
  const { search, data, error, loading } = useMovieSearch('6eaf5a8b61fa720702d0d0a8560843ec');

  const handleSearch = () => {
    search(query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie search page</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for movies..."
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.movieImage}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  movieCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  movieImage: {
    width: 200,
    height: 300,
  },
  movieTitle: {
    marginTop: 5,
  },
});

export default App;
