// Patient data for different datasets
const datasets = {
    separated: {
        // Clear separation - pneumonia patients have higher scores
        pneumonia: [
            55, 60, 62, 65, 68, 70, 72, 74, 76, 78,
            80, 82, 84, 85, 86, 87, 88, 89, 90, 91,
            92, 93, 94, 95, 96, 97, 98, 98, 99, 99
        ],
        healthy: [
            2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
            22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
            42, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            10, 15, 20, 25, 28, 30, 32, 35, 38, 40,
            5, 8, 12, 18, 22, 25, 28, 32, 35, 38,
            3, 7, 11, 15, 19, 23, 27, 31, 35, 39,
            6, 9, 13, 17, 21, 24, 29, 33, 37, 41
        ]
    },
    unseparated: {
        // High overlap - nearly indistinguishable distributions
        pneumonia: [
            25, 30, 32, 35, 38, 40, 42, 45, 48, 50,
            52, 55, 58, 60, 62, 65, 68, 70, 72, 75,
            35, 40, 45, 50, 55, 60, 65, 70, 55, 60
        ],
        healthy: [
            20, 25, 28, 32, 35, 38, 42, 45, 48, 50,
            52, 55, 58, 60, 62, 65, 68, 70, 72, 74,
            30, 35, 40, 45, 50, 55, 60, 65, 70, 72,
            25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
            28, 33, 38, 43, 48, 53, 58, 63, 68, 70,
            32, 38, 44, 50, 56, 62, 68, 72, 75, 78,
            22, 28, 34, 40, 46, 52, 58, 64, 70, 74
        ]
    },
    imbalanced: {
        // Few positive cases - only 10 pneumonia patients out of 100
        // Moderate separation - similar to real clinical scenarios
        pneumonia: [
            45, 52, 58, 63, 68, 72, 76, 80, 85, 90
        ],
        healthy: [
            5, 8, 12, 15, 18, 22, 25, 28, 32, 35,
            10, 14, 18, 22, 26, 30, 34, 38, 42, 46,
            15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
            12, 17, 22, 27, 32, 37, 42, 47, 52, 57,
            8, 13, 18, 23, 28, 33, 38, 43, 48, 53,
            6, 11, 16, 21, 26, 31, 36, 41, 46, 51,
            10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
            7, 12, 17, 22, 27, 32, 37, 42, 47, 52,
            9, 14, 19, 24, 29, 34, 39, 44, 49, 54
        ]
    }
};

let currentDataset = 'separated';
let threshold = 50;
let patients = [];

// Initialize
function init() {
    generatePatients();
    setupThresholdDrag();
    updateVisualization();
}

function generatePatients() {
    const chartArea = document.getElementById('chartArea');
    // Clear existing patients
    document.querySelectorAll('.patient-dot').forEach(el => el.remove());

    patients = [];
    const data = datasets[currentDataset];

    // Add pneumonia patients
    data.pneumonia.forEach((score, i) => {
        patients.push({
            score: score,
            hasPneumonia: true,
            yOffset: 20 + (i % 8) * 22 + Math.random() * 10
        });
    });

    // Add healthy patients
    data.healthy.forEach((score, i) => {
        patients.push({
            score: score,
            hasPneumonia: false,
            yOffset: 20 + (i % 8) * 22 + Math.random() * 10
        });
    });

    // Create dots
    patients.forEach((patient, i) => {
        const dot = document.createElement('div');
        dot.className = `patient-dot ${patient.hasPneumonia ? 'has-pneumonia' : 'healthy'}`;
        dot.style.left = `${patient.score}%`;
        dot.style.top = `${patient.yOffset}px`;
        dot.dataset.index = i;
        dot.title = `Score: ${patient.score}%\n${patient.hasPneumonia ? 'Has pneumonia' : 'Healthy'}`;
        chartArea.appendChild(dot);
    });
}

function setupThresholdDrag() {
    const thresholdLine = document.getElementById('thresholdLine');
    const chartArea = document.getElementById('chartArea');
    let isDragging = false;

    thresholdLine.style.left = `${threshold}%`;

    const startDrag = (e) => {
        isDragging = true;
        e.preventDefault();
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        const rect = chartArea.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.max(5, Math.min(95, x));

        threshold = Math.round(x);
        thresholdLine.style.left = `${threshold}%`;
        updateVisualization();
    };

    const endDrag = () => {
        isDragging = false;
    };

    thresholdLine.addEventListener('mousedown', startDrag);
    thresholdLine.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Also allow clicking anywhere on the chart
    chartArea.addEventListener('click', (e) => {
        if (e.target === chartArea || e.target.classList.contains('patient-dot')) {
            const rect = chartArea.getBoundingClientRect();
            let x = ((e.clientX - rect.left) / rect.width) * 100;
            x = Math.max(5, Math.min(95, x));
            threshold = Math.round(x);
            thresholdLine.style.left = `${threshold}%`;
            updateVisualization();
        }
    });
}

