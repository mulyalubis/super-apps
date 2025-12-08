import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function initDiagram() {

    const nodes = [
        { id: "SMA", label: "Bidang SMA", px: 0.15, py: 0.30, img: "assets/layanan-terbaik/sidakota.png", link: "ruang-super-apps/bidang-sma.html" },
        { id: "GTK", label: "Bidang GTK", px: 0.15, py: 0.64, img: "assets/layanan-terbaik/asesmen-dinas-pendidikan-aceh.png", link: "ruang-super-apps/" },

        { id: "CENTER", label: "Super App", px: 0.50, py: 0.46, img: "assets/img-sliders/slider-start.jpeg", link: "ruang-super-apps/" },

        { id: "SMK", label: "Bidang SMK", px: 0.84, py: 0.30, img: "assets/layanan-terbaik/rumah-kejuruan.png", link: "ruang-super-apps/" },
        { id: "UPTD", label: "UPTD Tekkomdik", px: 0.84, py: 0.64, img: "assets/layanan-terbaik/sijempol-aceh.png", link: "ruang-super-apps/" }
    ];
    const links = [
        { source: "SMA", target: "CENTER" },
        { source: "GTK", target: "CENTER" },
        { source: "SMK", target: "CENTER" },
        { source: "UPTD", target: "CENTER" }
    ];

    const width = window.innerWidth * 0.9;
    const height = 500;

    nodes.forEach(n => {
        n.x = n.px * width;
        n.y = n.py * height;
    });

    const svg = d3.select("#myDiagramDiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Draw curved links
    svg.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("d", d => {
            const source = nodes.find(n => n.id === d.source);
            const target = nodes.find(n => n.id === d.target);

            const cx = (source.x + target.x) / 2;
            const cy = (source.y + target.y) / 2 - 80;

            return `M${source.x},${source.y} Q ${cx},${cy} ${target.x},${target.y}`;
        });

    // Draw cards
    svg.append("g")
        .selectAll("foreignObject")
        .data(nodes)
        .enter()
        .append("foreignObject")
        .attr("x", d => d.x - 100)
        .attr("y", d => d.y - 80)
        .attr("width", 200)
        .attr("height", 160)
        .html(d => `
            <a href="${d.link}" class="bg-[#111] backdrop-blur-lg rounded-xl overflow-hidden border border-[#222] shadow-lg w-[200px] flex flex-col">
                <img src="${d.img}" class="w-full h-[110px] object-cover">
                <p class="text-white text-center font-bold text-[15px] py-2">${d.label}</p>
            </a>
        `);
}
