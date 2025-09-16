export default function BatchCard({ batch }) {
  return (
    <div className="border rounded p-3 bg-white shadow-sm">
      <div className="font-semibold">Batch: {batch.batch_code}</div>
      <div>Medicine: {batch.medicine?.name}</div>
      <div>Manufacture: {batch.manufacture_date}</div>
      <div>Expiry: {batch.expiry_date}</div>
      <div>Status: {batch.status}</div>
    </div>
  )
}
