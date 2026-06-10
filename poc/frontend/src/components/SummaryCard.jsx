function SummaryCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <span className="text-4xl font-bold text-blue-600">{value}</span>
      <span className="text-sm text-gray-500 mt-2">{label}</span>
    </div>
  )
}

export default SummaryCard