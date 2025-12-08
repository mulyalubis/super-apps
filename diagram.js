import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function initDiagram() {

    const icons = {
        graduation: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
        users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        rocket: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
        wrench: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
        laptop: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>'
    };

    const nodes = [
        { id: "SMA", label: "Bidang SMA", desc: "Pendidikan Menengah Atas", px: 0.12, py: 0.25, img: "assets/layanan-terbaik/sidakota.png", link: "ruang-super-apps/bidang-sma.html", color: "#3B82F6", icon: "graduation" },
        { id: "GTK", label: "Bidang GTK", desc: "Guru & Tenaga Kependidikan", px: 0.12, py: 0.75, img: "assets/layanan-terbaik/asesmen-dinas-pendidikan-aceh.png", link: "ruang-super-apps/", color: "#10B981", icon: "users" },
        { id: "CENTER", label: "Super Apps", desc: "Pusat Integrasi Digital", px: 0.50, py: 0.50, img: "assets/img-sliders/slider-start.jpeg", link: "ruang-super-apps/", color: "#BF2311", icon: "rocket", isCenter: true },
        { id: "SMK", label: "Bidang SMK", desc: "Pendidikan Kejuruan", px: 0.88, py: 0.25, img: "assets/layanan-terbaik/rumah-kejuruan.png", link: "ruang-super-apps/", color: "#F59E0B", icon: "wrench" },
        { id: "UPTD", label: "UPTD Tekkomdik", desc: "Teknologi & Komunikasi", px: 0.88, py: 0.75, img: "assets/layanan-terbaik/sijempol-aceh.png", link: "ruang-super-apps/", color: "#8B5CF6", icon: "laptop" }
    ];
    
    const links = [
        { source: "SMA", target: "CENTER" },
        { source: "GTK", target: "CENTER" },
        { source: "SMK", target: "CENTER" },
        { source: "UPTD", target: "CENTER" }
    ];

    const container = document.getElementById("myDiagramDiv");
    if (!container) return;
    
    const width = container.offsetWidth || window.innerWidth * 0.9;
    const height = 520;

    nodes.forEach(n => {
        n.x = n.px * width;
        n.y = n.py * height;
    });

    container.innerHTML = '';

    const svg = d3.select("#myDiagramDiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "diagram-svg");

    const defs = svg.append("defs");

    const glowFilter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    
    glowFilter.append("feGaussianBlur")
        .attr("stdDeviation", "3")
        .attr("result", "coloredBlur");
    
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const bgGroup = svg.append("g").attr("class", "bg-decorations");
    const centerNode = nodes.find(n => n.id === "CENTER");
    
    bgGroup.append("circle")
        .attr("cx", centerNode.x)
        .attr("cy", centerNode.y)
        .attr("r", 180)
        .attr("fill", "none")
        .attr("stroke", "#BF2311")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "8,8")
        .attr("opacity", 0.2)
        .attr("class", "rotating-ring");

    bgGroup.append("circle")
        .attr("cx", centerNode.x)
        .attr("cy", centerNode.y)
        .attr("r", 220)
        .attr("fill", "none")
        .attr("stroke", "#BF2311")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,12")
        .attr("opacity", 0.15)
        .attr("class", "rotating-ring-reverse");

    const linksGroup = svg.append("g").attr("class", "links-group");

    links.forEach((link, index) => {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);

        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const curvature = 0.3;
        const cx = midX - dy * curvature;
        const cy = midY + dx * curvature * 0.3;

        linksGroup.append("path")
            .attr("d", "M" + source.x + "," + source.y + " Q" + cx + "," + cy + " " + target.x + "," + target.y)
            .attr("fill", "none")
            .attr("stroke", source.color)
            .attr("stroke-width", 6)
            .attr("opacity", 0.15)
            .attr("filter", "url(#glow)");

        const lineGradient = defs.append("linearGradient")
            .attr("id", "gradient-" + index)
            .attr("x1", source.x)
            .attr("y1", source.y)
            .attr("x2", target.x)
            .attr("y2", target.y)
            .attr("gradientUnits", "userSpaceOnUse");

        lineGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", source.color);

        lineGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#BF2311");

        linksGroup.append("path")
            .attr("d", "M" + source.x + "," + source.y + " Q" + cx + "," + cy + " " + target.x + "," + target.y)
            .attr("fill", "none")
            .attr("stroke", "url(#gradient-" + index + ")")
            .attr("stroke-width", 3)
            .attr("stroke-linecap", "round")
            .attr("class", "connection-line");

        linksGroup.append("path")
            .attr("id", "path-" + index)
            .attr("d", "M" + source.x + "," + source.y + " Q" + cx + "," + cy + " " + target.x + "," + target.y)
            .attr("fill", "none")
            .attr("stroke", "none");

        for (let i = 0; i < 3; i++) {
            const particle = linksGroup.append("circle")
                .attr("r", 4)
                .attr("fill", source.color)
                .attr("opacity", 0.9);

            const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
            animateMotion.setAttribute("dur", (3 + i) + "s");
            animateMotion.setAttribute("repeatCount", "indefinite");
            animateMotion.setAttribute("begin", (i * 1) + "s");
            animateMotion.setAttribute("path", "M" + source.x + "," + source.y + " Q" + cx + "," + cy + " " + target.x + "," + target.y);
            particle.node().appendChild(animateMotion);
        }
    });

    const nodesGroup = svg.append("g").attr("class", "nodes-group");

    nodes.forEach(node => {
        const isCenter = node.isCenter;
        const cardWidth = isCenter ? 220 : 180;
        const cardHeight = isCenter ? 180 : 140;
        const iconSvg = icons[node.icon] || '';

        let cardHtml;
        if (isCenter) {
            cardHtml = '<a href="' + node.link + '" class="diagram-card center-card" style="--card-color: ' + node.color + '">' +
                '<div class="card-inner">' +
                    '<div class="center-glow"></div>' +
                    '<div class="card-icon-large">' + iconSvg + '</div>' +
                    '<h3 class="card-title-large">' + node.label + '</h3>' +
                    '<p class="card-desc">' + node.desc + '</p>' +
                    '<div class="pulse-ring"></div>' +
                    '<div class="pulse-ring delay-1"></div>' +
                '</div>' +
            '</a>';
        } else {
            cardHtml = '<a href="' + node.link + '" class="diagram-card side-card" style="--card-color: ' + node.color + '">' +
                '<div class="card-inner">' +
                    '<div class="card-header" style="background: linear-gradient(135deg, ' + node.color + '20, ' + node.color + '40)">' +
                        '<div class="card-icon">' + iconSvg + '</div>' +
                        '<div class="status-indicator" style="background: ' + node.color + '"></div>' +
                    '</div>' +
                    '<div class="card-body">' +
                        '<h4 class="card-title">' + node.label + '</h4>' +
                        '<p class="card-subtitle">' + node.desc + '</p>' +
                    '</div>' +
                    '<div class="card-arrow">' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>' +
                    '</div>' +
                '</div>' +
            '</a>';
        }

        nodesGroup.append("foreignObject")
            .attr("x", node.x - cardWidth / 2)
            .attr("y", node.y - cardHeight / 2)
            .attr("width", cardWidth)
            .attr("height", cardHeight)
            .html(cardHtml);
    });

    if (!document.getElementById('diagram-styles')) {
        const style = document.createElement('style');
        style.id = 'diagram-styles';
        style.textContent = `
            .diagram-svg {
                overflow: visible;
            }

            .rotating-ring {
                animation: rotateRing 30s linear infinite;
                transform-origin: center;
                transform-box: fill-box;
            }

            .rotating-ring-reverse {
                animation: rotateRing 40s linear infinite reverse;
                transform-origin: center;
                transform-box: fill-box;
            }

            @keyframes rotateRing {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .connection-line {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: drawLine 2s ease-out forwards;
            }

            @keyframes drawLine {
                to { stroke-dashoffset: 0; }
            }

            .diagram-card {
                display: block;
                width: 100%;
                height: 100%;
                text-decoration: none;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .diagram-card:hover {
                transform: translateY(-8px) scale(1.02);
            }

            .card-inner {
                width: 100%;
                height: 100%;
                border-radius: 20px;
                overflow: hidden;
                position: relative;
            }

            .center-card .card-inner {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
                border: 2px solid #BF2311;
                box-shadow: 0 20px 60px rgba(191, 35, 17, 0.3), 0 0 40px rgba(191, 35, 17, 0.2);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .center-glow {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120%;
                height: 120%;
                background: radial-gradient(circle, rgba(191, 35, 17, 0.2) 0%, transparent 70%);
                pointer-events: none;
            }

            .card-icon-large {
                margin-bottom: 8px;
                z-index: 1;
                animation: floatIcon 3s ease-in-out infinite;
                color: white;
            }

            @keyframes floatIcon {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            .card-title-large {
                color: white;
                font-size: 22px;
                font-weight: 800;
                margin: 0;
                z-index: 1;
                background: linear-gradient(135deg, #fff 0%, #BF2311 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .center-card .card-desc {
                color: rgba(255, 255, 255, 0.7);
                font-size: 12px;
                margin-top: 4px;
                z-index: 1;
            }

            .pulse-ring {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                border: 2px solid #BF2311;
                border-radius: 20px;
                animation: pulse 2s ease-out infinite;
                pointer-events: none;
            }

            .pulse-ring.delay-1 {
                animation-delay: 1s;
            }

            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
            }

            .side-card .card-inner {
                background: white;
                border: 1px solid #e5e7eb;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
            }

            .side-card:hover .card-inner {
                border-color: var(--card-color);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            }

            .card-header {
                padding: 12px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .card-icon {
                color: #374151;
            }

            .status-indicator {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                animation: blink 2s ease-in-out infinite;
            }

            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }

            .card-body {
                padding: 0 16px 12px;
                flex: 1;
            }

            .card-title {
                color: #1f2937;
                font-size: 15px;
                font-weight: 700;
                margin: 0 0 4px 0;
            }

            .card-subtitle {
                color: #6b7280;
                font-size: 11px;
                margin: 0;
            }

            .card-arrow {
                position: absolute;
                bottom: 12px;
                right: 12px;
                width: 28px;
                height: 28px;
                background: #f3f4f6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9ca3af;
                transition: all 0.3s ease;
            }

            .side-card:hover .card-arrow {
                background: var(--card-color);
                color: white;
                transform: translateX(4px);
            }
        `;
        document.head.appendChild(style);
    }
}
