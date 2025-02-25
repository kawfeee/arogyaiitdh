import React, { useState } from 'react'
import html2canvas from 'html2canvas'

const DashboardPatient = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false)
  const [message, setMessage] = useState('')

  const doctorPhone = "+91 98765 43210"  // Add doctor's phone number

  const stats = [
    {
      title: "Total Expense",
      value: "₹9,32,431.89",
      change: "Last bill: ₹1,60,145 on Feb 8",
      icon: "💰"
    },
    {
      title: "Heart Rate",
      value: "72 BPM",
      change: "Normal range",
      icon: "❤️"
    },
    {
      title: "Blood Pressure",
      value: "120/80",
      change: "Last checked 2h ago",
      icon: "🩺"
    },
    {
      title: "Overall Status",
      value: "Good",
      change: "Stable condition",
      icon: "✅"
    }
  ]

  const expenseLogs = [
    {
      title: "Room Charges",
      date: "Feb 09, 2023",
      amount: "₹22,999.00",
      category: "Accommodation"
    },
    {
      title: "Medical Tests",
      date: "Feb 08, 2023",
      amount: "₹1,49,999.00",
      category: "Laboratory"
    },
    {
      title: "Medication",
      date: "Feb 08, 2023",
      amount: "₹32,999.00",
      category: "Pharmacy"
    },
    {
      title: "Consultation",
      date: "Feb 07, 2023",
      amount: "₹14,999.00",
      category: "Professional Fee"
    },
    {
      title: "Physical Therapy",
      date: "Feb 07, 2023",
      amount: "₹11,999.00",
      category: "Treatment"
    }
  ]

  const handleDownloadScreenshot = () => {
    // Capture the entire dashboard
    const dashboardElement = document.querySelector('.dashboard-container')
    
    html2canvas(dashboardElement).then(canvas => {
      // Convert the canvas to a data URL
      const imgData = canvas.toDataURL('image/png')
      
      // Create a temporary link element
      const link = document.createElement('a')
      link.href = imgData
      link.download = 'patient-dashboard.png'
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      alert('Message sent')
      setMessage('')
      setIsChatOpen(false)
    }
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(doctorPhone)
    alert('Phone number copied to clipboard!')
  }

  return (
    <div className="p-6 space-y-6 dashboard-container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 rounded-md px-3 py-1">
            Jan 27, 2025 - Feb 09, 2025
          </div>
          <button 
            className="bg-white text-black px-4 py-1 rounded-md hover:bg-gray-200 transition-colors"
            onClick={handleDownloadScreenshot}
          >
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black/40 p-6 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">{stat.title}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-green-500">{stat.change}</div>
          </div>
        ))}
        
        {/* Doctor Profile Card */}
        <div className="bg-black/40 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//doctor_sahina.jpg "
              alt="Dr. Sahina"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-bold">Dr. Sahina</h3>
              <p className="text-sm text-gray-400">Primary Physician</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
              onClick={() => setIsPhoneDialogOpen(true)}
            >
              <span>📞</span> Call
            </button>
            <button 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
              onClick={() => setIsChatOpen(true)}
            >
              <span>💬</span> Message
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <div className="bg-black/40 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-15 z-1">Blood Pressure Monitor [Live]</h2>
          <div className="h-[300px] flex items-end justify-between">
            {/* Placeholder for vitals chart */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-12 bg-blue-700 rounded-t"
                style={{
                  height: `${Math.random() * 70 + 20}%`,
                }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
            <span>12 PM</span>
            <span>4 PM</span>
            <span>8 PM</span>
            <span>12 AM</span>
          </div>
        </div>

        <div className="bg-black/40 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Expense Log</h2>
          <p className="text-sm text-gray-400 mb-4">
            Total expenses this admission: ₹2,32,995.00
          </p>
          <div className="space-y-4">
            {expenseLogs.map((expense, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium">{expense.title}</div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span>{expense.date}</span>
                    <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <div className="font-medium text-red-500">{expense.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Chat Dialog */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-4 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//doctor_sahina.jpg"
                alt="Dr. Sahina"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-bold">Dr. Sahina</h3>
                <p className="text-sm text-gray-400">Primary Physician</p>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="ml-auto text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 bg-black/40 rounded-md p-3 text-white resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Phone Dialog */}
      {isPhoneDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-4 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//doctor_sahina.jpg"
                alt="Dr. Sahina"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-bold">Dr. Sahina</h3>
                <p className="text-sm text-gray-400">Primary Physician</p>
              </div>
              <button 
                onClick={() => setIsPhoneDialogOpen(false)}
                className="ml-auto text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black/40 rounded-md p-4">
                <p className="text-gray-400 text-sm mb-2">Phone Number</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{doctorPhone}</span>
                  <button
                    onClick={handleCopyPhone}
                    className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsPhoneDialogOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPatient