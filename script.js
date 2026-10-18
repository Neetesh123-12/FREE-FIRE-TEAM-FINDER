// Initial Dummy Data if LocalStorage is empty
let teams = JSON.parse(localStorage.getItem('ff_teams')) || [
    { name: "TEAM VIPER 🔥", role: "Rusher", req: "Heroic, 3.5 KD", contact: "https://wa.me/919876543210" },
    { name: "ELITE KILLERS ⚡", role: "Sniper", req: "Grandmaster, 4+ KD", contact: "https://wa.me/919123456789" }
];

let players = JSON.parse(localStorage.getItem('ff_players')) || [
    { ign: "ᎪᴛᎢᎥᴛᴜᎠᴇ", uid: "482910293", role: "Rusher", stats: "Grandmaster, 4.2 KD", contact: "@attitude_ff" },
    { name: "HEADSHOT KING 🎯", ign: "NOOB_KILLER", uid: "938472910", role: "Sniper", stats: "Heroic, 3.8 KD", contact: "9876543210" }
];

// Render data on load
window.onload = function() {
    renderTeams();
    renderPlayers();
};

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    if(tabName === 'teams') {
        document.getElementById('teamsTab').classList.add('active');
        event.currentTarget.classList.add('active');
    } else {
        document.getElementById('playersTab').classList.add('active');
        event.currentTarget.classList.add('active');
    }
}

// Modal Controls
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Render Teams
function renderTeams(data = teams) {
    const grid = document.getElementById('teamsGrid');
    grid.innerHTML = '';
    
    if(data.length === 0) {
        grid.innerHTML = '<p style="color:#94a3b8;">No teams found.</p>';
        return;
    }

    data.forEach(team => {
        grid.innerHTML += `
            <div class="gaming-card">
                <div class="card-title">${team.name}</div>
                <span class="card-badge">Needed: ${team.role}</span>
                <div class="card-info"><i class="fa-solid fa-trophy"></i> Req: ${team.req}</div>
                <a href="${team.contact}" target="_blank" class="connect-btn">
                    <i class="fa-brands fa-whatsapp"></i> Connect with Team
                </a>
            </div>
        `;
    });
}

// Render Players
function renderPlayers(data = players) {
    const grid = document.getElementById('playersGrid');
    grid.innerHTML = '';

    if(data.length === 0) {
        grid.innerHTML = '<p style="color:#94a3b8;">No players found.</p>';
        return;
    }

    data.forEach(player => {
        grid.innerHTML += `
            <div class="gaming-card">
                <div class="card-title">${player.ign}</div>
                <span class="card-badge" style="background:rgba(0,242,254,0.2); color:#00f2fe; border-color:rgba(0,242,254,0.4);">Role: ${player.role}</span>
                <div class="card-info"><i class="fa-solid fa-id-badge"></i> UID: ${player.uid}</div>
                <div class="card-info"><i class="fa-solid fa-chart-line"></i> Stats: ${player.stats}</div>
                <a href="https://wa.me/?text=Hello%20${player.ign},%20I%20saw%20your%20profile%20on%20FF%20Squad%20Finder!" target="_blank" class="connect-btn" style="background:linear-gradient(90deg,#00f2fe,#4facfe); color:#030712;">
                    <i class="fa-solid fa-paper-plane"></i> Contact Player (${player.contact})
                </a>
            </div>
        `;
    });
}

// Handle Team Form Submit
function handleTeamSubmit(e) {
    e.preventDefault();
    const newTeam = {
        name: document.getElementById('teamName').value,
        role: document.getElementById('teamRole').value,
        req: document.getElementById('teamReq').value,
        contact: document.getElementById('teamContact').value
    };

    teams.unshift(newTeam);
    localStorage.setItem('ff_teams', JSON.stringify(teams));
    renderTeams();
    closeModal('teamModal');
    document.getElementById('teamForm').reset();
}

// Handle Player Form Submit
function handlePlayerSubmit(e) {
    e.preventDefault();
    const newPlayer = {
        ign: document.getElementById('playerIgn').value,
        uid: document.getElementById('playerUid').value,
        role: document.getElementById('playerRole').value,
        stats: document.getElementById('playerStats').value,
        contact: document.getElementById('playerContact').value
    };

    players.unshift(newPlayer);
    localStorage.setItem('ff_players', JSON.stringify(players));
    renderPlayers();
    closeModal('playerModal');
    document.getElementById('playerForm').reset();
}

// Live Search & Filter Function
function filterData() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const selectedRole = document.getElementById('roleFilter').value;

    const filteredTeams = teams.filter(t => {
        const matchesQuery = t.name.toLowerCase().includes(query) || t.req.toLowerCase().includes(query);
        const matchesRole = selectedRole === "" || t.role === selectedRole;
        return matchesQuery && matchesRole;
    });

    const filteredPlayers = players.filter(p => {
        const matchesQuery = p.ign.toLowerCase().includes(query) || p.uid.includes(query) || p.stats.toLowerCase().includes(query);
        const matchesRole = selectedRole === "" || p.role === selectedRole;
        return matchesQuery && matchesRole;
    });

    renderTeams(filteredTeams);
    renderPlayers(filteredPlayers);
}