function updateVisualization() {
    // Update threshold label
    document.getElementById('thresholdLabel').textContent = `Threshold: ${threshold}%`;

    // Calculate confusion matrix
    let tp = 0, fn = 0, fp = 0, tn = 0;

    patients.forEach((patient, i) => {
        const predictedPositive = patient.score >= threshold;
        const dot = document.querySelector(`.patient-dot[data-index="${i}"]`);

        if (patient.hasPneumonia) {
            if (predictedPositive) {
                tp++;
            } else {
                fn++;
            }
        } else {
            if (predictedPositive) {
                fp++;
            } else {
                tn++;
            }
        }

        // Update dot appearance
        if (dot) {
            dot.classList.toggle('predicted-positive', predictedPositive);
        }
    });

    // Update confusion matrix display
    document.getElementById('tpCount').textContent = tp;
    document.getElementById('fnCount').textContent = fn;
    document.getElementById('fpCount').textContent = fp;
    document.getElementById('tnCount').textContent = tn;

    // Calculate metrics
    const total = tp + tn + fp + fn;
    const accuracy = total > 0 ? ((tp + tn) / total * 100) : 0;
    const recall = tp + fn > 0 ? (tp / (tp + fn) * 100) : 0;
    const fpr = fp + tn > 0 ? (fp / (fp + tn) * 100) : 0;
    const precision = tp + fp > 0 ? (tp / (tp + fp) * 100) : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall / (precision + recall)) : 0;

    document.getElementById('accuracy').textContent = accuracy.toFixed(0) + '%';
    document.getElementById('recall').textContent = recall.toFixed(0) + '%';
    document.getElementById('fpr').textContent = fpr.toFixed(0) + '%';
    document.getElementById('precision').textContent = precision.toFixed(0) + '%';
    document.getElementById('f1').textContent = f1.toFixed(0) + '%';

    // Update clinical interpretation
    document.getElementById('accuracyText').textContent = accuracy.toFixed(0) + '%';
    document.getElementById('recallText').textContent = recall.toFixed(0) + '%';
    document.getElementById('fprText').textContent = fpr.toFixed(0) + '%';

    // Highlight metrics that changed significantly
    highlightMetric('recallCard', recall);
    highlightMetric('precisionCard', precision);

    // Update ROC curve
    drawROCCurve(fpr / 100, recall / 100);
}

function highlightMetric(cardId, value) {
    const card = document.getElementById(cardId);
    card.classList.remove('highlight');
    // Add highlight animation
    setTimeout(() => card.classList.add('highlight'), 10);
}

function calculateROCPoints() {
    const points = [];
    const totalPositive = patients.filter(p => p.hasPneumonia).length;
    const totalNegative = patients.filter(p => !p.hasPneumonia).length;

    // Calculate TPR and FPR for thresholds from 0 to 100
    for (let t = 0; t <= 100; t += 2) {
        let tp = 0, fp = 0;
        patients.forEach(patient => {
            if (patient.score >= t) {
                if (patient.hasPneumonia) tp++;
                else fp++;
            }
        });
        const tpr = totalPositive > 0 ? tp / totalPositive : 0;
        const fpr = totalNegative > 0 ? fp / totalNegative : 0;
        points.push({ fpr, tpr, threshold: t });
    }
    return points;
}

function calculateAUC(points) {
    // Sort by FPR
    const sorted = [...points].sort((a, b) => a.fpr - b.fpr);
    let auc = 0;
    for (let i = 1; i < sorted.length; i++) {
        const width = sorted[i].fpr - sorted[i-1].fpr;
        const avgHeight = (sorted[i].tpr + sorted[i-1].tpr) / 2;
        auc += width * avgHeight;
    }
    return auc;
}

function drawROCCurve(currentFPR, currentTPR) {
    const canvas = document.getElementById('rocCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(padding, padding, plotWidth, plotHeight);

    // Draw diagonal (random classifier)
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = '#53565A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw axis ticks and labels
    ctx.fillStyle = '#53565A';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
        const val = i * 0.25;
        const x = padding + val * plotWidth;
        const y = height - padding - val * plotHeight;

        // X-axis ticks
        ctx.beginPath();
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, height - padding + 5);
        ctx.stroke();
        ctx.fillText(val.toFixed(2), x, height - padding + 15);

        // Y-axis ticks
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding - 5, y);
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(2), padding - 8, y + 3);
        ctx.textAlign = 'center';
    }

    // Calculate and draw ROC curve
    const rocPoints = calculateROCPoints();
    const auc = calculateAUC(rocPoints);
    document.getElementById('aucValue').textContent = auc.toFixed(2);

    // Sort points by FPR for proper curve drawing
    rocPoints.sort((a, b) => a.fpr - b.fpr);

    // Draw ROC curve
    ctx.strokeStyle = '#8C1515';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    rocPoints.forEach((point, i) => {
        const x = padding + point.fpr * plotWidth;
        const y = height - padding - point.tpr * plotHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw current operating point
    const currentX = padding + currentFPR * plotWidth;
    const currentY = height - padding - currentTPR * plotHeight;

    ctx.fillStyle = '#620059';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
    ctx.fill();
}

const datasetExplanations = {
    separated: "<strong>Severe Cases:</strong> ICU patients with large lobar pneumonia and high fevers. The AI easily distinguishes these obvious cases from healthy patients. This represents ideal conditions — but an AI validated only on severe cases may struggle with your more subtle outpatients.",
    unseparated: "<strong>Subtle Cases:</strong> Outpatients with mild cough, low-grade fever, and early infiltrates. The sick and healthy patients look similar to the AI, making classification difficult. This is common in primary care screening where disease presents subtly.",
    imbalanced: "<strong>Rare Disease:</strong> TB screening in a low-prevalence population — only 10% have the disease. Even with good discrimination, the low prevalence means false positives can outnumber true positives. Pay close attention to precision when screening for rare conditions."
};

function setDataset(name, btn) {
    currentDataset = name;

    // Update button states
    document.querySelectorAll('.dataset-btn').forEach(b => {
        b.classList.remove('active');
    });
    if (btn) btn.classList.add('active');

    // Update explanation
    document.getElementById('datasetExplanation').innerHTML = datasetExplanations[name];

    generatePatients();
    updateVisualization();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
