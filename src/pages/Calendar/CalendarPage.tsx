import React, { useState } from 'react';
import { OCTOBER_2026_EVENTS } from '../../data/calendar';
import { CalendarEvent } from '../../types';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  BookOpen,
  FileCheck,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';

export const CalendarPage: React.FC = () => {
  const { showToast } = useLMS();

  // Selected day for detailed inspector
  const [selectedDay, setSelectedDay] = useState<number>(3); // Default to Oct 3 (Due date)

  // October 2026:
  // Day 1 is a Thursday (Index 4, 0-based for Sunday=0)
  const totalDays = 31;
  const startDayOfWeek = 4; // Thursday

  // Generate calendar days array
  const calendarCells = [];
  // Empty slots for previous month
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push({ day: null, isCurrentMonth: false });
  }
  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    calendarCells.push({ day: d, isCurrentMonth: true });
  }

  const getEventsForDay = (day: number): CalendarEvent[] => {
    return OCTOBER_2026_EVENTS.filter((e) => e.day === day);
  };

  const selectedDayEvents = getEventsForDay(selectedDay);

  const getEventBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'assignment':
        return <Badge variant="warning">Deadline</Badge>;
      case 'exam':
        return <Badge variant="danger">Exam</Badge>;
      default:
        return <Badge variant="primary">Class</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Schedule
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track lectures, lab submissions, and examination milestones.
          </p>
        </div>

        {/* Month selector indicator */}
        <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => showToast('Calendar Paging', 'Viewing Semester 5: October 2026.', 'info')}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs sm:text-sm font-bold text-slate-800">October 2026</span>
          <button
            type="button"
            onClick={() => showToast('Calendar Paging', 'Viewing Semester 5: October 2026.', 'info')}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar on Left, Selected Day & Upcoming on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden p-5 sm:p-6">
          {/* Day of week labels */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-3">
            {calendarCells.map((cell, idx) => {
              if (!cell.day) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="aspect-square sm:h-24 p-1.5 rounded-xl bg-slate-50/50 border border-transparent"
                  />
                );
              }

              const dayEvents = getEventsForDay(cell.day);
              const isSelected = cell.day === selectedDay;
              const hasEvents = dayEvents.length > 0;
              const hasExam = dayEvents.some((e) => e.type === 'exam');
              const hasAssignment = dayEvents.some((e) => e.type === 'assignment');

              return (
                <div
                  key={`day-${cell.day}`}
                  onClick={() => setSelectedDay(cell.day as number)}
                  className={`aspect-square sm:h-24 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                      : hasEvents
                      ? 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isSelected
                          ? 'text-indigo-700'
                          : cell.day === 1 || cell.day === 3
                          ? 'text-slate-900'
                          : 'text-slate-700'
                      }`}
                    >
                      {cell.day}
                    </span>

                    {/* Small Dot indicators on mobile */}
                    {hasEvents && (
                      <div className="flex gap-0.5 sm:hidden">
                        {hasExam && <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                        {hasAssignment && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                        {!hasExam && !hasAssignment && (
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Desktop event pill preview */}
                  <div className="hidden sm:block space-y-1">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate ${
                          ev.type === 'exam'
                            ? 'bg-rose-100 text-rose-700'
                            : ev.type === 'assignment'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-slate-400 font-semibold pl-1">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Legend:</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Assignment Deadlines
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Exams
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Scheduled Classes
            </span>
          </div>
        </div>

        {/* Right Column (1 Col): Selected Day Inspector & Upcoming List */}
        <div className="space-y-6">
          {/* Selected Day Inspector */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Selected Date
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  October {selectedDay}, 2026
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'Event' : 'Events'}
              </span>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No events or deadlines scheduled for this day. Select a highlighted date to inspect.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{ev.title}</h4>
                      {getEventBadge(ev.type)}
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ev.course}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ev.time}</span>
                      </div>
                      {ev.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{ev.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All Upcoming Events Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Academic Milestones</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {OCTOBER_2026_EVENTS.slice(0, 5).map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedDay(ev.day)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center shrink-0 text-slate-700">
                    <span className="text-[9px] uppercase font-bold text-slate-400">OCT</span>
                    <span className="text-xs font-extrabold leading-none">{ev.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{ev.title}</h5>
                    <p className="text-[11px] text-slate-500 truncate">{ev.course}</p>
                    <span className="text-[10px] text-slate-400">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
