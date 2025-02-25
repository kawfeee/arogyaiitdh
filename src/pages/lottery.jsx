import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGift, FaHeartbeat, FaUserMd, FaSpinner } from 'react-icons/fa';
import { RiHealthBookFill } from 'react-icons/ri';
import { MdLocalOffer } from 'react-icons/md';

const LotteryPage = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [participants, setParticipants] = useState(142); // Mock participant count
  
  const prizes = [
    {
      icon: <FaUserMd className="text-2xl" />,
      title: "Free Consultation",
      description: "3 Free consultations with specialists of your choice"
    },
    {
      icon: <RiHealthBookFill className="text-2xl" />,
      title: "Health Checkup",
      description: "Complete body checkup worth ₹5000"
    },
    {
      icon: <MdLocalOffer className="text-2xl" />,
      title: "Special Discount",
      description: "50% off on all lab tests for 6 months"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEnterLottery = async () => {
    // Here you would typically interact with your blockchain contract
    setIsEntered(true);
    setParticipants(prev => prev + 1);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <FaGift className="text-5xl text-blue-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="gradient-title font-extrabold text-4xl mb-4">Arogya Health Lottery</h1>
          <p className="gradient-title font-extrabold text-2xl">Win amazing health benefits and special offers!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="text-blue-500 mb-4">{prize.icon}</div>
              <h3 className="text-gray-800 font-extrabold text-2xl mb-2">{prize.title}</h3>
              <p className="text-gray-600">{prize.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Next Draw In</h2>
            <div className="text-3xl font-mono text-blue-600">{formatTime(timeLeft)}</div>
          </div>

          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-blue-600">{participants}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Your Entries</p>
              <p className="text-2xl font-bold text-blue-600">{isEntered ? 1 : 0}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterLottery}
            disabled={isEntered}
            className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-colors
              ${isEntered 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isEntered ? (
              <span className="flex items-center justify-center gap-2">
                <FaHeartbeat className="animate-pulse" />
                Entered Successfully
              </span>
            ) : (
              'Enter Lottery'
            )}
          </motion.button>
        </div>

        <div className="text-center text-gray-600">
          <p className="mb-2">Powered by Blockchain Technology</p>
          <p className="text-sm">Winners will be selected automatically through smart contract</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LotteryPage;