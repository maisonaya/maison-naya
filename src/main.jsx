import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('Erreur Maison Naya :', error, info) }
  render() {
    if (this.state.hasError) return <main style={{minHeight:'100vh',padding:'60px',background:'#FBF7F2',fontFamily:'Arial'}}><h1>Une erreur empêche l’affichage du site</h1><pre style={{marginTop:20,padding:20,background:'#fff',color:'#a00000',whiteSpace:'pre-wrap'}}>{this.state.error?.message || 'Erreur inconnue'}</pre></main>
    return this.props.children
  }
}

const root = document.getElementById('root')
if (!root) throw new Error("L'élément #root est introuvable")
ReactDOM.createRoot(root).render(<ErrorBoundary><App /></ErrorBoundary>)
