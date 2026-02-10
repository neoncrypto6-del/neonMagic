import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
const NAMES = [
'Andrew',
'Sarah',
'Michael',
'Jessica',
'David',
'Emily',
'James',
'Emma',
'Robert',
'Olivia',
'William',
'Sophia',
'Joseph',
'Isabella',
'Thomas',
'Mia',
'Charles',
'Charlotte',
'Daniel',
'Amelia',
'Matthew',
'Harper',
'Anthony',
'Evelyn',
'Donald',
'Abigail',
'Mark',
'Ella',
'Paul',
'Elizabeth'];

export function NotificationToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({
    name: '',
    amount: 0
  });
  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      triggerNotification();
    }, 3000);
    // Recurring loop
    const loopInterval = setInterval(
      () => {
        triggerNotification();
      },
      Math.random() * 5000 + 8000
    ); // Random interval between 8-13 seconds
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(loopInterval);
    };
  }, []);
  const triggerNotification = () => {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomAmount = Math.floor(Math.random() * 24500) + 500; // $500 - $25,000
    setNotification({
      name: randomName,
      amount: randomAmount
    });
    setIsVisible(true);
    // Hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          x: -20
        }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0
        }}
        exit={{
          opacity: 0,
          y: 20,
          x: -20
        }}
        transition={{
          duration: 0.5,
          type: 'spring'
        }}
        className="fixed bottom-6 left-6 z-50 max-w-sm w-full">

          <div className="glass-card p-4 rounded-xl border-l-4 border-neon-green flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <div className="bg-neon-green/20 p-2 rounded-full mr-4">
              <CheckCircle className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                <span className="text-neon-cyan font-bold">
                  {notification.name}
                </span>{' '}
                Successfully Claimed
              </p>
              <p className="text-gray-300 text-xs mt-1">
                30% Bonus for{' '}
                <span className="text-neon-green font-bold">
                  ${notification.amount.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}