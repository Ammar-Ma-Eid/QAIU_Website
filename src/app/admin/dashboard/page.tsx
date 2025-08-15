import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getMembers, getUpcomingEvents, getPastEvents, getBlogPosts, getGlossaryTerms } from '@/lib/data';
import { format } from 'date-fns';
import { Users, Calendar, BarChart3, PlusCircle, Edit, Trash2, Newspaper, Link as LinkIcon, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MemberForm } from '@/components/admin/member-form';
import { EventForm } from '@/components/admin/event-form';
import { BlogPostForm } from '@/components/admin/blog-post-form';
import { GlossaryTermForm } from '@/components/admin/glossary-term-form';
import { deleteMember, deleteEvent, deleteBlogPost, deleteGlossaryTerm } from '../../admin/actions';
import { DeleteConfirmationDialog } from '@/components/admin/delete-confirmation-dialog';
import { RefreshButton } from '@/components/admin/refresh-button';
import { LogoutButton } from '@/components/admin/logout-button';
import { ActivityLog } from '@/components/admin/activity-log';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    try {
        const [members, upcomingEvents, pastEvents, blogPosts, glossaryTerms] = await Promise.all([
            getMembers(),
            getUpcomingEvents(),
            getPastEvents(),
            getBlogPosts(),
            getGlossaryTerms()
        ]);

        const totalMembers = members.length;
        const totalUpcomingEvents = upcomingEvents.length;
        const totalPastEvents = pastEvents.length;
        const totalBlogPosts = blogPosts.length;
        const totalGlossaryTerms = glossaryTerms.length;

        return (
            <div className="min-h-screen">
                <div className="">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                                <p className="mt-2 text-lg text-muted-foreground">
                                    Manage your website's content.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <RefreshButton />
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-8">
                    <Tabs defaultValue="dashboard" className="w-full">
                        <TabsList className="mb-8 grid h-auto w-full grid-cols-1 sm:h-10 sm:grid-cols-5">
                            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                            <TabsTrigger value="members">Members</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                            <TabsTrigger value="blog">Blog</TabsTrigger>
                            <TabsTrigger value="glossary">Glossary</TabsTrigger>
                        </TabsList>

                        <TabsContent value="dashboard">
                            <section className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalMembers}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalUpcomingEvents}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Past Events</CardTitle>
                                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalPastEvents}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                                        <Newspaper className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalBlogPosts}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Glossary Terms</CardTitle>
                                        <BookMarked className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalGlossaryTerms}</div>
                                    </CardContent>
                                </Card>
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <ActivityLog />
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <Button variant="outline" className="w-full h-16 flex items-center justify-start gap-3 px-4">
                                                <PlusCircle className="h-5 w-5" />
                                                <span className="text-base font-medium">Add Member</span>
                                            </Button>
                                            <Button variant="outline" className="w-full h-16 flex items-center justify-start gap-3 px-4">
                                                <Calendar className="h-5 w-5" />
                                                <span className="text-base font-medium">Add Event</span>
                                            </Button>
                                            <Button variant="outline" className="w-full h-16 flex items-center justify-start gap-3 px-4">
                                                <Newspaper className="h-5 w-5" />
                                                <span className="text-base font-medium">Add Post</span>
                                            </Button>
                                            <Button variant="outline" className="w-full h-16 flex items-center justify-start gap-3 px-4">
                                                <BookMarked className="h-5 w-5" />
                                                <span className="text-base font-medium">Add Term</span>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="members">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Team Members</CardTitle>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Add Member
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Add New Member</DialogTitle>
                                                <DialogDescription>
                                                    Fill in the details for the new team member. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <MemberForm />
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>LinkedIn</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {members.length > 0 ? (
                                                members.map((member) => (
                                                    <TableRow key={member.id}>
                                                        <TableCell className="font-medium">{member.name}</TableCell>
                                                        <TableCell>{member.role}</TableCell>
                                                        <TableCell>{member.email}</TableCell>
                                                        <TableCell>
                                                            {member.linkedinUrl && member.linkedinUrl !== '#' ? (
                                                                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                                                    <LinkIcon className="h-3 w-3" />
                                                                    Profile
                                                                </a>
                                                            ) : (
                                                                <span className="text-muted-foreground">N/A</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right space-x-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="icon">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Member</DialogTitle>
                                                                        <DialogDescription>
                                                                            Update the details for {member.name}. Click save when you're done.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <MemberForm member={member} />
                                                                </DialogContent>
                                                            </Dialog>
                                                            <DeleteConfirmationDialog
                                                                trigger={
                                                                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                }
                                                                description={`This action cannot be undone. This will permanently delete ${member.name} from the database.`}
                                                                deleteAction={deleteMember.bind(null, member.id)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center">
                                                        No members found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="events" className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h2 className="font-headline text-2xl font-bold">Manage Events</h2>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm">
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Event
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Add New Event</DialogTitle>
                                            <DialogDescription>
                                                Fill in the details for the new event. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <EventForm />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {[
                                { title: "Upcoming Events", events: upcomingEvents },
                                { title: "Past Events", events: pastEvents }
                            ].map((group) => (
                                <Card key={group.title}>
                                    <CardHeader><CardTitle>{group.title}</CardTitle></CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {group.events.length > 0 ? (
                                                    group.events.map((event) => (
                                                        <TableRow key={event.id}>
                                                            <TableCell className="font-medium">{event.title}</TableCell>
                                                            <TableCell>{format(new Date(event.date), 'PPP')}</TableCell>
                                                            <TableCell className="text-right space-x-2">
                                                                <Button variant="outline" size="icon" asChild>
                                                                    <Link href={`/events/${event.id}`} target="_blank" aria-label="View event">
                                                                        <LinkIcon className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                                <Dialog>
                                                                    <DialogTrigger asChild><Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button></DialogTrigger>
                                                                    <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                                                        <DialogHeader>
                                                                            <DialogTitle>Edit Event</DialogTitle>
                                                                            <DialogDescription>Update details for {event.title}.</DialogDescription>
                                                                        </DialogHeader>
                                                                        <EventForm event={event} />
                                                                    </DialogContent>
                                                                </Dialog>
                                                                <DeleteConfirmationDialog
                                                                    trigger={
                                                                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    }
                                                                    description={`This will permanently delete "${event.title}" from the database.`}
                                                                    deleteAction={deleteEvent.bind(null, event.id)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="h-24 text-center">
                                                            No {group.title.toLowerCase()} found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="blog">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Blog Posts</CardTitle>
                                    <Dialog>
                                        <DialogTrigger asChild><Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Post</Button></DialogTrigger>
                                        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Add New Blog Post</DialogTitle>
                                                <DialogDescription>Write a new blog post. Click save when you're done.</DialogDescription>
                                            </DialogHeader>
                                            <BlogPostForm />
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Author</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {blogPosts.length > 0 ? (
                                                blogPosts.map((post) => (
                                                    <TableRow key={post.id}>
                                                        <TableCell className="font-medium">{post.title}</TableCell>
                                                        <TableCell>{post.author}</TableCell>
                                                        <TableCell>{format(new Date(post.date), 'PPP')}</TableCell>
                                                        <TableCell className="text-right space-x-2">
                                                            <Button variant="outline" size="icon" asChild>
                                                                <Link href={`/blog/${post.id}`} target="_blank" aria-label="View post">
                                                                    <LinkIcon className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                            <Dialog>
                                                                <DialogTrigger asChild><Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button></DialogTrigger>
                                                                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Blog Post</DialogTitle>
                                                                        <DialogDescription>Update the post "{post.title}".</DialogDescription>
                                                                    </DialogHeader>
                                                                    <BlogPostForm post={post} />
                                                                </DialogContent>
                                                            </Dialog>
                                                            <DeleteConfirmationDialog
                                                                trigger={
                                                                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                }
                                                                description={`This will permanently delete "${post.title}" from the database.`}
                                                                deleteAction={deleteBlogPost.bind(null, post.id)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-24 text-center">
                                                        No blog posts found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="glossary">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Glossary Terms</CardTitle>
                                    <Dialog>
                                        <DialogTrigger asChild><Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Term</Button></DialogTrigger>
                                        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Add New Glossary Term</DialogTitle>
                                                <DialogDescription>Add a new term and its definition to the glossary.</DialogDescription>
                                            </DialogHeader>
                                            <GlossaryTermForm />
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Term</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Definition</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {glossaryTerms.length > 0 ? (
                                                glossaryTerms.map((term) => (
                                                    <TableRow key={term.id}>
                                                        <TableCell className="font-medium">{term.term}</TableCell>
                                                        <TableCell>{term.category}</TableCell>
                                                        <TableCell className="max-w-sm truncate">{term.definition}</TableCell>
                                                        <TableCell className="text-right space-x-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild><Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button></DialogTrigger>
                                                                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Glossary Term</DialogTitle>
                                                                        <DialogDescription>Update the term "{term.term}".</DialogDescription>
                                                                    </DialogHeader>
                                                                    <GlossaryTermForm term={term} />
                                                                </DialogContent>
                                                            </Dialog>
                                                            <DeleteConfirmationDialog
                                                                trigger={
                                                                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                }
                                                                description={`This will permanently delete "${term.term}" from the glossary.`}
                                                                deleteAction={deleteGlossaryTerm.bind(null, term.id)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-24 text-center">
                                                        No glossary terms found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Dashboard error:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Loading Dashboard</h1>
                    <p className="text-muted-foreground mb-4">
                        There was an error loading the dashboard. Please try refreshing the page.
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Refresh Page
                    </Button>
                </div>
            </div>
        );
    }
} 