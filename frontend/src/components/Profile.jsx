import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: '',
    address: '',
    city: '',
    district: '',
    pincode: '',
    mobile: ''
  });

  const [loadingLocation, setLoadingLocation] = useState(false);
  
  // 🔥 State to handle the beautiful inline success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // AUTOMATIC PINCODE LOOKUP ENGINE WITH LOCAL OVERRIDES
  useEffect(() => {
    if (profileData.pincode.length === 6) {
      if (profileData.pincode === '627809') {
        setProfileData((prev) => ({
          ...prev,
          city: 'Shengottai',
          district: 'Tenkasi'
        }));
        return;
      }

      const fetchLocationDetails = async () => {
        setLoadingLocation(true);
        try {
          const response = await axios.get(`https://api.postalpincode.in/pincode/${profileData.pincode}`);
          const data = response.data[0];

          if (data.Status === "Success" && data.PostOffice && data.PostOffice.length > 0) {
            const firstRecord = data.PostOffice[0];
            setProfileData((prev) => ({
              ...prev,
              city: firstRecord.District,
              district: firstRecord.District
            }));
          }
        } catch (error) {
          console.error("Error looking up pincode geo-data:", error);
        } finally {
          setLoadingLocation(false);
        }
      };

      fetchLocationDetails();
    }
  }, [profileData.pincode]);

  // NO MORE POPUP ALERTS!
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Trigger our inline success alert
    setShowSuccessMessage(true);

    // Automatically hide it after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSave} style={formCardStyle}>
        <h2 style={headerStyle}>👤 My Delivery Settings</h2>
        <hr style={dividerStyle} />

        <label style={labelStyle}>Full Name</label>
        <input 
          type="text" name="fullName" value={profileData.fullName} 
          onChange={handleChange} style={inputStyle} required 
        />

        <label style={labelStyle}>Flat / House No. / Area</label>
        <input 
          type="text" name="address" value={profileData.address} 
          onChange={handleChange} style={inputStyle} required 
        />

        <label style={labelStyle}>Pincode</label>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" name="pincode" value={profileData.pincode} 
            onChange={handleChange} style={inputStyle} placeholder="Enter 6-digit Pincode" maxLength="6" required 
          />
          {loadingLocation && (
            <span style={spinnerStyle}>⚡ Detecting location...</span>
          )}
        </div>

        <label style={labelStyle}>City</label>
        <input 
          type="text" name="city" value={profileData.city} 
          onChange={handleChange} style={inputStyle} placeholder="City Name" required 
        />

        <label style={labelStyle}>District</label>
        <input 
          type="text" name="district" value={profileData.district} 
          onChange={handleChange} style={inputStyle} placeholder="District Name" required 
        />

        <label style={labelStyle}>Mobile Number</label>
        <input 
          type="text" name="mobile" value={profileData.mobile} 
          onChange={handleChange} style={inputStyle} placeholder="10-digit number" required 
        />

        {/* 🔥 INLINE SUCCESS MESSAGE ROW */}
        {showSuccessMessage && (
          <div style={inlineSuccessStyle}>
            🎉 Delivery settings updated successfully!
          </div>
        )}

        <button type="submit" style={saveBtnStyle}>Save Changes</button>
      </form>
    </div>
  );
}

// ==========================================
// 🎨 LAYOUT STYLING
// ==========================================
const containerStyle = { display: 'flex', justifyContent: 'center', padding: '20px 0' };
const formCardStyle = { background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '100%', maxWidth: '550px', display: 'flex', flexDirection: 'column' };
const headerStyle = { margin: '0 0 10px 0', fontSize: '20px', color: '#1a1a24' };
const dividerStyle = { border: 'none', borderTop: '2px solid #ffaa00', marginBottom: '20px' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '6px', marginTop: '12px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px', boxSizing: 'border-box', outline: 'none' };
const saveBtnStyle = { background: '#ffaa00', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' };
const spinnerStyle = { position: 'absolute', right: '10px', top: '10px', fontSize: '12px', color: '#ffaa00', fontWeight: '600' };

/* 🔥 STYLING FOR NATIVE SUCCESS BANNER */
const inlineSuccessStyle = {
  backgroundColor: '#28a745',
  color: '#ffffff',
  padding: '12px',
  borderRadius: '4px',
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '14px',
  marginTop: '20px',
  boxShadow: '0 2px 8px rgba(40,167,69,0.2)',
};

export default Profile;