
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'deadline' | 'update' | 'consultation';
  priority: 'high' | 'medium' | 'low';
  jurisdiction: string;
}

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'SFDR RTS consultation deadline',
    date: '2024-01-15',
    type: 'deadline',
    priority: 'high',
    jurisdiction: 'EU'
  },
  {
    id: '2',
    title: 'MiFID II transaction reporting update',
    date: '2024-01-20',
    type: 'update',
    priority: 'medium',
    jurisdiction: 'EU'
  },
  {
    id: '3',
    title: 'UK ESG disclosure rules consultation',
    date: '2024-01-25',
    type: 'consultation',
    priority: 'medium',
    jurisdiction: 'UK'
  }
];

export const RegulatoryCalendar: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <AlertTriangle size={14} className="text-red-600" />;
      case 'update': return <Clock size={14} className="text-blue-600" />;
      default: return <Calendar size={14} className="text-purple-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar size={20} className="text-primary" />
          Regulatory Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(event.type)}
                  <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                </div>
                <Badge variant="outline" className={getPriorityColor(event.priority)}>
                  {event.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <Badge variant="outline" className="text-xs">
                  {event.jurisdiction}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
