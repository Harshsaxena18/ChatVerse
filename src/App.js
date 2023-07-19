import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import RegisterForm from './components/RegisterForm';
import './App.css';
 
const projectID = 'f1df438a-31ee-46a7-bfe5-b23d38c1622c';
 
const App = () => {
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.reload();
  };

  if (!localStorage.getItem('username')) {
    return <RegisterForm />;
  }

  return (
    <>
      <nav className="navbar navbar-custom" >
        <div className="container-fluid">
          <span className="navbar-brand" style={{fontSize:15,color:'white'}}>ChatVerse</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container-fluid">
        <ChatEngine
          height="100vh"
          projectID={projectID}
          userName={localStorage.getItem('username')}
          userSecret={localStorage.getItem('password')}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
      </div>
    </>
  );
};

export default App;
