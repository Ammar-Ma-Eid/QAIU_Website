'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Edit, Trash2, Users, Calendar, Newspaper, BookMarked } from 'lucide-react';
import { getActivities } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import type { Activity } from '@/lib/types';

function getActionIcon(action: string) {
    switch (action) {
        case 'created':
            return <Plus className="h-4 w-4 text-green-600" />;
        case 'updated':
            return <Edit className="h-4 w-4 text-blue-600" />;
        case 'deleted':
            return <Trash2 className="h-4 w-4 text-red-600" />;
        default:
            return <Clock className="h-4 w-4" />;
    }
}

function getEntityIcon(entity: string) {
    switch (entity) {
        case 'member':
            return <Users className="h-4 w-4" />;
        case 'event':
            return <Calendar className="h-4 w-4" />;
        case 'blog':
            return <Newspaper className="h-4 w-4" />;
        case 'glossary':
            return <BookMarked className="h-4 w-4" />;
        default:
            return <Clock className="h-4 w-4" />;
    }
}

function getActionColor(action: string) {
    switch (action) {
        case 'created':
            return 'bg-green-100 text-green-800 hover:bg-green-200';
        case 'updated':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
        case 'deleted':
            return 'bg-red-100 text-red-800 hover:bg-red-200';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
}

function getEntityLabel(entity: string) {
    switch (entity) {
        case 'member':
            return 'Team Member';
        case 'event':
            return 'Event';
        case 'blog':
            return 'Blog Post';
        case 'glossary':
            return 'Glossary Term';
        default:
            return entity;
    }
}

export function ActivityLog() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        // Fetch activities and update state
        const fetchAndSetActivities = async () => {
            const fetchedActivities = await getActivities();
            setActivities(fetchedActivities);
        };

        fetchAndSetActivities();

        // Refresh activities every 5 seconds
        const interval = setInterval(() => {
            fetchAndSetActivities();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                <div className="flex-shrink-0 mt-1">
                                    {getActionIcon(activity.action)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className={getActionColor(activity.action)}>
                                            {activity.action === 'created' ? 'Created' :
                                                activity.action === 'updated' ? 'Updated' :
                                                    activity.action === 'deleted' ? 'Deleted' : activity.action}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                            {getEntityIcon(activity.entity)}
                                            <span className="text-sm font-medium">
                                                {getEntityLabel(activity.entity)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        <span className="font-medium">{activity.entityName}</span>
                                    </p>
                                    {activity.details && (
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {activity.details}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No recent activity</p>
                            <p className="text-xs">Actions will appear here</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}