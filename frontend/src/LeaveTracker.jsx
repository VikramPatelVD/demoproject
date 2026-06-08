import React, { useState } from 'react';

const LeaveTracker = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [hours, setHours] = useState('');
    const [rate, setRate] = useState('');
    const [totalPay, setTotalPay] = useState(0);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Watch values and calculate automatically
    const handleCalculate = (updatedHours, updatedRate) => {
        const h = parseFloat(updatedHours) || 0;
        const r = parseFloat(updatedRate) || 0;
        setTotalPay(parseFloat((h * r).toFixed(2)));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!employeeName || !hours || !rate) {
            setMessage('⚠️ Please complete all form inputs.');
            setIsError(true);
            return;
        }

        const payload = {
            employeeName: employeeName,
            overtimeHours: parseInt(hours),
            hourlyRate: parseFloat(rate),
            totalOvertimePay: totalPay
        };

        try {
            const response = await fetch('/api/leaves', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setMessage('✅ Overtime allocation committed to database!');
                setIsError(false);
                setEmployeeName('');
                setHours('');
                setRate('');
                setTotalPay(0);
            } else {
                setMessage('❌ Server error updating database.');
                setIsError(true);
            }
        } catch {
            setMessage('❌ Cannot connect to API endpoint.');
            setIsError(true);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3 style={{ color: '#1F4E79' }}>Overtime Calculations Tracker</h3>
            <form onSubmit={handleSave}>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Employee Name:</label>
                    <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Overtime Hours:</label>
                    <input type="number" value={hours} onChange={(e) => { setHours(e.target.value); handleCalculate(e.target.value, rate); }} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Hourly Rate ($):</label>
                    <input type="number" value={rate} onChange={(e) => { setRate(e.target.value); handleCalculate(hours, e.target.value); }} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                
                <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                    <strong>Calculated Overtime Compensation:</strong>
                    <h2 style={{ margin: '5px 0 0 0', color: '#2e7d32' }}>${totalPay.toFixed(2)}</h2>
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Save Overtime Logs
                </button>
            </form>

            {message && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: isError ? '#fff0f0' : '#f0fff0', color: isError ? '#b71c1c' : '#1b5e20', border: '1px solid', borderRadius: '4px', textAlign: 'center' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default LeaveTracker;