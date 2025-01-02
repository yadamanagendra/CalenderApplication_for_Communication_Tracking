import { Communication } from '../../types';
import { isBefore, isToday } from 'date-fns';

type CommunicationStatus = 'overdue' | 'due' | 'completed' | 'upcoming';

export function getCommunicationStatus(communications: Communication[]): CommunicationStatus {
  const now = new Date();

  let hasOverdue = false;
  let hasDueToday = false;
  let hasCompleted = false;

  for (const comm of communications) {
    const commDate = new Date(comm.date);
    
    if (!comm.completed) {
      if (isBefore(commDate, now) && !isToday(commDate)) {
        hasOverdue = true;
      } else if (isToday(commDate)) {
        hasDueToday = true;
      }
    } else {
      hasCompleted = true;
    }

    // Short-circuit if we already know the status
    if (hasOverdue) return 'overdue';
    if (hasDueToday) return 'due';
    if (hasCompleted) return 'completed';
  }

  return 'upcoming';
}
