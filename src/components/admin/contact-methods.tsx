import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ContactMethodsData {
    email: string;
    phone: string;
}

const ContactMethods: React.FC = () => {
    const [contactMethods, setContactMethods] = useState<ContactMethodsData>({ email: '', phone: '' });
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContactMethods = async () => {
            const { data, error } = await supabase
                .from('contact_methods')
                .select('*')
                .single();

            if (error) {
                console.error('Error fetching contact methods:', error);
                setError('Failed to load contact methods');
            } else {
                setContactMethods(data || { email: '', phone: '' });
            }
        };

        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching messages:', error);
                setError('Failed to load messages');
            } else {
                setMessages(data || []);
            }
        };

        fetchContactMethods();
        fetchMessages();
        setLoading(false);
    }, []);

    const handleUpdateContactMethods = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to update contact methods in the database
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Contact Methods</h2>
            <form onSubmit={handleUpdateContactMethods}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={contactMethods.email} 
                        onChange={(e) => setContactMethods({ ...contactMethods, email: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input 
                        type="text" 
                        value={contactMethods.phone} 
                        onChange={(e) => setContactMethods({ ...contactMethods, phone: e.target.value })} 
                    />
                </div>
                <button type="submit">Update</button>
            </form>

            <h3>Messages</h3>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.name}</strong>: {message.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactMethods;
