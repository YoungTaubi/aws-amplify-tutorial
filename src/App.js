import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default withAuthenticator(App);
