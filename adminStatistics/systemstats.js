async function loadStats() {
  try {
      const response = await fetch('http://localhost:3000/system-stats'); 
      if (!response.ok) {
          throw new Error("Failed to fetch system stats.");
      }
      const stats = await response.json();
      
      document.getElementById('loggedInUsers').textContent = stats.loggedInUsers || 'N/A';
      document.getElementById('activeElections').textContent = stats.activeElections || 'N/A';
      document.getElementById('avgQueryTime').textContent = stats.avgQueryTime || 'N/A';
      document.getElementById('avgHttpTime').textContent = stats.avgHttpTime || 'N/A';
  } catch (error) {
      console.error('Error fetching system stats:', error);
      alert("Error fetching system stats. Please try again later.");
  }
}

document.addEventListener('DOMContentLoaded', loadStats);
