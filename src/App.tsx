import ClientTable from './widgets/ClientTable/ClientTable.tsx'
import SessionLog from './widgets/SessionLog/SessionLog.tsx'
import { useClientLogic } from './features/useClientLogic'
import './App.css'

function App() {
    useClientLogic()

    return (
        <div className="app-container">
            <header>
                <h1>Credit Limit CRM</h1>
            </header>

            <main>
                <ClientTable />
                <SessionLog />
            </main>
        </div>
    )
}

export default App
