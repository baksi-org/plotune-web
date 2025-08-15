const params = new URLSearchParams(window.location.search);
const conn = params.get("conn");

if (conn) {
    const decoded = atob(conn); // base64 decode
    const [ip, port] = decoded.split(":");
    console.log("Backend:", ip, port);

    const url = `http://${ip}:${port}/api/info`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("OS Info:", data);
        })
        .catch(err => {
            console.warn("Fetch hatası:", err);
        });
}
