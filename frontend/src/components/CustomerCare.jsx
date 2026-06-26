import React, { useState } from 'react';

const CustomerCare = () => {
    const [ticket, setTicket] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!ticket.name || !ticket.email || !ticket.message) return;
        setSubmitted(true);
    };

    return (
        <div className="full-width-panel" style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
            <h2>🤝 Customer Care Help Center</h2>
            <p style={{ color: '#666' }}>Have deployment layout questions or order processing concerns? Open a local support connection ticket below.</p>
            <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '1.5rem 0' }} />

            {submitted ? (
                <div style={{ background: '#d4edda', color: '#155724', padding: '1.5rem', borderRadius: '6px', border: '1px solid #c3e6cb', textAlign: 'center' }}>
                    <h3>✅ Ticket Received!</h3>
                    <p>Thank you <strong>{ticket.name}</strong>, our engineering team has logged your query and will reply via <strong>{ticket.email}</strong> shortly.</p>
                    <button onClick={() => { setSubmitted(false); setTicket({ name: '', email: '', message: '' }); }} style={{ background: '#fff', color: '#155724', border: '1px solid #c3e6cb', marginTop: '1rem' }}>Submit New Ticket</button>
                </div>
            ) : (
                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontWeight: '500' }}>Your Full Name</label>
                        <input type="text" required placeholder="John Doe" value={ticket.name} onChange={(e) => setTicket({...ticket, name: e.target.value})} style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontWeight: '500' }}>Email Address</label>
                        <input type="email" required placeholder="john@example.com" value={ticket.email} onChange={(e) => setTicket({...ticket, email: e.target.value})} style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontWeight: '500' }}>How can we help you today?</label>
                        <textarea rows="4" required placeholder="Describe your issue or order question here..." value={ticket.message} onChange={(e) => setTicket({...ticket, message: e.target.value})} style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit' }}></textarea>
                    </div>

                    <button type="submit" style={{ background: '#2c3e50', color: 'white', padding: '0.75rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        📨 Submit Support Request
                    </button>
                </form>
            )}
        </div>
    );
};

export default CustomerCare;