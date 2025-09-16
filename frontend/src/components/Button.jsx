export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant] || styles.primary} ${className}`}>
      {children}
    </button>
  )
}
