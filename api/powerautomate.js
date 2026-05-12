export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { action, payload } = req.body;

    const urlMap = {
        getProfile: process.env.POWER_AUTOMATE_GET_PROFILE_URL,
        postProfile: process.env.POWER_AUTOMATE_POST_PROFILE_URL,
        loginAuth: process.env.POWER_AUTOMATE_LOGIN_AUTH_URL,
        postLeave: process.env.POWER_AUTOMATE_POST_LEAVE_URL,
        getLeave: process.env.POWER_AUTOMATE_GET_LEAVE_URL,
        getAttendance: process.env.POWER_AUTOMATE_GET_ATTENDANCE_URL
    };

    let targetUrl = urlMap[action];

    if (!targetUrl) {
        return res.status(500).json({ error: `Power Automate URL missing for action: ${action}` });
    }

    const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    if (action === 'getProfile' && payload ? .email) {
        targetUrl += `&email=${encodeURIComponent(payload.email)}`;
    } else if (action === 'getAttendance' && payload ? .month && payload ? .email) {
        targetUrl += `&month=${encodeURIComponent(payload.month)}&email=${encodeURIComponent(payload.email)}`;
    }

    if (payload) {
        fetchOptions.body = JSON.stringify(payload);
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        fetchOptions.signal = controller.signal;

        const response = await fetch(targetUrl, fetchOptions);
        clearTimeout(timeoutId);

        const responseText = await response.text();
        let data = {};
        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { message: responseText };
            }
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(`Error proxying ${action}:`, error);
        const msg = error.name === 'AbortError' ? 'Timeout' : error.message;
        return res.status(500).json({ error: 'Proxy Error: ' + msg });
    }
}