let backendUrl = null;

const params = new URLSearchParams(window.location.search);
const conn = params.get("conn");

if (conn) {
    try {
        const decoded = atob(conn); // base64 decode
        const [ip, port] = decoded.split(":");
        // Basic validation
        if (!ip || !port || isNaN(port) || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
            throw new Error("Invalid IP or port");
        }
        backendUrl = `http://${ip}:${port}`;
        console.log("Backend URL set:", backendUrl);
    } catch (err) {
        console.error("Invalid conn param:", err.message);
        backendUrl = null;
        console.warn("No valid backend connection; running in visitor mode.");
    }
} else {
    console.log("No conn param; running in visitor mode.");
}

// Optional: Fetch /api/info for debugging if connected
if (backendUrl) {
    console.log('Fetching OS info from backend...');
    fetch(`${backendUrl}/api/info`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("OS Info fetched successfully:", data);
        })
        .catch(err => {
            console.error("Failed to fetch /api/info:", err.message, err.stack);
        });
}