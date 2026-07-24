import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { DisabilitiesPage } from './pages/DisabilitiesPage'
import { FaqPage } from './pages/FaqPage'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { HomePage } from './pages/HomePage'
import { ResourceDetailPage } from './pages/ResourceDetailPage'
import { ResourcesPage } from './pages/ResourcesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="getting-started" element={<GettingStartedPage />} />
          <Route path="disabilities" element={<DisabilitiesPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/:id" element={<ResourceDetailPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
