import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#ddd',
  },
  actions: {
    marginTop: 20,
    width: '80%',
    gap: 15,
  },

  // Typography
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
  },
  hint: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    width: '100%',
  },

  // Buttons (used with <Pressable> or custom)
  buttonPrimary: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 13,
  },

  deleteButton: {
    padding: 16,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#ffe6e6',
  },

  buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },

  buttonUpdate: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
  },

  // Cards
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDetail: {
    fontSize: 14,
    color: '#555',
  },

  // Links
  link: {
    color: '#FFF',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    fontWeight: 'bold',
  },

});
