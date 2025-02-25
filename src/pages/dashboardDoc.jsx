import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardDoc = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [rowsPerPage] = useState(10)
  const [currentPage] = useState(1)
  const navigate = useNavigate()

  const patients = [
    {
      id: "P-001",
      name: "Evan Lemuel",
      condition: "AIDS",
      title: "Regular checkup and insulin level monitoring required",
      status: "In Treatment",
      priority: "Medium",
      image: "https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//evan.jpg "
    },
    {
      id: "P-002",
      name: "Kaif Ali Khan",
      condition: "Hypertension",
      title: "Blood pressure monitoring and medication review needed",
      status: "Critical",
      priority: "High",
      image: "https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//kaif.jpg "
    },
    {
      id: "P-003",
      name: "Chintu Rai",
      condition: "Asthma",
      title: "Regular breathing treatment and inhaler prescription renewal",
      status: "Stable",
      priority: "Low",
      image: "https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//chintu_rai.jpg" 
    },
    {
      id: "P-004",
      name: "Shreenivas",
      condition: "Arthritis",
      title: "Joint pain management and physical therapy sessions",
      status: "In Treatment",
      priority: "Medium",
      image: "https://lkiomyofanbgecdqtfww.supabase.co/storage/v1/object/public/profile_pictures//shreenivas.jpg "
    },
    {
      id: "P-005",
      name: "Sample Kumar",
      condition: "Cardiac",
      title: "Post-surgery recovery and medication monitoring",
      status: "Critical",
      priority: "High",
      image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=random"
    },
    {
      id: "P-006",
      name: "Priya Patel",
      condition: "Migraine",
      title: "Chronic headache treatment and trigger analysis",
      status: "Stable",
      priority: "Medium",
      image: "https://ui-avatars.com/api/?name=Priya+Patel&background=random"
    },
    {
      id: "P-007",
      name: "Arjun Kumar",
      condition: "Thyroid",
      title: "Hormone level monitoring and medication adjustment",
      status: "In Treatment",
      priority: "Medium",
      image: "https://ui-avatars.com/api/?name=Arjun+Kumar&background=random"
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Stable':
        return '✅'
      case 'In Treatment':
        return '🏥'
      case 'Critical':
        return '🚨'
      case 'Discharged':
        return '🏡'
      default:
        return '🏥'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return '⚡'
      case 'Medium':
        return '⚪'
      case 'Low':
        return '🔵'
      default:
        return '⚪'
    }
  }

  const getConditionClass = (condition) => {
    switch (condition) {
      case 'Cardiac':
        return 'bg-red-500/10 text-red-500'
      case 'Diabetes':
        return 'bg-blue-500/10 text-blue-500'
      case 'Hypertension':
        return 'bg-purple-500/10 text-purple-500'
      case 'Asthma':
        return 'bg-green-500/10 text-green-500'
      case 'Arthritis':
        return 'bg-orange-500/10 text-orange-500'
      case 'Migraine':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'Thyroid':
        return 'bg-pink-500/10 text-pink-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Sahina !</h1>
        <p className="text-gray-400">Here's your patient list for today</p>
      </div>

      {/* Rest of the patient list table */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="flex-1 bg-black/40 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-black/40 border border-gray-700 px-4 py-2 rounded-md hover:bg-black/60">
            Status
          </button>
          <button className="bg-black/40 border border-gray-700 px-4 py-2 rounded-md hover:bg-black/60">
            Priority
          </button>
          <button className="bg-black/40 border border-gray-700 px-4 py-2 rounded-md hover:bg-black/60">
            View
          </button>
        </div>

        <div className="bg-black/40 rounded-lg border border-gray-800">
          <div className="grid grid-cols-[auto,auto,1fr,auto,auto,auto] gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
            <div className="flex items-center">
              <input type="checkbox" className="rounded border-gray-700" />
            </div>
            <div></div>
            <div>Patient Details</div>
            <div>Status</div>
            <div>Priority</div>
            <div></div>
          </div>

          {patients.map((patient) => (
            <div key={patient.id} className="grid grid-cols-[auto,auto,1fr,auto,auto,auto] gap-4 p-4 border-b border-gray-800 hover:bg-white/5">
              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-700" />
              </div>
              <div className="flex items-center">
                <img 
                  src={patient.image} 
                  alt={patient.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${getConditionClass(patient.condition)}`}>
                    {patient.condition}
                  </span>
                  <span className="text-gray-400">{patient.name}</span>
                </div>
                <div className="font-medium text-sm text-gray-300">{patient.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <span>{getStatusIcon(patient.status)}</span>
                <span>{patient.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{getPriorityIcon(patient.priority)}</span>
                <span>{patient.priority}</span>
              </div>
              <button className="px-2 py-1 text-gray-400 hover:text-white">⋮</button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <div>0 of {patients.length} patient(s) selected.</div>
          <div className="flex items-center gap-4">
            <div>
              Rows per page:
              <select className="bg-transparent ml-2">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div>Page 1 of 1</div>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-white/10 rounded">⟪</button>
              <button className="p-1 hover:bg-white/10 rounded">⟨</button>
              <button className="p-1 hover:bg-white/10 rounded">⟩</button>
              <button className="p-1 hover:bg-white/10 rounded">⟫</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardDoc