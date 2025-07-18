import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    optionsContainer: {
    marginTop: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedCard: {
    backgroundColor: '#E0F2FE',
    borderColor: '#3B82F6',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconBox: {
    backgroundColor: '#3B82F6',
  },
  textBox: {
    marginLeft: 12,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  selectedTitle: {
    color: '#1D4ED8',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default styles