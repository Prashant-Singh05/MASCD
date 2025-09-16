export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t bg-white mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-600">© {year} MASCD. All rights reserved.</div>
        <div className="flex gap-3 text-gray-600">
          <a href="#" aria-label="Twitter" className="hover:text-blue-600">Twitter</a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">LinkedIn</a>
          <a href="#" aria-label="GitHub" className="hover:text-blue-600">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
