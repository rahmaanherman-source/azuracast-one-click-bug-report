// AzuraCast One-Click Bug Reporter - MIT License
(function() {
    function reportBug() {
        // 1. Gather the data
        const systemInfo = {
            url: window.location.href,
            browser: navigator.userAgent,
            platform: navigator.platform,
            resolution: `${window.screen.width}x${window.screen.height}`
        };

        // 2. Format the issue body
        const issueBody = encodeURIComponent(`
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**System Info (Auto-Generated)**
- URL: ${systemInfo.url}
- Browser: ${systemInfo.browser}
- Platform: ${systemInfo.platform}
- Resolution: ${systemInfo.resolution}

**Screenshots**
(Please drag and drop a screenshot here)
        `);

        const issueTitle = encodeURIComponent("[Bug]: ");
        
        // 3. Open the GitHub Issue page pre-filled with data
        const githubUrl = `https://github.com/AzuraCast/AzuraCast/issues/new?title=${issueTitle}&body=${issueBody}&labels=bug`;
        
        window.open(githubUrl, '_blank');
    }

    // Create the button
    const btn = document.createElement('button');
    btn.innerHTML = "🐞 Report a Bug";
    btn.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:99999; background:#e74c3c; color:white; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-family:sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.1);";
    btn.onclick = reportBug;
    
    // Wait for page to load before adding
    window.addEventListener('load', () => {
        document.body.appendChild(btn);
    });
})();