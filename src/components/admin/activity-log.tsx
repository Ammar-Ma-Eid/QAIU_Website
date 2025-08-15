'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Edit, Plus, Trash2 } from 'lucide-react';

type Activity = {
    id: string;
    action: string;
    entity: string;
    timestamp: string;
    user: string;
    details?: string;
};

const activities: Activity[] = [];

const getActionIcon = (action: string) => {
    switch (action) {
        case 'created':
            return <Plus className="h-4 w-4 text-green-500" />;
        case 'updated':
            return <Edit className="h-4 w-4 text-blue-500" />;
        case 'deleted':
            return <Trash2 className="h-4 w-4 text-red-500" />;
        default:
            return <User className="h-4 w-4 text-gray-500" />;
    }
};

const getActionColor = (action: string) => {
    switch (action) {
        case 'created':
            return 'bg-green-100 text-green-800';
        case 'updated':
            return 'bg-blue-100 text-blue-800';
        case 'deleted':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getEntityLabel = (entity: string) => {
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
};

export function ActivityLog() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Activity Log
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
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
                                        <span className="text-sm font-medium">
                                            {getEntityLabel(activity.entity)}
                                        </span>
                                    </div>
                                    {activity.details && (
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {activity.details}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <User className="h-3 w-3" />
                                        <span>{activity.user}</span>
                                        <span>•</span>
                                        <span>{new Date(activity.timestamp).toLocaleString('en-US')}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No activities yet</p>
                            <p className="text-sm">Activities will appear here when you manage content</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
