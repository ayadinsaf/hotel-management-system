import { useState, useEffect } from 'react'
import { getDashboardSummary } from '../api/dashboard'
import { getActiveBookings } from '../api/bookings'
import SummaryCard from '../components/SummaryCard'
import BookingList from '../components/BookingList'

function Dashboard({ token, onLogout }) {
  const [summary, setSummary] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryData, bookingsData] = await Promise.all([
          getDashboardSummary(token),
          getActiveBookings(token),
        ])
        setSummary(summaryData)
        setBookings(bookingsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={onLogout}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Déconnexion
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <SummaryCard label="Réservations actives" value={summary.activeBookings} />
          <SummaryCard label="Chambres disponibles" value={summary.availableRooms} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Réservations en cours
          </h2>
          <BookingList bookings={bookings} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard