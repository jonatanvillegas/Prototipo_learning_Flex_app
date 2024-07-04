import 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthProvider';
import { RootNavigator } from './stack/Stack';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

