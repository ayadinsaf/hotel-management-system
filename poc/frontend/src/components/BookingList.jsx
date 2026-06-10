function BookingList({ bookings }) {
  if (bookings.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">Aucune réservation en cours</p>
    )
  }

  return (
    <ul className="space-y-3">
      {bookings.map((booking) => (
        <li key={booking.id} className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              {booking.guest.firstName} {booking.guest.lastName}
            </span>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {booking.status}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Chambre {booking.room.number} — {booking.room.type}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(booking.checkIn).toLocaleDateString('fr-FR')} →{' '}
            {new Date(booking.checkOut).toLocaleDateString('fr-FR')}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BookingList