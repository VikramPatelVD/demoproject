import React, { useState } from 'react';

const SalaryCalculator = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [basicSalary, setBasicSalary] = useState('');
    const [calculations, setCalculations] = useState({
        houseRent: 0,
        medical: 0,
        tax: 0,
        netSalary: 0
    });
    const [statusMessage, setStatusMessage] = useState('');

    // Dynamically calculate breakdowns when basic salary changes
    const handleSalaryChange = (e) => {
        const basic = parseFloat(e.target.value) || 0;
        setBasicSalary(e.target.value);

        // Custom Breakdown Logic (Adjust percentage values as required)
        const houseRent = basic * 0.30;  // 30% House Rent Allowance
        const medical = basic * 0.20;    // 20% Medical Allowance
        const tax = basic * 0.15;        // 15% Income Tax Deduction
        const netSalary = (basic + houseRent + medical) - tax;

        setCalculations({
            houseRent: parseFloat(houseRent.toFixed(2)),
            medical: parseFloat(medical.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            netSalary: parseFloat(netSalary.toFixed(2))
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!employeeName || !basicSalary) {
            setStatusMessage('Please enter employee name and basic salary.');
            return;
        }

        const payload = {
            employeeName,
            basicSalary: parseFloat(basicSalary),
            houseRentAllowance: calculations.houseRent,
            medicalAllowance: calculations.medical,
            taxDeduction: calculations.tax,
            netSalary: calculations.netSalary
        };

        try {
            // Replace with your actual backend URL if different
            const response = await fetch('/api/salaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (response.ok) {
                setStatusMessage('Saved successfully to database!');
                // Reset inputs
                setEmployeeName('');
                setBasicSalary('');
                setCalculations({ houseRent: 0, medical: 0, tax: 0, netSalary: 0 });
            } else {
                setStatusMessage(`Error: ${result.message || 'Failed to save context.'}`);
            }
        } catch (error) {
            setStatusMessage('Error connecting to the server.');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
            <h2>Salary Structure & Calculation</h2>
            <form onSubmit={handleSave}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Employee Name:</label>
                    <input 
                        type="text" 
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        placeholder="John Doe"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Basic Salary ($):</label>
                    <input 
                        type="number" 
                        value={basicSalary}
                        onChange={handleSalaryChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        placeholder="Enter amount"
                    />
                </div>

                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                    <h4>Calculated Breakdown:</h4>
                    <p>House Rent Allowance (30%): <strong>${calculations.houseRent}</strong></p>
                    <p>Medical Allowance (20%): <strong>${calculations.medical}</strong></p>
                    <p>Tax Deduction (15%): <strong style={{ color: 'red' }}>-${calculations.tax}</strong></p>
                    <hr />
                    <h3>Net Payable Salary: <span style={{ color: 'green' }}>${calculations.netSalary}</span></h3>
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                    Save Calculation to Database
                </button>
            </form>

            {statusMessage && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e2e3e5', textAlign: 'center', borderRadius: '4px' }}>
                    {statusMessage}
                </div>
            )}
        </div>
    );
};

export default SalaryCalculator;