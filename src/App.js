import RegistrationButton from './components/RegistrationButton';
import NavBar from './components/NavBar';
import TableControlComponent from './components/TableControlComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatabaseProvider from './components/DatabaseProvider';

function App() {

    return (
        <DatabaseProvider>
            <NavBar/>
            <RegistrationButton/>
            <TableControlComponent/>
        </DatabaseProvider>
    );
}

export default App;
